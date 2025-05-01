require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const moment = require('moment-timezone');
const {
    getMatchById,
    searchTeamsByName,
    getLiveMatches,
    getPrematchMatches,
    getLeaguesByCountry,
    getCountries,
    getMatchesByDate
} = require('./services/highlightly');

// İstifadəçi timezone-ları üçün sadə yaddaş (istehsalda DB istifadə et)
const userTimezones = {}; // { [chatId]: "Asia/Baku" }

function setUserTimezone(chatId, timezone) {
    userTimezones[chatId] = timezone;
}
function getUserTimezone(chatId) {
    return userTimezones[chatId] || 'UTC';
}

// UTC tarixə çevirici
function getUTCDateForAPI(userDate, userTimezone) {
    return moment.tz(userDate, userTimezone).startOf('day').utc().format('YYYY-MM-DD');
}

// Telegram bot start
const TELEGRAM_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });

// /start komandası
bot.onText(/^\/start$/, async (msg) => {
    const chatId = msg.chat.id;
    await bot.sendMessage(chatId, `Salam! Komandalar:
- /matchid <id> → Matçı ID ilə tap
- /team <ad> → Komandanı adı ilə tap
- /live → Canlı oyunlar
- /prematch → Prematch oyunlar
- /leagues <ölkə> → Liqalar
- /countries → Bütün ölkələr
- /matches <YYYY-MM-DD> → Tarixə görə oyunlar
- /timezone <Asia/Baku> → Sizin vaxt zonanız`);
});

// /matchid <id>
bot.onText(/^\/matchid (\d+)$/, async (msg, match) => {
    const chatId = msg.chat.id;
    const matchId = match[1];
    const result = await getMatchById(matchId);
    if (result) {
        let text = `Matç tapıldı:\n${result.home_team?.name} - ${result.away_team?.name}\nStatus: ${result.status}\nTarix: ${result.date}`;
        await bot.sendMessage(chatId, text);
    } else {
        await bot.sendMessage(chatId, 'Bu ID ilə matç tapılmadı.');
    }
});

// /team <ad>
bot.onText(/^\/team (.+)$/, async (msg, match) => {
    const chatId = msg.chat.id;
    const teamName = match[1];
    const teams = await searchTeamsByName(teamName);
    if (teams.length) {
        let text = "Tapılmış komandalar:\n";
        teams.forEach(t => {
            text += `- ${t.name} (${t.country || ''})\n`;
        });
        await bot.sendMessage(chatId, text);
    } else {
        await bot.sendMessage(chatId, 'Bu adda komanda tapılmadı.');
    }
});

// /live
bot.onText(/^\/live$/, async (msg) => {
    const chatId = msg.chat.id;
    const matches = await getLiveMatches();
    if (matches.length) {
        let text = "Canlı oyunlar:\n";
        matches.forEach(m => {
            text += `${m.home_team.name} - ${m.away_team.name} (${m.league.name})\n`;
        });
        await bot.sendMessage(chatId, text);
    } else {
        await bot.sendMessage(chatId, 'Hazırda canlı oyun yoxdur.');
    }
});

// /prematch
bot.onText(/^\/prematch$/, async (msg) => {
    const chatId = msg.chat.id;
    const matches = await getPrematchMatches();
    if (matches.length) {
        let text = "Prematch oyunlar:\n";
        matches.forEach(m => {
            text += `${m.home_team.name} - ${m.away_team.name} (${m.league.name})\n`;
        });
        await bot.sendMessage(chatId, text);
    } else {
        await bot.sendMessage(chatId, 'Hazırda prematch oyun yoxdur.');
    }
});

// /leagues <country>
bot.onText(/^\/leagues (.+)$/, async (msg, match) => {
    const chatId = msg.chat.id;
    const country = match[1];
    const leagues = await getLeaguesByCountry(country);
    if (leagues.length) {
        let text = `${country} ölkəsində liqalar:\n`;
        leagues.forEach(l => {
            text += `- ${l.name}\n`;
        });
        await bot.sendMessage(chatId, text);
    } else {
        await bot.sendMessage(chatId, `Bu ölkədə liqa tapılmadı: ${country}`);
    }
});

// /countries
bot.onText(/^\/countries$/, async (msg) => {
    const chatId = msg.chat.id;
    const countries = await getCountries();
    if (countries.length) {
        let text = "Bütün ölkələr:\n";
        countries.forEach(c => {
            text += `- ${c.name}\n`;
        });
        await bot.sendMessage(chatId, text);
    } else {
        await bot.sendMessage(chatId, 'Ölkə tapılmadı.');
    }
});

// /matches <YYYY-MM-DD>
bot.onText(/^\/matches (\d{4}-\d{2}-\d{2})$/, async (msg, match) => {
    const chatId = msg.chat.id;
    const userDate = match[1];
    const userTimezone = getUserTimezone(chatId);
    const utcDate = getUTCDateForAPI(userDate, userTimezone);

    const matches = await getMatchesByDate(utcDate);
    if (matches.length) {
        let text = `${userDate} (${userTimezone}) üçün oyunlar:\n`;
        matches.forEach(m => {
            text += `${m.home_team.name} - ${m.away_team.name} (${m.league.name})\n`;
        });
        await bot.sendMessage(chatId, text);
    } else {
        await bot.sendMessage(chatId, `${userDate} üçün oyun tapılmadı.`);
    }
});

// /timezone <Asia/Baku>
bot.onText(/^\/timezone (.+)$/, async (msg, match) => {
    const chatId = msg.chat.id;
    const tz = match[1];
    if (!moment.tz.zone(tz)) {
        await bot.sendMessage(chatId, "Düzgün timezone göndərin. Məs: Asia/Baku, Europe/London, America/New_York və s.");
        return;
    }
    setUserTimezone(chatId, tz);
    await bot.sendMessage(chatId, `Sizin timezone: ${tz} olaraq yadda saxlanıldı.`);
});