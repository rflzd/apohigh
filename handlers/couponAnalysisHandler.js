"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.couponAnalysisHandler = couponAnalysisHandler;
// bot/handlers/couponAnalysisHandler.ts
const subscriptionHandler_1 = require("./subscriptionHandler");
const aggregateAnalysis_1 = require("../../ai/aggregateAnalysis");
/**
 * Kupon AI analizi (yalnız premium istifadəçilər üçün).
 * coupon: matç ID-lərinin siyahısı.
 * userId: istifadəçi identifikatoru.
 * replyFn: istifadəçiyə cavab göndərən funksiya.
 */
function couponAnalysisHandler(coupon, userId, replyFn) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const isPremium = yield (0, subscriptionHandler_1.checkUserPremium)(userId);
            if (!isPremium) {
                replyFn('❗️ Bu funksiya yalnız premium abunəçilər üçün aktivdir.');
                return;
            }
            replyFn('Premium AI kupon analizi başlayır...');
            // Hər matç üçün AI analizini topla
            const results = yield Promise.all(coupon.map(matchId => (0, aggregateAnalysis_1.aggregateAnalysis)(matchId)));
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
        }
        catch (e) {
            replyFn('❌ Kupon AI analizi zamanı xəta baş verdi.');
        }
    });
}
