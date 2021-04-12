const db = require("../db/db");

class Auth {

    static register(body) {
        let queryText = "INSERT INTO users (username, encrypted_password) VALUES ($1, $2, $3);";

        db.query(queryText, [body.name, body.encrypt])
    }

    static getUser(body) {
        let queryText = "SELECT * FROM users WHERE username = $1;";

        return db.query(queryText, [body.username]).then(results => results.rows[0]);
    }
}

module.exports = {Auth};