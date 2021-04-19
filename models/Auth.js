const db = require("../db/db");

class Auth {

    static register(body) {
        let queryText = "INSERT INTO users (firstname, lastname, username, encrypted_password, photo_src, api_key) VALUES ($1, $2, $3, $4, $5, $6);";
        let apiKey = this.generateApi()
        let photo_src = 'https://st.depositphotos.com/1915171/5109/v/600/depositphotos_51091665-stock-illustration-coder-sign-icon-programmer-symbol.jpg'
        
        db.query(queryText, [body.firstname, body.lastname, body.username, body.encrypt, photo_src, apiKey])
    }

    static getUser(body) {
        let queryText = "SELECT * FROM users WHERE username = $1;";

        return db.query(queryText, [body.username]).then(results => results.rows[0]);
    }

    static getUserApi(api_key) {
        let queryText = "SELECT id FROM users WHERE api_key = $1"

        return db.query(queryText, [api_key]).then(user => user.rows[0]);
    }

    static generateApi(){
        let dt = new Date().getTime();
        let apiKey = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            let r = (dt + Math.random()*16)%16 | 0;
            dt = Math.floor(dt/16);
            return (c=='x' ? r :(r&0x3|0x8)).toString(16);
        });
        return apiKey;
    }
}

module.exports = {Auth};