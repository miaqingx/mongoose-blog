const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// get all posts endpoint
router.get('/fetch-posts', async (req, res) => {
    try{
        const posts = await Post.find();
        res.status(200).json({success: true, data: posts});
    } catch(error) {
       res.status(500).json({message: error.message});
    }
});

// create new post endpoint
router.post("/create-post", async (req, res) => {
    // extract data from request body
    const {title, content, postImg, category, tags} = req.body;
    try{
        // validation
        if (!title || !content || !postImg) {
            return res.status(400).json({message: "Title, content and postImg are required"});

        }
        // create new post
        const newPost = new Post({
            title,
            content,
            postImg,
            category,
            tags
        });
        // save post
        const savedPost = await newPost.save();
        // send response
        res.status(201).json({success: true, data: savedPost});

    } catch(error) {
        res.status(500).json({message: error.message});
    }
});

//get single post endpoint
router.get("/post/:postId", async (req,res) => {
    // extract postId from request params
    const {postId} = req.params;
    try {
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(200).json({message: "Post not found"});
        }
        res.status(200).json({success: true, data: post});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

// update single post endpoint
router.put("/update-post/:postId", async (req, res) => {
    // extract id from request params
    const {postId} = req.params;
    // extract data from request body
    const {title, content, postImg, category, tags} = req.body;
    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({message: "Post not found"});
        }
        // update post
        post.title = title;
        post.content = content; 
        post.postImg = postImg;
        post.category = category;
        post.tags = tags;
        // save updated post
        const updatedPost = await post.save();
        res.status(200).json({success: true, data: updatedPost});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

// delete single post endpoint
router.delete("/delete-post/:postId", async (req, res) => {
    // extract id from request params
    const {postId} = req.params;
    try {
        const post = await Post.findByIdAndDelete(postId);
        if (!post) {
            return res.status(404).json({message: "Post not found"});
        }

        res.status(200).json({success: true, message: "Post deleted successfully"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})
module.exports = router;