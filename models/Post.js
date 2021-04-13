const db = require('../db/db');

class Post {
    static getAllPosts() {
        const queryText = "SELECT * FROM posts ORDER BY id DESC";

        return db.query(queryText).then(users => users.rows);
    }

    static getPost(post_id) {
        const queryText = "SELECT * FROM posts WHERE id = $1";

        return db.query(queryText, [post_id]).then(post => post.rows[0]);
    }

    static getComments(post_id) {
        const queryText = "SELECT comments.id, username, user_id, initial_comment FROM comments, users WHERE post_id = $1 AND user_id = users.id ORDER BY comments.id ASC";

        return db.query(queryText, [post_id]).then(comments => comments.rows);
    }

    static addComment(post_id, user_id, comment) {
        const queryText = "INSERT INTO comments (post_id, user_id, initial_comment) VALUES ($1, $2, $3)";

        db.query(queryText, [post_id, user_id, comment]);
    }

    static createPost(body, user) {
        const queryText = "INSERT INTO posts (user_id, title, descr, project_link, code_block) VALUES ($1, $2, $3, $4, $5) RETURNING *";

        let project_link = body.project_link || null;
        let code_block = body.code_block || null;

        return db.query(queryText, [user.id, body.title, body.descr, project_link, code_block]).then(post => post.rows[0]);
    }

    static deletePost(post_id) {
        const queryText = "DELETE FROM posts WHERE id = $1";

        db.query(queryText, [post_id]);
    }

    static editPost(post, body) {
        const queryText = "UPDATE posts SET title = $1, descr = $2, project_link = $3, code_block = $4 WHERE id = $5 RETURNING *";
        let title = body.title || post.title;
        let descr = body.descr || post.descr
        let project_link = body.project_link || post.project_link;
        let code_block = body.code_block || post.code_block;


        return db.query(queryText, [title, descr, project_link, code_block, post.id]).then(post => post.rows[0]);
    }

    static likePostTable(user_id, post_id) {
        const queryText = "SELECT * FROM likes WHERE user_id = $1 AND post_id = $2";

        return db.query(queryText, [user_id, post_id]).then(result => result.rows);
    }

    static unlikePost(user_id, post_id) {
        const queryText = "DELETE FROM likes WHERE user_id = $1 AND post_id = $2";

        db.query(queryText, [user_id, post_id]);
    }

    static likePost(user_id, post_id) {
        const queryText = "INSERT INTO likes (user_id, post_id) VALUES ($1, $2)";

        db.query(queryText, [user_id, post_id]);
    }

    static getLikes(post_id) {
        const queryText = "SELECT COUNT(*) FROM likes WHERE post_id = $1"

        return db.query(queryText, [post_id]).then(likes => likes.rows[0]);
    }


}

module.exports = {Post};