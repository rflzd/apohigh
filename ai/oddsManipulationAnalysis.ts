// ai/oddsManipulationAnalysis.ts
import { MatchData } from './dataFetcher';

export interface OddsResult {
  suspicious: boolean;    // Bukmeyker əmsalında manipulyasiya şübhəsi
  manipulationScore: number; // 0-1 arası şübhə dərəcəsi
  explanation: string;    // Qısa izahat
}

/**
 * Bukmeyker əmsal manipulyasiyası analizi.
 * Əmsal dəyişiklikləri, həddindən artıq oynanma və s. əsas götürülür.
 */
export async function oddsManipulationAnalysis(data: MatchData): Promise<OddsResult> {
  // Sadə nümunə: Əmsalın qısa müddətdə dəyişmə dərəcəsi və həcm
  const oddsHistory = data.odds?.history || [];
  let manipulationScore = 0;
  let suspicious = false;
  let explanation = 'Əmsal dəyişikliklərində anormallıq müşahidə olunmadı.';

  if (oddsHistory.length > 1) {
    const lastOdds = oddsHistory[oddsHistory.length - 1]?.value || 0;
    const firstOdds = oddsHistory[0]?.value || 0;
    const change = Math.abs(lastOdds - firstOdds);
    manipulationScore = Math.min(change / (firstOdds || 1), 1);

    if (manipulationScore > 0.2) {
      suspicious = true;
      explanation = `Əmsal ${firstOdds} → ${lastOdds} dəyişdi, dəyişiklik nisbəti: ${(manipulationScore * 100).toFixed(1)}%.`;
    }
  }

  return {
    suspicious,
    manipulationScore: +manipulationScore.toFixed(2),
    explanation
  };
}