const {User} = require('../models/Users');

const getUsers = async (req, res) => {
    let users = await User.getUsers();
    res.status(200).json(users);
}

const getUser = async (req, res) => {
    const user = await User.getUser(req.params.id);
    res.status(200).json(user);
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
    getUser
}