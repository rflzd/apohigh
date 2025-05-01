const fs = require('fs');
const path = require('path');

// JSON-dan canlı matçları oxuyub liqalar üzrə formatlayan funksiya
async function sendLiveMatches() {
    try {
        const filePath = path.join(__dirname, '..', 'matches_data.json');
        if (!fs.existsSync(filePath)) {
            console.error('matches_data.json faylı tapılmadı!');
            return "Canlı matç məlumatları tapılmadı.";
        }
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        let gamesInfo = "";
        const leagues = {};

        // Oyunları liqa üzrə qruplaşdırırıq
        (data.data || []).forEach(match => {
            const leagueName = match.league.name;
            const matchTime = match.date;
            const homeTeam = match.homeTeam.name;
            const awayTeam = match.awayTeam.name;
            const countryName = match.country.name;
            const matchId = match.id;

            // Saatı JS date obyektinə çeviririk
            const matchDatetime = new Date(matchTime);

            if (!leagues[leagueName]) leagues[leagueName] = [];
            leagues[leagueName].push({
                time: matchDatetime,
                home_team: homeTeam,
                away_team: awayTeam,
                match_id: matchId,
                country: countryName,
                match_time: matchTime
            });
        });

        // Formatlanmış mesajı yığırıq
        Object.entries(leagues).forEach(([leagueName, matches]) => {
            gamesInfo += `🇪🇸 ${leagueName} - Günün Oyunları:\n`;
            // Saatlara görə sıralayırıq
            matches.sort((a, b) => a.time - b.time);
            matches.forEach(match => {
                gamesInfo += `🆚 ${match.home_team} vs ${match.away_team} | Başlama Saatı: ${match.match_time} | Matç ID: ${match.match_id}\n`;
            });
        });

        return gamesInfo || "Hazırda oyun yoxdur.";
    } catch (e) {
        console.error("Error reading matches file:", e);
        return "Xəta baş verdi, canlı matç məlumatı alınmadı.";
    }
}

// /live komandası üçün handler
async function liveHandler(msg, bot) {
    const chatId = msg.chat.id;
    const gamesInfo = await sendLiveMatches();
    await bot.sendMessage(chatId, gamesInfo);
}

module.exports = liveHandler;