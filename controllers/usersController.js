const {User} = require('../models/Users');

const getUsers = async (req, res) => {
    let users = await User.getUsers();
    res.status(200).json(users);
}

const createPost = async (req, res) => {
    const {user_id, title, descr, project_link} = req.body
    try {
        await User.createPost(user_id, title, descr, project_link)
        res.status(201).redirect("/")
    } catch {
        res.sendStatus(500)
    }
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
    createPost,
    getUsers,
    getPostsAPI,
    getUser
}