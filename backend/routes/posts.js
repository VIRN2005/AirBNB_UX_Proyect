const express = require('express');
const { listPosts, createPost, editPost, deletePost } = require('../controllers/postController');

const router = express.Router();

router.get('/listPosts', listPosts);
router.post('/createPost', createPost);
router.put('/editPost/:id', editPost);
router.delete('/deletePost/:id', deletePost);

module.exports = router;