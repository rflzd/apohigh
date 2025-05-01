require('dotenv').config();
const axios = require('axios');

const BASE_URL = process.env.API_BASE_URL || 'https://soccer.highlightly.net';
const API_KEY = process.env.API_KEY || '';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'x-api-key': API_KEY
    }
});

/**
 * MATCHES
 */
// 1. Bütün matçlar (filtrlə)
async function getMatches(params = {}) {
    try {
        const { data } = await axiosInstance.get('/football/matches', { params });
        return data.data || [];
    } catch (e) {
        console.error('getMatches error:', e?.response?.data || e);
        return [];
    }
}

// 2. Matç detalı
async function getMatchById(matchId) {
    try {
        const { data } = await axiosInstance.get('/football/match', {
            params: { id: matchId }
        });
        return data.data || null;
    } catch (e) {
        console.error('getMatchById error:', e?.response?.data || e);
        return null;
    }
}

/**
 * TEAMS
 */
// 3. Komanda axtarışı
async function searchTeamsByName(teamName) {
    try {
        const { data } = await axiosInstance.get('/football/teams', {
            params: { search: teamName }
        });
        return data.data || [];
    } catch (e) {
        console.error('searchTeamsByName error:', e?.response?.data || e);
        return [];
    }
}

// 4. Komanda ID ilə
async function getTeamById(teamId) {
    try {
        const { data } = await axiosInstance.get(`/football/teams/${teamId}`);
        return data.data || null;
    } catch (e) {
        console.error('getTeamById error:', e?.response?.data || e);
        return null;
    }
}

/**
 * LEAGUES
 */
// 5. Liqalar (ölkə üzrə və ya axtarışla)
async function getLeagues(params = {}) {
    try {
        const { data } = await axiosInstance.get('/football/leagues', { params });
        return data.data || [];
    } catch (e) {
        console.error('getLeagues error:', e?.response?.data || e);
        return [];
    }
}

// 6. Liqa ID ilə
async function getLeagueById(leagueId) {
    try {
        const { data } = await axiosInstance.get(`/football/leagues/${leagueId}`);
        return data.data || null;
    } catch (e) {
        console.error('getLeagueById error:', e?.response?.data || e);
        return null;
    }
}

/**
 * COUNTRIES
 */
// 7. Bütün ölkələr
async function getCountries() {
    try {
        const { data } = await axiosInstance.get('/football/countries');
        return data.data || [];
    } catch (e) {
        console.error('getCountries error:', e?.response?.data || e);
        return [];
    }
}

/**
 * EVENTS
 */
// 8. Matçın hadisələri
async function getMatchEvents(matchId) {
    try {
        const { data } = await axiosInstance.get(`/football/events/${matchId}`);
        return data.data || [];
    } catch (e) {
        console.error('getMatchEvents error:', e?.response?.data || e);
        return [];
    }
}

/**
 * LINEUPS
 */
// 9. Matç heyətləri (lineups)
async function getMatchLineups(matchId) {
    try {
        const { data } = await axiosInstance.get(`/football/lineups/${matchId}`);
        return data.data || [];
    } catch (e) {
        console.error('getMatchLineups error:', e?.response?.data || e);
        return [];
    }
}

/**
 * STANDINGS
 */
// 10. Turnir cədvəli (standings)
async function getStandingsByLeagueId(leagueId) {
    try {
        const { data } = await axiosInstance.get(`/football/standings/${leagueId}`);
        return data.data || [];
    } catch (e) {
        console.error('getStandingsByLeagueId error:', e?.response?.data || e);
        return [];
    }
}

/**
 * ODDS (Əmsallar)
 */
// 11. Matç əmsalları
async function getMatchOdds(matchId) {
    try {
        const { data } = await axiosInstance.get(`/football/odds/${matchId}`);
        return data.data || [];
    } catch (e) {
        console.error('getMatchOdds error:', e?.response?.data || e);
        return [];
    }
}

/**
 * HEAD-TO-HEAD (H2H)
 */
// 12. İki komanda arasında H2H
async function getH2H(homeTeamId, awayTeamId) {
    try {
        const { data } = await axiosInstance.get('/football/h2h', {
            params: {
                home_team_id: homeTeamId,
                away_team_id: awayTeamId
            }
        });
        return data.data || [];
    } catch (e) {
        console.error('getH2H error:', e?.response?.data || e);
        return [];
    }
}

/**
 * REFEREES
 */
// 13. Hakimlər (əgər API-də varsa)
async function getReferees(params = {}) {
    try {
        const { data } = await axiosInstance.get('/football/referees', { params });
        return data.data || [];
    } catch (e) {
        console.error('getReferees error:', e?.response?.data || e);
        return [];
    }
}

/**
 * HIGHLIGHTS
 */
// 14. Matçın video xülasələri (highlights)
async function getMatchHighlights(matchId) {
    try {
        const { data } = await axiosInstance.get(`/football/highlights/${matchId}`);
        return data.data || [];
    } catch (e) {
        console.error('getMatchHighlights error:', e?.response?.data || e);
        return [];
    }
}

/**
 * LAST FIVE GAMES
 */
// 15. Komandanın son 5 oyunu (last five games)
async function getLastFiveGames(teamId) {
    try {
        const { data } = await axiosInstance.get(`/football/last-five-games/${teamId}`);
        return data.data || [];
    } catch (e) {
        console.error('getLastFiveGames error:', e?.response?.data || e);
        return [];
    }
}

/**
 * HEAD 2 HEAD (Geniş)
 */
// 16. İki komanda arasında H2H (head-to-head, geniş)
async function getHeadToHead(homeTeamId, awayTeamId) {
    try {
        const { data } = await axiosInstance.get('/football/h2h', {
            params: {
                home_team_id: homeTeamId,
                away_team_id: awayTeamId
            }
        });
        return data.data || [];
    } catch (e) {
        console.error('getHeadToHead error:', e?.response?.data || e);
        return [];
    }
}

module.exports = {
    getMatches,
    getMatchById,
    searchTeamsByName,
    getTeamById,
    getLeagues,
    getLeagueById,
    getCountries,
    getMatchEvents,
    getMatchLineups,
    getStandingsByLeagueId,
    getMatchOdds,
    getH2H,
    getReferees,
    getMatchHighlights,
    getLastFiveGames,
    getHeadToHead
};