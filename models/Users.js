const db = require('../db/db');

class User {
    static getUsers() {
        const queryText = "SELECT id, username, firstname, lastname, photo_src, bio FROM users";

        return db.query(queryText).then(users => users.rows);
    }
}

module.exports = {User};