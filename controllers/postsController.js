const {Post} = require('../models/Post');
const {Auth} = require('../models/Auth');

const allPosts = async (req, res) => {
    let posts = await Post.allPosts();

    for(let i = 0; i < posts.length; i ++) {
        let likes = await Post.getLikes(posts[i].id);
        posts[i].likes = parseInt(likes.count);
        
    }

    res.status(200).render('home', {posts})
}

const getAllPosts = async (req, res) => {
    let posts = await Post.getAllPosts();

    for(let i = 0; i < posts.length; i ++) {
        let likes = await Post.getLikes(posts[i].id);
        posts[i].likes = parseInt(likes.count);
        
    }
    res.status(200).json(posts);
}

const getPost = async (req, res) => {
    const post = await Post.getPost(req.params.id);
    if(post) {
        
        let likes = await Post.getLikes(req.params.id)
        post.likes = parseInt(likes.count);
        post.comments = await Post.getComments(req.params.id);
        res.status(200).json(post);
    }
    else {
        res.send('Post does not exist');
    }
    
}

const createPostAPI = async (req, res) => {
    const api_key = req.headers['x-api-key'];

    if(api_key) {
        let user = await Auth.getUserApi(api_key);
        if(user) {
            
            const post = await Post.createPost(req.body, user);
            res.status(201).json(post);
            // debugger
        }
        else {
            res.send('Invalid API KEY')
        }
    }
    else {
        res.send('Please provide api-key to headers using X-API-KEY')
    }

}

const deletePostAPI = async (req, res) => {
    const api_key = req.headers['x-api-key'];

    if(api_key) {
        let user = await Auth.getUserApi(api_key);
        let post = await Post.getPost(req.params.id);
        if(user) {
            if(post) {
                if(user.id == post.user_id) {
                    res.status(200);
                    Post.deletePost(req.params.id);
                    res.send('Post successfully deleted');
                } 
                else {
                    res.status(403).send('You do not own this post');
                }
            }
            else {
                res.send('Post does not exist');            }
            }
        else {
            res.send('Invalid API KEY')
        }
    }
    else {
        res.send('Please provide api-key to headers using X-API-KEY')
    }
}

const editPostAPI = async (req, res) => {
    const api_key = req.headers['x-api-key'];

    if(api_key) {
        let user = await Auth.getUserApi(api_key);
        let post = await Post.getPost(req.params.id);
        if(user) {
            if(post) {
                if(user.id == post.user_id) {
                    Post.editPost(post, req.body);
                    post = await Post.getPost(req.params.id);
                    res.json(post);
                } 
                else {
                    res.status(403).send('You do not own this post');
                }
            }
            else {
                res.send('Post does not exist');
            }
            
        }
        else {
            res.send('Invalid API KEY')
        }
    }
    else {
        res.send('Please provide api-key to headers using X-API-KEY')
    }

}

const likePostAPI = async (req, res) => {
    const api_key = req.headers['x-api-key'];

    if(api_key) {
        let user = await Auth.getUserApi(api_key);
        let post = await Post.getPost(req.params.id);
        if(user) {
            if(post) {
                let like = await Post.likePostTable(user.id, post.id);
            
                if(like.length !== 0) {
                    Post.unlikePost(user.id, post.id);
                    res.send(`successfully unliked post ${post.id}`)
                }
                else {
                    Post.likePost(user.id, post.id);
                    res.send(`successfully liked post ${post.id}`);
                }
            }
            else {
                res.send('post does not exist');
            }

        }
        else {
            res.send('Invalid API KEY')
        }
    }
    else {
        res.send('Please provide api-key to headers using X-API-KEY')
    }
}

const createCommentAPI = async (req, res) => {
    let api_key = req.headers['x-api-key'];

    if(api_key) {
        let user = await Auth.getUserApi(api_key);
        let post = await Post.getPost(req.params.id);
        if(user) {
            if(post) {
                Post.addComment(post.id, user.id, req.body.comment);
                post = await Post.getPost(req.params.id); 
                post.comments = await Post.getComments(post.id);;

                res.json(post);
            }
            else {
                res.send('post does not exist');
            }
        }
        else {
            res.send('Invalid API KEY')
        }
    }
    else {
        res.send('Please provide api-key to headers using X-API-KEY')
    }
}

const getComments = async (req, res) => {
    let comments = await Post.getAllComments();

    res.json(comments);
}

const deleteCommentAPI = async (req, res) => {
    let api_key = req.headers['x-api-key'];
    let comment = await Post.getComment(req.params.id);
    let user = await Auth.getUserApi(api_key);
    if(api_key) {
        if(user) {
            if(comment) {
                if(comment.user_id == user.id) {
                    Post.deleteComment(comment.id);
                    res.send(`Comment with id: ${comment.id} has been deleted`);
                }
                else {
                    res.send('You do not own this comment');
                }
            }
            else {
                res.send('Comment does not exist');
            }
        }
        else {
            res.send('Invalid API KEY')
        }
    }
    else {
        res.send('Please provide api-key to headers using X-API-KEY')
    }
}

module.exports = {
    getAllPosts,
    getPost,
    createPostAPI,
    deletePostAPI,
    editPostAPI,
    likePostAPI,
    createCommentAPI,
    allPosts,
    deleteCommentAPI,
    getComments
}
