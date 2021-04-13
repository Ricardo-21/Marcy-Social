const db = require('../db/db');

class Post {
    static allPosts(){
        let queryText = 'SELECT * FROM posts'
        db.query(queryText).then(posts => {debugger;})
    }
}

module.exports = {Post}