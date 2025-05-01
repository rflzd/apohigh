function mainMenuKeyboard() {
    return {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: '⚡️ Canlı Matçlar', callback_data: 'LIVE' },
                    { text: '🌍 Ölkələr', callback_data: 'COUNTRY' }
                ],
                [
                    { text: '🏆 Liqalar', callback_data: 'LEAGUE' },
                    { text: '⭐️ Sevimlilər', callback_data: 'FAVORITES' }
                ],
                [
                    { text: '➕ Sevimli əlavə et', callback_data: 'ADD_FAVORITE' }
                ],
                [
                    { text: '📑 Kömək', callback_data: 'HELP' }
                ]
            ]
        }
    };
}

module.exports = { mainMenuKeyboard };