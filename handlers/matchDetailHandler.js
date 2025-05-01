const fs = require('fs');
const path = require('path');

// JSON faylından matçları oxuyan funksiya
function readMatchesFromJson() {
    const filePath = path.join(__dirname, '..', 'matches_data.json');
    if (!fs.existsSync(filePath)) return [];
    try {
        const data = fs.readFileSync(filePath, 'utf-8');
        const json = JSON.parse(data);
        // Python kodunda matches 'data' açarı altında idi
        return Array.isArray(json.data) ? json.data : [];
    } catch (e) {
        console.error('Matçlar oxunarkən xəta:', e);
        return [];
    }
}

// Matç detalı üçün handler
async function matchDetailHandler(msg, bot) {
    const chatId = msg.chat.id;
    const matchId = msg.text.trim();

    const matches = readMatchesFromJson();
    const matchDetails = matches.find(match => String(match.id) === matchId);

    if (!matchDetails) {
        await bot.sendMessage(chatId, "⚠️ Matç tapılmadı.");
        return;
    }

    let message = `⚽ *Matç Detalları*\n\n`;
    message += `Ev Sahibi: ${matchDetails.homeTeam.name}\n`;
    message += `Qonaq: ${matchDetails.awayTeam.name}\n`;
    message += `Vaxt: ${matchDetails.date}\n`;
    message += `Status: ${matchDetails.status}\n`;

    await bot.sendMessage(chatId, message, { parse_mode: "Markdown" });
}

module.exports = matchDetailHandler;