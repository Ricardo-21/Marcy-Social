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


module.exports = {
    getUsers,
    createPost
}