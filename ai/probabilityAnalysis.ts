// ai/probabilityAnalysis.ts
import { MatchData } from './dataFetcher';

export interface ProbabilityResult {
  win: number;         // Qalib ehtimalı (0-1 arası)
  draw: number;        // Heç-heçə ehtimalı (0-1 arası)
  lose: number;        // Məğlub ehtimalı (0-1 arası)
  explanation: string; // Qısa izahat
}

/**
 * Ehtimal nəzəriyyəsinə əsaslanan proqnoz.
 * Sadə nümunə: statistik göstəricilərin ortalamasına görə hesablanır.
 */
export async function probabilityAnalysis(data: MatchData): Promise<ProbabilityResult> {
  // Sadə nümunə: son matçlardan qələbə, heç-heçə, məğlubiyyət faizlərini hesablamaq
  const stats = data.stats?.recentMatches || [];
  const total = stats.length || 1;
  const winCount = stats.filter((m: any) => m.result === 'win').length;
  const drawCount = stats.filter((m: any) => m.result === 'draw').length;
  const loseCount = stats.filter((m: any) => m.result === 'lose').length;

  const winProb = winCount / total;
  const drawProb = drawCount / total;
  const loseProb = loseCount / total;

  return {
    win: +winProb.toFixed(2),
    draw: +drawProb.toFixed(2),
    lose: +loseProb.toFixed(2),
    explanation: `Son ${total} oyuna əsasən: Qalib ${winCount}, Heç-heçə ${drawCount}, Məğlub ${loseCount}.`
  };
}