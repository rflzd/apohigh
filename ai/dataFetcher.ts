// ai/dataFetcher.ts
import { getMatchStats, getOdds, getLineups, getH2H } from '../services/highlightlyApi';

export interface MatchData {
  matchId: string;
  stats: any;
  odds: any;
  lineups: any;
  h2h: any;
  // Genişləndirmək üçün əlavə property-lər
}

/**
 * Bir matç üçün lazımlı bütün məlumatları API-lərdən toplayır.
 * Gələcəkdə yeni data qaynağı əlavə etmək asandır.
 */
export async function fetchMatchData(matchId: string): Promise<MatchData> {
  // Paralel şəkildə bütün resursları yığırıq
  const [stats, odds, lineups, h2h] = await Promise.all([
    getMatchStats(matchId),
    getOdds(matchId),
    getLineups(matchId),
    getH2H(matchId)
  ]);

  return {
    matchId,
    stats,
    odds,
    lineups,
    h2h
  };
}