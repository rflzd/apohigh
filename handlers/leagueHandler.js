const { getLeagues } = require('../services/highlightly');

// /league komandası üçün handler
async function leagueHandler(msg, bot) {
    const chatId = msg.chat.id;
    const countryName = msg.text.trim();

    try {
        // mode olaraq "live" göndəririk (istəyə görə dəyişmək olar)
        const leagues = await getLeagues({ mode: "live", country: countryName });

        if (!leagues || leagues.length === 0) {
            await bot.sendMessage(chatId, `⚠️ ${countryName} ölkəsi üçün liqalar tapılmadı.`);
            return;
        }

        let message = `⚽ ${countryName} ölkəsinin liqaları:\n`;
        leagues.forEach(league => {
            message += `${league.name} - ${league.country.name}\n`;
        });

        await bot.sendMessage(chatId, message);
    } catch (e) {
        console.error('League handler error:', e);
        await bot.sendMessage(chatId, "Xəta baş verdi, liqa siyahısı alınmadı.");
    }
}

module.exports = leagueHandler;