const {Post} = require('../models/Posts');

const allPosts = async (req, res) => {
    let posts = await Post.allPosts();
    res.status(200).render('home')
}

module.exports = {
    allPosts
}

