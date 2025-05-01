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
exports.fetchMatchData = fetchMatchData;
// ai/dataFetcher.ts
const highlightlyApi_1 = require("../services/highlightlyApi");
/**
 * Bir matç üçün lazımlı bütün məlumatları API-lərdən toplayır.
 * Gələcəkdə yeni data qaynağı əlavə etmək asandır.
 */
function fetchMatchData(matchId) {
    return __awaiter(this, void 0, void 0, function* () {
        // Paralel şəkildə bütün resursları yığırıq
        const [stats, odds, lineups, h2h] = yield Promise.all([
            (0, highlightlyApi_1.getMatchStats)(matchId),
            (0, highlightlyApi_1.getOdds)(matchId),
            (0, highlightlyApi_1.getLineups)(matchId),
            (0, highlightlyApi_1.getH2H)(matchId)
        ]);
        return {
            matchId,
            stats,
            odds,
            lineups,
            h2h
        };
    });
}
