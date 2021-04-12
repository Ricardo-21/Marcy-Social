const express = require('express');
// const postsController = require('../contollers/tasksController');
const usersController = require('../controllers/usersController');
const router = express.Router();

router.get('/', async (req, res) => {
    const user = req.session.user;
    if(user) {
        res.send(`${user} is logged in`)
    }
    else {
        res.redirect('/login');
    }
})


module.exports = router;