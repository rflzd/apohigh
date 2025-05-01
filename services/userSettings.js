// Sadə obyektlə (və ya DB ilə) hər istifadəçinin timezone-u saxlanıla bilər

const userTimezones = {}; // { [userId]: "Asia/Baku" }

function setUserTimezone(userId, timezone) {
    userTimezones[userId] = timezone;
}

function getUserTimezone(userId) {
    return userTimezones[userId] || "UTC"; // Default olaraq UTC
}

module.exports = { setUserTimezone, getUserTimezone };