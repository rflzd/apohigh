// handlers/liveMatchAiHandler.ts
import { aggregateAnalysis } from '../ai/aggregateAnalysis';

/**
 * Canlı matç üçün AI analizini işə salır.
 * matchId: canlı matçın ID-si.
 * replyFn: istifadəçiyə cavab göndərən funksiya (məsələn, Telegram və s.).
 */
export async function liveMatchAiHandler(matchId: string, replyFn: (msg: string) => void) {
  try {
    replyFn('🔴 Canlı matç üçün AI analiz başlayır...');

    const result = await aggregateAnalysis(matchId);

    const msg =
      `🔴 Canlı Matç AI Analizi (${matchId})\n\n` +
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

    replyFn(msg);

  } catch (e: any) {
    replyFn('❌ Canlı matç AI analizi zamanı xəta baş verdi.');
  }
}