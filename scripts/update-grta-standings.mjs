import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const READER = "https://r.jina.ai/https://prod-lm.cricclubs.com/GRTA1";
const SCORECARDS = "https://cricclubs.com/GRTA1/listMatches.do?league=21&clubId=1004528";
const output = resolve(process.argv[2] || "assets/data/grta-standings.json");

const groups = [
  ["Rising Stars", "Sadler Sena", "Richmond Tigers", "Richmond Gajendras"],
  ["LION Kings", "Dare Devils XI", "Chelsea Squad", "Richmond Cricket Club"],
  ["Rutland Royals", "Super Strikers", "Solar Surfers", "Beyond Boundaries"],
  ["Mavericks", "LIONS Roar", "Richmond Thunders", "Half-Century Heroes"],
  ["Southern Caps", "Knights", "Legends", "Veterans"],
  ["Royals", "MCC", "Challengers", "Lancers"],
  ["H Burg Kings", "Southern Stars", "Richmond Bulls", "Titans"],
  ["ICC", "HCC", "LIONS Powerhouse", "Hurricanes"],
  ["Hawks", "Sadler Sixers", "Deccan Warriors", "T2i"],
  ["Jugaad", "Sadler Thunders", "Ustaad Sixers", "Chennai -28"],
  ["Panthers", "Eagles", "OG's", "UCC"],
];

const normalized = (value) => value.toLowerCase().replace(/\band\b/g, "").replace(/[^a-z0-9]/g, "");
const teamLookup = new Map(groups.flatMap((teams) => teams.map((team) => [normalized(team), team])));

function teamName(raw) {
  const key = normalized(raw);
  if (key === "richmanducricketclub") return "Richmond Cricket Club";
  return teamLookup.get(key) || [...teamLookup].find(([candidate]) => candidate.includes(key) || key.includes(candidate))?.[1] || raw.trim();
}

function groupFor(team) {
  return groups.findIndex((teams) => teams.includes(team)) + 1;
}

function cellNumber(value = "") {
  if (/^\s*-\s*$/.test(value)) return 0;
  return Number(value.match(/^\[(\d+(?:\.\d+)?)\]/)?.[1] || value.match(/-?\d+(?:\.\d+)?/)?.[0] || 0);
}

function compare(a, b) {
  return b.points - a.points || b.won - a.won || (b.nrr ?? -999) - (a.nrr ?? -999) || a.team.localeCompare(b.team);
}

function knockout(rank) {
  if (rank <= 4) return `QF ${rank} vs P-QF ${5 - rank} winner`;
  if (rank <= 8) return `P-QF ${rank - 4} vs Rank ${17 - rank}`;
  if (rank <= 12) return `P-QF ${13 - rank} vs Rank ${17 - rank}`;
  if (rank <= 16) return `Division II QF ${rank - 12} vs Rank ${33 - rank}`;
  if (rank <= 20) return `Division II QF ${21 - rank} vs Rank ${33 - rank}`;
  if (rank <= 24) return `Division III QF ${rank - 20} vs Rank ${49 - rank}`;
  if (rank <= 28) return `Division III QF ${29 - rank} vs Rank ${49 - rank}`;
  return "Eliminated after league stage";
}

function rank(rows) {
  for (let group = 1; group <= groups.length; group += 1) {
    const ordered = rows.filter((row) => row.group === group).sort(compare);
    const tied = ordered[0] && ordered[1] && ordered[0].points === ordered[1].points && ordered[0].won === ordered[1].won && ordered[0].nrr === ordered[1].nrr;
    ordered.forEach((row, index) => Object.assign(row, { groupRank: index + 1, isGroupWinner: index === 0, tieUnresolved: index === 0 && Boolean(tied) }));
  }
  const ordered = [...rows.filter((row) => row.isGroupWinner).sort(compare), ...rows.filter((row) => !row.isGroupWinner).sort(compare)];
  return ordered.map((row, index) => {
    const place = index + 1;
    const division = place <= 12 ? "Division I" : place <= 20 ? "Division II" : place <= 28 ? "Division III" : "Eliminated";
    const qualification = row.isGroupWinner ? "Group winner" : place === 12 ? "Best remaining" : place <= 28 ? "Overall ranking" : "Below cut line";
    return { ...row, rank: place, division, qualification, knockout: knockout(place) };
  });
}

function standings(markdown) {
  const rows = new Map();
  for (const line of markdown.split("\n")) {
    if (!/^\|\s*\d+\s*\|/.test(line) || !/viewTeam\.do/.test(line)) continue;
    const cells = line.split("|").map((cell) => cell.trim());
    const raw = cells[2]?.match(/\[([^\]]+)\]\([^)]*viewTeam\.do/)?.[1];
    if (!raw) continue;
    const team = teamName(raw);
    const group = groupFor(team);
    if (!group) continue;
    const nrr = cells[9]?.match(/-?\d+(?:\.\d+)?/)?.[0];
    rows.set(team, { rank: 0, group, groupRank: 0, team, played: cellNumber(cells[3]), won: cellNumber(cells[4]), lost: cellNumber(cells[5]), tied: 0, noResult: cellNumber(cells[6]), points: cellNumber(cells[7]), nrr: nrr == null ? null : Number(nrr), isGroupWinner: false, tieUnresolved: false, division: "Eliminated", qualification: "Below cut line", knockout: "—" });
  }
  if (rows.size !== 44) throw new Error(`Expected 44 teams; received ${rows.size}.`);
  return rank([...rows.values()]);
}

function matches(markdown) {
  const headings = [...markdown.matchAll(/^###\s+(.+?)\s+v\s+(.+?)\s*$/gm)];
  return headings.map((heading, index) => {
    const start = heading.index || 0;
    const section = markdown.slice(start, headings[index + 1]?.index || markdown.length);
    const before = markdown.slice(Math.max(0, start - 900), start);
    const scores = [...before.matchAll(/^\*\s+(\d+\/\d+)\s*\n([\d.]+)\/\d+\s*$/gm)].slice(-2);
    const detail = section.match(/^####\s+(.+?)\s*$/m)?.[1];
    const complete = Boolean(detail && /won by|match tied|no result|abandoned|cancelled/i.test(detail));
    const live = Boolean(detail && /:\s*\d+\/\d+/.test(detail));
    const date = section.match(/^##\s+(\d{1,2})\s*\n\n#####\s+([A-Za-z]{3}\s+\d{4})/m);
    const url = section.match(/\[Scorecard\]\((https?:\/\/[^)]+)\)/)?.[1]?.replace("prod-lm.cricclubs.com", "cricclubs.com") || SCORECARDS;
    return { id: section.match(/matchId=(\d+)/)?.[1] || `feed-${index}`, teamA: teamName(heading[1]), teamB: teamName(heading[2]), scoreA: scores[0] ? `${scores[0][1]} (${scores[0][2]} ov)` : undefined, scoreB: scores[1] ? `${scores[1][1]} (${scores[1][2]} ov)` : undefined, result: complete ? detail : undefined, date: date ? `${date[1]} ${date[2]}` : undefined, status: complete ? "complete" : live ? "live" : "scheduled", url };
  });
}

async function reader(path = "") {
  let lastStatus = 0;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    const response = await fetch(`${READER}${path}`, {
      headers: { accept: "text/plain", "user-agent": "GRTA-standings-collector/1.0", "x-no-cache": "true", "x-return-format": "markdown" },
      signal: AbortSignal.timeout(45000),
    });
    if (response.ok) return response.text();
    lastStatus = response.status;
    if (attempt < 3) await new Promise((resolveDelay) => setTimeout(resolveDelay, attempt * 15000));
  }
  throw new Error(`Reader returned ${lastStatus}.`);
}

const table = standings(await reader());
let matchList = [];
try {
  matchList = matches(await reader("/listMatches.do?league=21&clubId=1004528"));
} catch (error) {
  console.warn(`Match details skipped: ${error.message}`);
}

const snapshot = {
  generatedAt: new Date().toISOString(), source: "github-collector", competition: "GRTA 2026 • League 21",
  liveMatches: matchList.filter((match) => match.status === "live"),
  recentMatches: matchList.filter((match) => match.status === "complete").slice(0, 8),
  playoffMatches: [], standings: table,
  completedGroupMatches: Math.min(66, Math.round(table.reduce((sum, row) => sum + row.played, 0) / 2)), warnings: [],
};

let previous;
try { previous = JSON.parse(await readFile(output, "utf8")); } catch {}
const comparable = (value) => JSON.stringify({ ...value, generatedAt: undefined });
if (previous && comparable(previous) === comparable(snapshot)) {
  console.log("No standings change.");
  process.exit(0);
}
await mkdir(dirname(output), { recursive: true });
await writeFile(output, `${JSON.stringify(snapshot, null, 2)}\n`);
console.log(`Saved ${snapshot.completedGroupMatches} completed group matches.`);
