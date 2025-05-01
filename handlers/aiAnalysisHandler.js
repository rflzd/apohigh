import { aggregateAnalysis } from '../ai/aggregateAnalysis';

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
exports.aiAnalysisHandler = aiAnalysisHandler;
// bot/handlers/aiAnalysisHandler.ts
const aggregateAnalysis_1 = require("../../ai/aggregateAnalysis");
/**
 * İstifadəçinin AI analiz sorğusunu qəbul edib yekun cavabı formalaşdırır.
 * (Bot platformasından asılı olaraq - Telegram, Discord və s. - req/res interfeysi uyğunlaşdırıla bilər.)
 */
function aiAnalysisHandler(matchId, replyFn) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            replyFn('AI analiz işə salındı, matç məlumatları yığılır...');
            // 1. Bütün AI analiz nəticələrini topla
            const result = yield (0, aggregateAnalysis_1.aggregateAnalysis)(matchId);
            // 2. Cavabı formatla
            const msg = `⚡️ AI Matç Analizi (${matchId})\n\n` +
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
        }
        catch (e) {
            replyFn('❌ AI analiz zamanı xəta baş verdi. Zəhmət olmasa bir az sonra yenidən yoxlayın.');
        }
    });
}
