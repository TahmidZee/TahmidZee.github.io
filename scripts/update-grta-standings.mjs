import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { constants, publicEncrypt } from "node:crypto";

const SCORECARDS = "https://cricclubs.com/GRTA1/listMatches.do?league=21&clubId=1004528";
const output = resolve(process.argv[2] || "assets/data/grta-standings.json");
const CORE = "https://core-prod-origin.cricclubs.com/core";
const APP_VERSION = "4.0.341";
const PUBLIC_KEY_BODY = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCNokj65NYc9LdYZshBi6I1BUVu8NdhcafSkzSugFVwUydw7t2DPaZcewxkko3G2R/0OS8s7ceSV/p4zljtgCNtls5A6TT2Ehsoxhqh6PHRRuK4gvhPn8gYtBXjQHkj0VWkr9VoPdEt3NQIr0MkBmwAgt5YkTCV1EZPOAnsLSnQrwIDAQAB";

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

function contentToken() {
  const lines = PUBLIC_KEY_BODY.match(/.{1,64}/g).join("\n");
  const key = `-----BEGIN PUBLIC KEY-----\n${lines}\n-----END PUBLIC KEY-----`;
  return publicEncrypt(
    { key, padding: constants.RSA_PKCS1_PADDING },
    Buffer.from(`core-${Date.now()}`),
  ).toString("base64");
}

async function core(path, params) {
  const search = new URLSearchParams({ v: APP_VERSION, "X-Auth-Token": "null", ...params });
  const response = await fetch(`${CORE}${path}?${search}`, {
    headers: { accept: "application/json", origin: "https://app.cricclubs.com", "x-content-token": contentToken() },
    signal: AbortSignal.timeout(30000),
  });
  const payload = await response.json();
  if (!response.ok || !payload.responseState || !Array.isArray(payload.data)) {
    throw new Error(payload.errorMessage || `CricClubs API returned ${response.status}.`);
  }
  return payload.data;
}

function standingsFromApi(data) {
  const rows = [];
  for (const group of data) {
    for (const item of group.teams || []) {
      const source = item.team || {};
      const team = teamName(source.teamName || item.teamName || "");
      const groupNumber = groupFor(team);
      if (!groupNumber) continue;
      rows.push({
        rank: 0, group: groupNumber, groupRank: 0, team,
        played: Number(source.matches || 0), won: Number(source.won || 0), lost: Number(source.lost || 0),
        tied: Number(source.tied || source.tie || 0), noResult: Number(source.noResult || source.abandoned || 0),
        points: Number(source.points || 0), nrr: Number.isFinite(Number(source.netRunRate)) ? Number(source.netRunRate) : null,
        isGroupWinner: false, tieUnresolved: false, division: "Eliminated", qualification: "Below cut line", knockout: "—",
      });
    }
  }
  if (rows.length !== 44) throw new Error(`Expected 44 teams; received ${rows.length}.`);
  return rank(rows);
}

function oversFromBalls(balls) {
  const value = Number(balls || 0);
  return `${Math.floor(value / 6)}.${value % 6}`;
}

function matchesFromApi(data) {
  return data.map((source) => {
    const complete = Number(source.isComplete) === 1;
    const live = !complete && String(source.status).toLowerCase() === "live";
    const teamA = teamName(source.teamOneName || "TBD");
    const teamB = teamName(source.teamTwoName || "TBD");
    const scoreA = Number(source.t1balls || source.t1total) > 0 ? `${source.t1total}/${source.t1wickets} (${oversFromBalls(source.t1balls)} ov)` : undefined;
    const scoreB = Number(source.t2balls || source.t2total) > 0 ? `${source.t2total}/${source.t2wickets} (${oversFromBalls(source.t2balls)} ov)` : undefined;
    return {
      id: String(source.matchId), teamA, teamB, scoreA, scoreB,
      result: source.result || undefined, date: source.matchDate || undefined,
      status: complete ? "complete" : live ? "live" : "scheduled",
      url: `https://cricclubs.com/GRTA1/viewScorecard.do?clubId=1004528&matchId=${source.matchId}`,
      matchType: source.matchType || "l",
    };
  });
}

const [pointsData, matchesData] = await Promise.all([
  core("/team/getPointsTable", { clubId: "1004528", seriesId: "21" }),
  core("/match/getMatches", { clubId: "1004528", seriesId: "21", limit: "100", offSet: "0" }),
]);
const table = standingsFromApi(pointsData);
const matchList = matchesFromApi(matchesData);

const snapshot = {
  generatedAt: new Date().toISOString(), source: "github-collector", competition: "GRTA 2026 • League 21",
  liveMatches: matchList.filter((match) => match.status === "live"),
  recentMatches: matchList.filter((match) => match.status === "complete").slice(0, 8),
  playoffMatches: matchList.filter((match) => match.matchType !== "l"), standings: table,
  completedGroupMatches: Math.min(66, Math.round(table.reduce((sum, row) => sum + row.played, 0) / 2)), warnings: [],
};

await mkdir(dirname(output), { recursive: true });
await writeFile(output, `${JSON.stringify(snapshot, null, 2)}\n`);
console.log(`Saved ${snapshot.completedGroupMatches} completed group matches.`);
