const moment = require('moment-timezone');

/**
 * İstifadəçi göndərdiyi tarix və timezone əsasında API üçün UTC tarix qaytarır
 * @param {string} userDate — istifadəçi üçün görünən tarix (YYYY-MM-DD)
 * @param {string} userTimezone — istifadəçi timezone-u (məs: "Asia/Baku")
 * @returns {string} UTC tarix (YYYY-MM-DD)
 */
function getUTCDateForAPI(userDate, userTimezone) {
    // İstifadəçi lokal vaxtında günün başlanğıcı
    const localStart = moment.tz(userDate, userTimezone).startOf('day');
    // UTC-də həmin günün başlanğıcı
    return localStart.clone().utc().format('YYYY-MM-DD');
}

module.exports = { getUTCDateForAPI };