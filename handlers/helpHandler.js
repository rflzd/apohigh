const { mainMenuKeyboard } = require('../utils/inlineKeyboards');

async function helpHandler(msg, bot) {
    const chatId = msg.chat.id;
    const helpMessage =
`Əsas komandalar və istifadə qaydası üçün aşağıdakı düymələrdən birini seçin.`;

    await bot.sendMessage(chatId, helpMessage, mainMenuKeyboard());
}

module.exports = helpHandler;