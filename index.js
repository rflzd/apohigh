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
// index.ts
const aiAnalysisHandler_1 = require("./handlers/aiAnalysisHandler");
const couponAnalysisHandler_1 = require("./handlers/couponAnalysisHandler");
// Sənin platformandan asılı olaraq buranı dəyişə bilərsən.
// Məsələn, Telegram bot üçün telegraf, Discord üçün discord.js istifadə oluna bilər.
// Sadə local test üçün aşağıdakı kimi yazırıq:
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // Sadə nümunə: istifadəçidən input alırıq
        const prompt = require('prompt-sync')();
        const userId = '123'; // test üçün mövcud istifadəçi (premium)
        while (true) {
            const input = prompt('Matç ID-si və ya "kupon 123,456" yazın (çıxış üçün "exit"): ');
            if (input === 'exit')
                break;
            if (input.startsWith('kupon')) {
                // Kupon analizi
                const ids = input.replace('kupon', '').split(',').map(x => x.trim()).filter(Boolean);
                yield (0, couponAnalysisHandler_1.couponAnalysisHandler)(ids, userId, (msg) => console.log(msg));
            }
            else {
                // Tək matç analizi
                yield (0, aiAnalysisHandler_1.aiAnalysisHandler)(input.trim(), (msg) => console.log(msg));
            }
        }
    });
}
main();
