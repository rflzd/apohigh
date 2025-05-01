const fs = require('fs');
const path = require('path');
const Tesseract = require('tesseract.js'); // npm i tesseract.js

// Əmsalın ehtimalını hesablayan funksiya
function calculateProbability(odds) {
    return 1 / odds;
}

// Qeyri-səlis məntiq
function fuzzyLogic(probability) {
    if (probability > 0.75) return "Çox yüksək ehtimal";
    if (probability > 0.5) return "Orta ehtimal";
    return "Aşağı ehtimal";
}

// Əmsallar siyahısını təhlil et
function analyzeOdds(bettingOdds) {
    const probabilities = bettingOdds.map(calculateProbability);
    const fuzzyResults = probabilities.map(fuzzyLogic);
    return { probabilities, fuzzyResults };
}

// Şəkildən əmsalları çıxarır (OCR)
async function extractOddsFromImage(imagePath) {
    const { data: { text } } = await Tesseract.recognize(imagePath, 'eng');
    const odds = [];
    text.split(/\s+/).forEach(word => {
        const num = parseFloat(word.replace(',', '.'));
        if (!isNaN(num) && num > 1) odds.push(num);
    });
    return odds;
}

// Kupon analizi üçün handler
async function betAnalysisHandler(msg, bot) {
    const chatId = msg.chat.id;
    if (msg.photo && msg.photo.length) {
        // Ən böyük şəkli seçirik (ən son olan)
        const fileId = msg.photo[msg.photo.length - 1].file_id;
        try {
            // Şəkli yükləyirik
            const file = await bot.getFile(fileId);
            const fileUrl = `https://api.telegram.org/file/bot${bot.token}/${file.file_path}`;
            const dest = path.join(__dirname, '..', 'coupon_tmp.jpg');
            const res = await fetch(fileUrl);
            const buffer = await res.arrayBuffer();
            fs.writeFileSync(dest, Buffer.from(buffer));

            // Şəkildən əmsalları çıxarırıq
            const odds = await extractOddsFromImage(dest);

            if (!odds.length) {
                await bot.sendMessage(chatId, "Kupon şəkli üzərində əmsallar tapılmadı.");
                return;
            }

            // Əmsalları təhlil edirik
            const { probabilities, fuzzyResults } = analyzeOdds(odds);

            // Nəticələri istifadəçiyə göndəririk
            let resultMessage = "Kupon analizinin nəticələri:\n";
            odds.forEach((odd, idx) => {
                resultMessage += `Əmsal: ${odd} | Ehtimal: ${(probabilities[idx] * 100).toFixed(1)}% | Qiymət: ${fuzzyResults[idx]}\n`;
            });

            await bot.sendMessage(chatId, resultMessage);
            fs.unlinkSync(dest);
        } catch (e) {
            console.error('Bet analysis error:', e);
            await bot.sendMessage(chatId, "Xəta baş verdi, zəhmət olmasa sonra yenidən yoxlayın.");
        }
    } else {
        await bot.sendMessage(chatId, "Zəhmət olmasa bir kupon şəkli göndərin.");
    }
}

module.exports = betAnalysisHandler;