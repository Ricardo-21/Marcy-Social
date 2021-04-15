const express = require('express');
const postsController = require('../controllers/postsController');
const usersController = require('../controllers/usersController');
const {Auth} = require('../models/Auth');
const {User} = require('../models/Users');
const router = express.Router();
const bcrypt = require('bcrypt');
const {Post} = require('../models/Post');
// const {Events} = require('../models/Events');

router.get('/', async (req, res) => {
    const user = req.session.user;
    const posts = await Post.allPosts()

    for(let i = 0; i < posts.length; i ++) {
        let likes = await Post.getLikes(posts[i].id);
        let comments = await Post.getComments(posts[i].id);
        let viewpost = await Post.getPost(posts[i].id)
        posts[i].likes = likes;
        posts[i].comments = comments;
        posts[i].viewpost = viewpost
    }
    
    if(user) {
        res.render('home', {posts, user})
    }
    else {
        res.redirect('/login');
    }
})

router.get('/login', (req, res) => {res.render('login')})

router.get('/register', (req, res) => {res.render('register')})

router.get('/thankyou', (req, res) => {res.render('thankyou')})

router.post('/login', async (req, res) => {
    let user = await Auth.getUser(req.body);
    const {username, password} = req.body;
    if(user) {
        bcrypt.compare(password, user.encrypted_password, (err, results) =>{
            if (results) {
                // the email exists in the db and the password was a match
                req.session.user = user
                res.redirect('/')
                console.log('signed in')
                // res.send('Right email and password');
              } else {
                res.send("Invalid credentials"); // password is incorrect
              }
        })
    }
    else {
        res.send('wrong creds');
    }

})

router.get('/logout', (req, res) => {
    req.session.destroy()
    res.redirect('/login')
  })

router.post('/register', async (req, res) => {
    bcrypt.hash(req.body.password, 10, (err, hash) =>{
        if(err){
            res.send("error", error);
        }
        else {
            req.body.encrypt = hash;
            Auth.register(req.body);
            res.render('thankyou', {name: req.body.firstname})
        }
    })
})

router.get('/createPost', (req, res) => {
    const user = req.session.user;
    res.render('postForm', {user})
})

router.post('/createPost', postsController.createPost)

router.get('/profile', async (req, res) => {
    const user = req.session.user;
    if(user) {
        let posts = await Post.allUsersPost(user.id)
        res.render('userProfile', {user, posts})
    }
    else {
        res.redirect('/login');
    }
    
})

router.get("/users", async (req, res) => {
    const user = req.session.user;
    if(user) {
        // const users = await User.getUsers();
        res.render('users', {user})
    }
    else {
        res.redirect('/login');
    }
    
})

router.get('/users/:username', usersController.getUserUsername);

// router.get('/posts/:id', async (req, res) => {
//     debugger;
//     let viewpost = await Post.getPost(req.params.id)
//     res.render('home', {})
// })

router.delete("/deletePost/:id", async (req, res) => {
    await Post.deletePost(req.params.id)
    res.redirect('/profile')
})

router.get("/profile/edit", async (req, res) => {
    const user = req.session.user;
    res.render("editProfile", {user})
})

module.exports = router;