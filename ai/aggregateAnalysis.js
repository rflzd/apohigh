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
exports.aggregateAnalysis = aggregateAnalysis;
// ai/aggregateAnalysis.ts
const dataFetcher_1 = require("./dataFetcher");
const probabilityAnalysis_1 = require("./probabilityAnalysis");
const fuzzyLogicAnalysis_1 = require("./fuzzyLogicAnalysis");
const oddsManipulationAnalysis_1 = require("./oddsManipulationAnalysis");
/**
 * Bütün AI analiz modulllarını birləşdirib yekun nəticə qaytarır.
 * matchId: matçın ID-si və ya kodu.
 */
function aggregateAnalysis(matchId) {
    return __awaiter(this, void 0, void 0, function* () {
        // 1. Bütün lazımlı datanı topla
        const data = yield (0, dataFetcher_1.fetchMatchData)(matchId);
        // 2. Bütün analizləri paralel çağır
        const [probability, fuzzy, odds] = yield Promise.all([
            (0, probabilityAnalysis_1.probabilityAnalysis)(data),
            (0, fuzzyLogicAnalysis_1.fuzzyLogicAnalysis)(data),
            (0, oddsManipulationAnalysis_1.oddsManipulationAnalysis)(data)
        ]);
        // 3. Yekun nəticəni qaytar
        return {
            probability,
            fuzzy,
            odds
        };
    });
}
