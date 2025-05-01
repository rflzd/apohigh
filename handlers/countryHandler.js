const { getCountries } = require('../services/highlightly');

// /country komandası üçün handler
async function countryHandler(msg, bot) {
    const chatId = msg.chat.id;

    try {
        const countries = await getCountries();

        if (!countries || countries.length === 0) {
            await bot.sendMessage(chatId, "⚠️ Ölkə siyahısı tapılmadı.");
            return;
        }

        let message = "🌍 Mövcud ölkələr:\n";
        countries.forEach(country => {
            message += `- ${country.name}\n`;
        });

        await bot.sendMessage(chatId, message);
    } catch (e) {
        console.error('Country handler error:', e);
        await bot.sendMessage(chatId, "Xəta baş verdi, ölkə siyahısı alınmadı.");
    }
}

module.exports = countryHandler;