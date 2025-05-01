// ai/fuzzyLogicAnalysis.ts
import { MatchData } from './dataFetcher';

export interface FuzzyResult {
  confidence: number;      // 0-1 arası, ümumi nəticə inamı
  verdict: string;         // "Aydın üstünlük", "Orta risk", "Qarışıq mənzərə" və s.
  explanation: string;     // Qeyri-səlis məntiqin əsaslandırması
}

/**
 * Qeyri-səlis məntiq əsasında matç analizi.
 * Qiymətləndirmə statistika, heyət və əmsal risklərini nəzərə alır.
 */
export async function fuzzyLogicAnalysis(data: MatchData): Promise<FuzzyResult> {
  // Sadə nümunə: heyət tamlığı və əmsal dəyişkənliyinə baxırıq
  const missingPlayers = data.lineups?.missing?.length || 0;
  const oddsVolatility = data.odds?.volatility || 0; // 0-1 arası
  let confidence = 1 - (missingPlayers * 0.05 + oddsVolatility * 0.5);

  let verdict = 'Aydın üstünlük';
  if (confidence < 0.7 && confidence >= 0.4) verdict = 'Orta risk';
  if (confidence < 0.4) verdict = 'Qarışıq mənzərə';

  return {
    confidence: +confidence.toFixed(2),
    verdict,
    explanation:
      `Heyət itkiləri: ${missingPlayers}, Əmsal dəyişkənliyi: ${oddsVolatility}. ` +
      `Ümumi inam: ${verdict}.`
  };
}