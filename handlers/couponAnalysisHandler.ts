// bot/handlers/couponAnalysisHandler.ts
import { checkUserPremium } from './subscriptionHandler';
import { aggregateAnalysis } from '../../ai/aggregateAnalysis';

/**
 * Kupon AI analizi (yalnız premium istifadəçilər üçün).
 * coupon: matç ID-lərinin siyahısı.
 * userId: istifadəçi identifikatoru.
 * replyFn: istifadəçiyə cavab göndərən funksiya.
 */
export async function couponAnalysisHandler(
  coupon: string[],
  userId: string,
  replyFn: (msg: string) => void
) {
  try {
    const isPremium = await checkUserPremium(userId);
    if (!isPremium) {
      replyFn('❗️ Bu funksiya yalnız premium abunəçilər üçün aktivdir.');
      return;
    }

    replyFn('Premium AI kupon analizi başlayır...');

    // Hər matç üçün AI analizini topla
    const results = await Promise.all(coupon.map(matchId => aggregateAnalysis(matchId)));

    // Cavabı formatla
    let msg = '🎯 Kupon AI Analiz Nəticələri:\n\n';
    results.forEach((result, idx) => {
      msg +=
        `Matç ${coupon[idx]}:\n` +
        `  📊 Qalib: ${(result.probability.win * 100).toFixed(1)}% | ` +
        `Heç-heçə: ${(result.probability.draw * 100).toFixed(1)}% | ` +
        `Məğlub: ${(result.probability.lose * 100).toFixed(1)}%\n` +
        `  🌀 İnam: ${(result.fuzzy.confidence * 100).toFixed(0)}% (${result.fuzzy.verdict})\n` +
        `  💰 Manipulyasiya: ${result.odds.suspicious ? 'Şübhəli' : 'Yox'}\n\n`;
    });

    replyFn(msg);

  } catch (e: any) {
    replyFn('❌ Kupon AI analizi zamanı xəta baş verdi.');
  }
}