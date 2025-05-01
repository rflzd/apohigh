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
exports.oddsManipulationAnalysis = oddsManipulationAnalysis;
/**
 * Bukmeyker əmsal manipulyasiyası analizi.
 * Əmsal dəyişiklikləri, həddindən artıq oynanma və s. əsas götürülür.
 */
function oddsManipulationAnalysis(data) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c;
        // Sadə nümunə: Əmsalın qısa müddətdə dəyişmə dərəcəsi və həcm
        const oddsHistory = ((_a = data.odds) === null || _a === void 0 ? void 0 : _a.history) || [];
        let manipulationScore = 0;
        let suspicious = false;
        let explanation = 'Əmsal dəyişikliklərində anormallıq müşahidə olunmadı.';
        if (oddsHistory.length > 1) {
            const lastOdds = ((_b = oddsHistory[oddsHistory.length - 1]) === null || _b === void 0 ? void 0 : _b.value) || 0;
            const firstOdds = ((_c = oddsHistory[0]) === null || _c === void 0 ? void 0 : _c.value) || 0;
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
    });
}
