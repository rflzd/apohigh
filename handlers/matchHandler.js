const fs = require('fs');
const path = require('path');
const { getLiveMatches, getPrematchMatches, getMatchDetail } = require('../services/highlightly');

// Canlı matçlar üçün siyahı handler-i
async function liveMatchListHandler(msg, bot, userContext = {}) {
    const chatId = msg.chat.id;
    try {
        const matches = await getLiveMatches();
        if (!matches.length) {
            await bot.sendMessage(chatId, "Hazırda canlı matç yoxdur.");
            return;
        }
        let message = "Canlı matçlar:\n";
        matches.forEach((match, idx) => {
            message += `${match.id}. ${match.homeTeam.name} - ${match.awayTeam.name} (${match.status})\n`;
        });
        message += "Ətraflı baxmaq üçün matçın ID-sini göndərin.";
        userContext.lastMatchList = matches;
        await bot.sendMessage(chatId, message);
    } catch (e) {
        console.error('liveMatchListHandler error:', e);
        await bot.sendMessage(chatId, "Canlı matçlar siyahısı alınmadı.");
    }
}

// Prematch matçlar üçün siyahı handler-i (optional search)
async function prematchMatchListHandler(msg, bot, userContext = {}) {
    const chatId = msg.chat.id;
    const search = msg.text ? msg.text.trim().toLowerCase() : '';
    try {
        let matches = await getPrematchMatches();
        if (search) {
            matches = matches.filter(
                m =>
                    m.homeTeam.name.toLowerCase().includes(search) ||
                    m.awayTeam.name.toLowerCase().includes(search)
            );
        }
        if (!matches.length) {
            await bot.sendMessage(chatId, "Uygun prematch matç tapılmadı.");
            return;
        }
        let message = "Prematch matçlar:\n";
        matches.forEach((match, idx) => {
            message += `${match.id}. ${match.homeTeam.name} - ${match.awayTeam.name} (${match.status})\n`;
        });
        message += "Ətraflı baxmaq üçün matçın ID-sini göndərin.";
        userContext.lastMatchList = matches;
        await bot.sendMessage(chatId, message);
    } catch (e) {
        console.error('prematchMatchListHandler error:', e);
        await bot.sendMessage(chatId, "Prematch matçlar siyahısı alınmadı.");
    }
}

// Matç detallarını göstərən handler (ID əsasında)
async function matchDetailHandler(msg, bot, userContext = {}) {
    const chatId = msg.chat.id;
    const matchId = msg.text.trim();
    try {
        // Əvvəlcə son siyahıdan yoxla, tapılmazsa API-dən al
        let matchDetails;
        if (userContext.lastMatchList) {
            matchDetails = userContext.lastMatchList.find(m => String(m.id) === matchId);
        }
        if (!matchDetails) {
            matchDetails = await getMatchDetail(matchId);
        }
        if (!matchDetails) {
            await bot.sendMessage(chatId, "Matç tapılmadı.");
            return;
        }
        let message = `⚽ *Matç Detalları*\n\n`;
        message += `Ev Sahibi: ${matchDetails.homeTeam.name}\n`;
        message += `Qonaq: ${matchDetails.awayTeam.name}\n`;
        message += `Vaxt: ${matchDetails.date}\n`;
        message += `Status: ${matchDetails.status}\n`;
        await bot.sendMessage(chatId, message, { parse_mode: "Markdown" });
    } catch (e) {
        console.error('matchDetailHandler error:', e);
        await bot.sendMessage(chatId, "Matç detalları alınmadı.");
    }
}

module.exports = {
    liveMatchListHandler,
    prematchMatchListHandler,
    matchDetailHandler
};