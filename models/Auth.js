const db = require("../db/db");

class Auth {

    static register(body) {
        let queryText = "INSERT INTO users (firstname, lastname, username, encrypted_password) VALUES ($1, $2, $3, $4);";

        db.query(queryText, [body.firstname, body.lastname, body.username, body.encrypt])
    }

    static getUser(body) {
        let queryText = "SELECT * FROM users WHERE username = $1;";

        return db.query(queryText, [body.username]).then(results => results.rows[0]);
    }
}

module.exports = {Auth};