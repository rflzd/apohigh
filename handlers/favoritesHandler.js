const fs = require('fs');
const path = require('path');

// Sevimli komandaların saxlandığı JSON faylı
const FAVORITE_TEAMS_FILE = path.join(__dirname, '..', 'favorite_teams.json');

// JSON faylından sevimli komandaları oxumaq
function readFavoriteTeams() {
    if (!fs.existsSync(FAVORITE_TEAMS_FILE)) return [];
    try {
        return JSON.parse(fs.readFileSync(FAVORITE_TEAMS_FILE, 'utf-8'));
    } catch {
        return [];
    }
}

// Favorites Handler funksiyası
async function favoritesHandler(msg, bot) {
    const chatId = msg.chat.id;
    const favoriteTeams = readFavoriteTeams();

    if (!favoriteTeams.length) {
        await bot.sendMessage(chatId, "Siz hələ heç bir sevimli komanda əlavə etməmisiniz.");
        return;
    }

    // Sevimli komandaların siyahısını formatlayırıq
    let message = "Sizin Sevimli Komandalarınız:\n";
    favoriteTeams.forEach(team => {
        message += `- ${team.name}\n`;
    });

    await bot.sendMessage(chatId, message);
}

module.exports = favoritesHandler;