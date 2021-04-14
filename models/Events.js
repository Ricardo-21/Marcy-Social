const db = require('../db/db');

class Events {
    static getEvents() {
        return db.query("SELECT * FROM events").then(events => events.rows);
    }
}

module.exports = {Events};