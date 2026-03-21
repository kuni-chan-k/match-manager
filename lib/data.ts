import { Competition, Team, Match } from "./types";
import { generateId, getCurrentTimestamp } from "./utils";

// localStorage のキー
const STORAGE_KEYS = {
  competitions: "match-manager-competitions",
  teams: "match-manager-teams",
  matches: "match-manager-matches",
} as const;

// --- 大会 ---

export function getCompetitions(): Competition[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(STORAGE_KEYS.competitions);
  return data ? JSON.parse(data) : [];
}

export function getCompetition(id: string): Competition | undefined {
  const competitions = getCompetitions();
  return competitions.find((c) => c.id === id);
}

export function saveCompetition(
  data: Omit<Competition, "id" | "createdAt" | "updatedAt">
): Competition {
  const competitions = getCompetitions();
  const now = getCurrentTimestamp();

  const newCompetition: Competition = {
    ...data,
    id: generateId(),
    createdAt: now,
    updatedAt: now,
  };

  competitions.push(newCompetition);
  localStorage.setItem(STORAGE_KEYS.competitions, JSON.stringify(competitions));

  return newCompetition;
}

export function updateCompetition(
  id: string,
  data: Partial<Omit<Competition, "id" | "createdAt" | "updatedAt">>
): Competition | undefined {
  const competitions = getCompetitions();
  const index = competitions.findIndex((c) => c.id === id);

  if (index === -1) return undefined;

  competitions[index] = {
    ...competitions[index],
    ...data,
    updatedAt: getCurrentTimestamp(),
  };

  localStorage.setItem(STORAGE_KEYS.competitions, JSON.stringify(competitions));

  return competitions[index];
}

export function deleteCompetition(id: string): boolean {
  const competitions = getCompetitions();
  const filtered = competitions.filter((c) => c.id !== id);

  if (filtered.length === competitions.length) return false;

  localStorage.setItem(STORAGE_KEYS.competitions, JSON.stringify(filtered));
  return true;
}

// --- チーム ---

export function getTeams(): Team[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(STORAGE_KEYS.teams);
  return data ? JSON.parse(data) : [];
}

export function getTeam(id: string): Team | undefined {
  const teams = getTeams();
  return teams.find((t) => t.id === id);
}

export function saveTeam(
  data: Omit<Team, "id" | "createdAt" | "updatedAt">
): Team {
  const teams = getTeams();
  const now = getCurrentTimestamp();

  const newTeam: Team = {
    ...data,
    id: generateId(),
    createdAt: now,
    updatedAt: now,
  };

  teams.push(newTeam);
  localStorage.setItem(STORAGE_KEYS.teams, JSON.stringify(teams));

  return newTeam;
}

export function updateTeam(
  id: string,
  data: Partial<Omit<Team, "id" | "createdAt" | "updatedAt">>
): Team | undefined {
  const teams = getTeams();
  const index = teams.findIndex((t) => t.id === id);

  if (index === -1) return undefined;

  teams[index] = {
    ...teams[index],
    ...data,
    updatedAt: getCurrentTimestamp(),
  };

  localStorage.setItem(STORAGE_KEYS.teams, JSON.stringify(teams));

  return teams[index];
}

export function deleteTeam(id: string): boolean {
  const teams = getTeams();
  const filtered = teams.filter((t) => t.id !== id);

  if (filtered.length === teams.length) return false;

  localStorage.setItem(STORAGE_KEYS.teams, JSON.stringify(filtered));
  return true;
}

// --- 試合 ---

export function getMatches(): Match[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(STORAGE_KEYS.matches);
  return data ? JSON.parse(data) : [];
}

export function getMatchesByCompetition(competitionId: string): Match[] {
  const matches = getMatches();
  return matches.filter((m) => m.competitionId === competitionId);
}

export function getMatch(id: string): Match | undefined {
  const matches = getMatches();
  return matches.find((m) => m.id === id);
}

export function saveMatch(
  data: Omit<Match, "id" | "createdAt" | "updatedAt">
): Match {
  const matches = getMatches();
  const now = getCurrentTimestamp();

  const newMatch: Match = {
    ...data,
    id: generateId(),
    createdAt: now,
    updatedAt: now,
  };

  matches.push(newMatch);
  localStorage.setItem(STORAGE_KEYS.matches, JSON.stringify(matches));

  return newMatch;
}

export function updateMatch(
  id: string,
  data: Partial<Omit<Match, "id" | "createdAt" | "updatedAt">>
): Match | undefined {
  const matches = getMatches();
  const index = matches.findIndex((m) => m.id === id);

  if (index === -1) return undefined;

  matches[index] = {
    ...matches[index],
    ...data,
    updatedAt: getCurrentTimestamp(),
  };

  localStorage.setItem(STORAGE_KEYS.matches, JSON.stringify(matches));

  return matches[index];
}

export function deleteMatch(id: string): boolean {
  const matches = getMatches();
  const filtered = matches.filter((m) => m.id !== id);

  if (filtered.length === matches.length) return false;

  localStorage.setItem(STORAGE_KEYS.matches, JSON.stringify(filtered));
  return true;
}
