const express = require('express');
// const postsController = require('../contollers/tasksController');
const usersController = require('../controllers/usersController');
const router = express.Router();

router.get('/users', usersController.getUsers);

module.exports = router;