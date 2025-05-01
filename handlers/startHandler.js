const { mainMenuKeyboard } = require('../utils/inlineKeyboards');

async function startHandler(msg, bot) {
    const chatId = msg.chat.id;
    const welcomeMessage =
`Salam! 👋

Botun əsas funksiyaları aşağıdakı düymələrdədir. İstədiyiniz bölməni seçin!`;

    await bot.sendMessage(chatId, welcomeMessage, mainMenuKeyboard());
}

module.exports = startHandler;