const express = require('express');
const postsController = require('../controllers/postsController');
const usersController = require('../controllers/usersController');
const router = express.Router();
const {Events} = require('../models/Events');

router.get('/users', usersController.getUsers);

router.get('/users/:id', usersController.getUser);

router.get('/users/:id/posts', usersController.getPostsAPI);

router.get('/posts', postsController.getAllPosts);
 
router.get('/posts/:id', postsController.getPost);

router.post('/posts/new', postsController.createPostAPI);

router.delete('/posts/:id', postsController.deletePostAPI);

router.patch('/posts/:id', postsController.editPostAPI);

router.patch('/posts/:id/like', postsController.likePostAPI);

router.post('/posts/:id/comment', postsController.createCommentAPI);

router.delete('/comments/:id', postsController.deleteCommentAPI);

router.get('/comments', postsController.getComments);

router.get('/events', async (req, res) => {
    const events = await Events.getEvents();

    res.json(events);
})
module.exports = router;