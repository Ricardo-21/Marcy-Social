const {User} = require('../models/Users');

const getUsers = async (req, res) => {
    let users = await User.getUsers();
    res.status(200).json(users);
}



module.exports = {
    getUsers
}