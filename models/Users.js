const db = require('../db/db');

class User {
    static getUsers() {
        const queryText = "SELECT id, username, firstname, lastname, photo_src, bio FROM users";

        return db.query(queryText).then(users => users.rows);
    }

    static createPost(user_id, title, descr, project_link) {
        const queryText = 'INSERT INTO posts (user_id, title, descr, project_link) VALUES ($1, $2, $3, $4)'
        return db.query(queryText, [user_id, title, descr, project_link])
    }
    
    static getUser(user_id) {
        const queryText = "SELECT id, username, firstname, lastname, photo_src, bio FROM users WHERE id = $1";
        return db.query(queryText, [user_id]).then(user => user.rows[0]);
    }

    static getPostsAPI(user_id) {
        const queryText = "SELECT * FROM posts WHERE user_id = $1";

        return db.query(queryText, [user_id]).then(posts => posts.rows);
    }
}

module.exports = {User};