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
exports.probabilityAnalysis = probabilityAnalysis;
/**
 * Ehtimal nəzəriyyəsinə əsaslanan proqnoz.
 * Sadə nümunə: statistik göstəricilərin ortalamasına görə hesablanır.
 */
function probabilityAnalysis(data) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        // Sadə nümunə: son matçlardan qələbə, heç-heçə, məğlubiyyət faizlərini hesablamaq
        const stats = ((_a = data.stats) === null || _a === void 0 ? void 0 : _a.recentMatches) || [];
        const total = stats.length || 1;
        const winCount = stats.filter((m) => m.result === 'win').length;
        const drawCount = stats.filter((m) => m.result === 'draw').length;
        const loseCount = stats.filter((m) => m.result === 'lose').length;
        const winProb = winCount / total;
        const drawProb = drawCount / total;
        const loseProb = loseCount / total;
        return {
            win: +winProb.toFixed(2),
            draw: +drawProb.toFixed(2),
            lose: +loseProb.toFixed(2),
            explanation: `Son ${total} oyuna əsasən: Qalib ${winCount}, Heç-heçə ${drawCount}, Məğlub ${loseCount}.`
        };
    });
}
