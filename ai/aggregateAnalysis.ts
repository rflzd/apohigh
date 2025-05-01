// ai/aggregateAnalysis.ts
import { fetchMatchData, MatchData } from './dataFetcher';
import { probabilityAnalysis, ProbabilityResult } from './probabilityAnalysis';
import { fuzzyLogicAnalysis, FuzzyResult } from './fuzzyLogicAnalysis';
import { oddsManipulationAnalysis, OddsResult } from './oddsManipulationAnalysis';

export interface AggregateResult {
  probability: ProbabilityResult;
  fuzzy: FuzzyResult;
  odds: OddsResult;
}

/**
 * Bütün AI analiz modulllarını birləşdirib yekun nəticə qaytarır.
 * matchId: matçın ID-si və ya kodu.
 */
export async function aggregateAnalysis(matchId: string): Promise<AggregateResult> {
  // 1. Bütün lazımlı datanı topla
  const data: MatchData = await fetchMatchData(matchId);

  // 2. Bütün analizləri paralel çağır
  const [probability, fuzzy, odds] = await Promise.all([
    probabilityAnalysis(data),
    fuzzyLogicAnalysis(data),
    oddsManipulationAnalysis(data)
  ]);

  // 3. Yekun nəticəni qaytar
  return {
    probability,
    fuzzy,
    odds
  };
}