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
        posts[i].likes = likes;
        posts[i].likeCount = likes.length;
        posts[i].comments = comments;
        console.log(posts[i].likeCount);
    }
    
    if(user) {
        // debugger;
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
    try {
        if(user){
          let results = await bcrypt.compare(password, user.encrypted_password)
          if (results) {
            // the email exists in the db
            // the password was a match
            req.session.user = user
            res.redirect('/')
          } else {
            throw Error("Your password is incorrect. Try again");
          }
        } else {
          throw Error("This username is not found");
        }
      } catch (error) {
        res.render("login", {message: error.message})
      }
    
    })

router.get('/logout', (req, res) => {
    req.session.destroy()
    res.redirect('/login')
  })

router.post('/register', async (req, res) => {
    let usernames = await User.getUserUsername(req.body.username)
    debugger;
    try {
        if(!usernames){
            bcrypt.hash(req.body.password, 10, (err, hash) => {
            if(err){
                res.send("error", error);
            }
            else {
                req.body.encrypt = hash;
                Auth.register(req.body);
                res.render('thankyou', {name: req.body.firstname})
            }
            })
        }
        else {
            throw Error('this username is already taken.')
        }

    } catch(error) {
        res.render('register', {message: error.message})
    }
})

router.get('/createPost', (req, res) => {
    const user = req.session.user;
    res.render('postForm', {user})
})

router.post('/createPost', postsController.createPost)

router.get('/profile', async (req, res) => {
    const user = await User.getUser(req.session.user.id)
    // const userAPI = req.session.user.api_key

    // debugger;
    if(user) {
        let posts = await Post.allUsersPost(user.id)

        for(let i = 0; i < posts.length; i ++) {
            let likes = await Post.getLikes(posts[i].id);
            let comments = await Post.getComments(posts[i].id);
            posts[i].likes = likes;
            posts[i].likeCount = likes.length;
            posts[i].comments = comments;
            console.log(posts[i].likeCount);
        }
        user.api_key = req.session.user.api_key
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

router.delete("/deletePost/:id", async (req, res) => {
    await Post.deletePost(req.params.id)
    res.redirect('/profile')
})

router.get("/post/:id/edit", async (req, res) =>{
    const user = req.session.user;
    let post = await Post.getPost(req.params.id)

    res.render('editPostForm', {user, post})
})

router.patch('/post/:id/edit', async (req, res) => {
    // debugger;
    await Post.editPost(req.params, req.body)
    res.redirect('/profile')
})

router.get('/profile/edit', (req, res) => {
    const user = req.session.user
    res.render('editProfile', {user})
})

router.patch('/profile/edit', async (req, res) => {
    const user = await User.getUser(req.session.user.id);
    await User.editUser(user, req.body)
    res.redirect('/profile')
})

router.get('*', (req, res) => {
    res.sendStatus(404);
})

module.exports = router;