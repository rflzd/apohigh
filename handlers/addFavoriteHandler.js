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

// Sevimli komanda əlavə etmək
function addFavoriteTeam(teamName) {
    const favoriteTeams = readFavoriteTeams();
    favoriteTeams.push({ name: teamName });
    fs.writeFileSync(FAVORITE_TEAMS_FILE, JSON.stringify(favoriteTeams, null, 2));
}

// Add Favorite Handler funksiyası
async function addFavoriteHandler(msg, bot, args) {
    const chatId = msg.chat.id;
    const teamName = args && args.length ? args.join(' ') : '';

    if (!teamName) {
        await bot.sendMessage(chatId, "Zəhmət olmasa, əlavə etmək istədiyiniz komandanın adını daxil edin.");
        return;
    }

    // Komandayı əlavə edirik
    addFavoriteTeam(teamName);
    await bot.sendMessage(chatId, `${teamName} komandası sevimli komandalarınıza əlavə edildi!`);
}

module.exports = addFavoriteHandler;