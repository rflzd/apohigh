// bot/handlers/aiAnalysisHandler.ts
import { aggregateAnalysis } from '../../ai/aggregateAnalysis';

/**
 * İstifadəçinin AI analiz sorğusunu qəbul edib yekun cavabı formalaşdırır.
 * (Bot platformasından asılı olaraq - Telegram, Discord və s. - req/res interfeysi uyğunlaşdırıla bilər.)
 */
export async function aiAnalysisHandler(matchId: string, replyFn: (msg: string) => void) {
  try {
    replyFn('AI analiz işə salındı, matç məlumatları yığılır...');

    // 1. Bütün AI analiz nəticələrini topla
    const result = await aggregateAnalysis(matchId);

    // 2. Cavabı formatla
    const msg =
      `⚡️ AI Matç Analizi (${matchId})\n\n` +
      `📊 Ehtimal analiz:\n` +
      `  Qalib: ${(result.probability.win * 100).toFixed(1)}% | ` +
      `Heç-heçə: ${(result.probability.draw * 100).toFixed(1)}% | ` +
      `Məğlub: ${(result.probability.lose * 100).toFixed(1)}%\n` +
      `  (${result.probability.explanation})\n\n` +

      `🌀 Qeyri-səlis məntiq:\n` +
      `  İnam: ${(result.fuzzy.confidence * 100).toFixed(0)}% | ` +
      `Qiymət: ${result.fuzzy.verdict}\n` +
      `  (${result.fuzzy.explanation})\n\n` +

      `💰 Əmsal manipulyasiyası:\n` +
      `  Şübhəli: ${result.odds.suspicious ? 'Bəli' : 'Xeyr'} | ` +
      `Dərəcə: ${(result.odds.manipulationScore * 100).toFixed(1)}%\n` +
      `  (${result.odds.explanation})`;

    // 3. Cavabı istifadəçiyə göndər
    replyFn(msg);

  } catch (e: any) {
    replyFn('❌ AI analiz zamanı xəta baş verdi. Zəhmət olmasa bir az sonra yenidən yoxlayın.');
  }
}