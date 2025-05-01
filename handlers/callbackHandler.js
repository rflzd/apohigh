const { liveMatchListHandler, prematchMatchListHandler, matchDetailHandler } = require('./matchHandler');
const countryHandler = require('./countryHandler');
const leagueHandler = require('./leagueHandler');
const favoritesHandler = require('./favoritesHandler');
const addFavoriteHandler = require('./addFavoriteHandler');
const helpHandler = require('./helpHandler');

async function callbackHandler(query, bot) {
    const chatId = query.message.chat.id;
    const data = query.data;
    const userContext = {}; // Əgər kontekst idarə edirsənsə, uyğunlaşdır

    switch (data) {
        case 'LIVE':
            await liveMatchListHandler({ chat: { id: chatId } }, bot, userContext);
            break;
        case 'COUNTRY':
            await countryHandler({ chat: { id: chatId } }, bot);
            break;
        case 'LEAGUE':
            await leagueHandler({ chat: { id: chatId }, text: '' }, bot);
            break;
        case 'FAVORITES':
            await favoritesHandler({ chat: { id: chatId } }, bot);
            break;
        case 'ADD_FAVORITE':
            await bot.sendMessage(chatId, "Sevimli komanda əlavə etmək üçün komanda adını göndərin.");
            break;
        case 'HELP':
            await helpHandler({ chat: { id: chatId } }, bot);
            break;
        default:
            await bot.sendMessage(chatId, "Naməlum seçim.");
    }

    await bot.answerCallbackQuery(query.id);
}

module.exports = callbackHandler;