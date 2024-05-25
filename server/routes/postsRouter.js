const express = require('express');
const postRoute = express.Router();
const {
    creatPost,
    getPosts,
    getSinglePost,
    getCatPosts,
    getUserPost,
    editPosts,
    deletePost,
} = require('../controllers/postController');
const authMidleware = require('../midllewaers/authMidleware');

postRoute.post('/', authMidleware, creatPost);
postRoute.get('/', getPosts);
postRoute.get('/:id', getSinglePost);
postRoute.get('/category/:category', getCatPosts);
postRoute.get('/users/:id', getUserPost);
postRoute.patch('/:id', authMidleware, editPosts);
postRoute.delete('/:id', authMidleware, deletePost);

module.exports = postRoute;
