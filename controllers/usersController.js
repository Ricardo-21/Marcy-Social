const {User} = require('../models/Users');
const {Post} = require('../models/Post');

const getUsers = async (req, res) => {
    let users = await User.getUsers();
    res.status(200).json(users);
}

const getUser = async (req, res) => {
    const user = await User.getUser(req.params.id);
    res.status(200).json(user);
}

const getUserUsername = async (req, res) => {
    const user = req.session.user;
    const otherUser = await User.getUserUsername(req.params.username);
    if(user) {
        if(user.id == otherUser.id) {
            res.redirect('/profile');
        }
        else if(otherUser) {
            const posts = await Post.allUsersPost(otherUser.id);

            for(let i = 0; i < posts.length; i ++) {
                let likes = await Post.getLikes(posts[i].id);
                let comments = await Post.getComments(posts[i].id);
                posts[i].likes = likes;
                posts[i].likeCount = likes.length;
                posts[i].comments = comments;
                console.log(posts[i].likeCount);
            }

            
            otherUser.photo_src = otherUser.photo_src || 'https://st.depositphotos.com/1915171/5109/v/600/depositphotos_51091665-stock-illustration-coder-sign-icon-programmer-symbol.jpg'
            res.render('otherUserProfile', {user, otherUser, posts});
        }
        else {
            res.send('User does not exist');
        }
    }
    else {
        res.redirect('/login');
    }

    
}

const getPostsAPI = async (req, res) => {
    const user = await User.getUser(req.params.id);
    const posts = await User.getPostsAPI(req.params.id);
    user.posts = posts;
    res.status(200).json(user);
}

module.exports = {
    getUsers,
    getUsers,
    getPostsAPI,
    getUser,
    getUserUsername
}