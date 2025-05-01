const moment = require('moment-timezone');
const { setUserTimezone } = require('../services/userSettings');

async function timezoneHandler(msg, bot) {
    const chatId = msg.chat.id;
    // İstifadəçi şəhər, timezone və ya ölkə göndərir
    const tz = msg.text.trim();

    if (!moment.tz.zone(tz)) {
        await bot.sendMessage(chatId, "Düzgün timezone göndərin. Məsələn: Asia/Baku, Europe/London, America/New_York və s.");
        return;
    }

    setUserTimezone(chatId, tz);
    await bot.sendMessage(chatId, `Sizin timezone: ${tz} olaraq qeyd olundu.`);
}

module.exports = timezoneHandler;