// index.ts
import { aiAnalysisHandler } from './handlers/aiAnalysisHandler';
import { couponAnalysisHandler } from './handlers/couponAnalysisHandler';

// Sənin platformandan asılı olaraq buranı dəyişə bilərsən.
// Məsələn, Telegram bot üçün telegraf, Discord üçün discord.js istifadə oluna bilər.
// Sadə local test üçün aşağıdakı kimi yazırıq:

async function main() {
  // Sadə nümunə: istifadəçidən input alırıq
  const prompt = require('prompt-sync')();

  const userId = '123'; // test üçün mövcud istifadəçi (premium)
  while (true) {
    const input = prompt('Matç ID-si və ya "kupon 123,456" yazın (çıxış üçün "exit"): ');
    if (input === 'exit') break;

    if (input.startsWith('kupon')) {
      // Kupon analizi
      const ids = input.replace('kupon', '').split(',').map(x => x.trim()).filter(Boolean);
      await couponAnalysisHandler(ids, userId, (msg: string) => console.log(msg));
    } else {
      // Tək matç analizi
      await aiAnalysisHandler(input.trim(), (msg: string) => console.log(msg));
    }
  }
}

main();