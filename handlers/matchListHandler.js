const { getLiveMatchesByDate } = require('../services/highlightly');
const { getUserTimezone } = require('../services/userSettings');
const { getUTCDateForAPI } = require('../utils/timezoneHelper');

async function matchListByDateHandler(msg, bot) {
    const chatId = msg.chat.id;
    const userDate = msg.text.trim(); // İstifadəçi tarix göndərib: "2024-05-03"
    const userTimezone = getUserTimezone(chatId);

    // UTC tarix al
    const utcDate = getUTCDateForAPI(userDate, userTimezone);

    const matches = await getLiveMatchesByDate(utcDate);
    // Burada matç siyahısını istifadəçiyə göndər...
    if (!matches.length) {
        await bot.sendMessage(chatId, "Bu tarixdə oyun tapılmadı.");
    } else {
        let message = `${userDate} (${userTimezone}) üçün oyunlar:\n`;
        matches.forEach(m => message += `${m.home_team.name} - ${m.away_team.name}\n`);
        await bot.sendMessage(chatId, message);
    }
}

module.exports = matchListByDateHandler;