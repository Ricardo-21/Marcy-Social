const db = require('../db/db');

class User {
    static getUsers() {
        const queryText = "SELECT id, username, firstname, lastname, photo_src, bio FROM users";

        return db.query(queryText).then(users => users.rows);
    }
    
    static getUser(user_id) {
        const queryText = "SELECT id, username, firstname, lastname, photo_src, bio FROM users WHERE id = $1";
        return db.query(queryText, [user_id]).then(user => user.rows[0]);
    }

    static getPostsAPI(user_id) {
        const queryText = "SELECT * FROM posts WHERE user_id = $1";

        return db.query(queryText, [user_id]).then(posts => posts.rows);
    }

    static getUserUsername(username) {
        const queryText = "SELECT id, username, firstname, lastname, photo_src, bio FROM users WHERE username = $1"

        return db.query(queryText, [username]).then(user => user.rows[0]);
    }
}

module.exports = {User};