const Post = require("../models/Post");
const User = require("../models/User");
const client  = require("../config/elasticsearch");

exports.newPost = async (req, res) => {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User Not Found." });

    try {
        const post = new Post({
            title: req.body.title,
            desc: req.body.desc,
            username: user.username,
            category: req.body.category,
            photo: req.body.photo
        });
        const newPost = await post.save();

        // Index the new post in Elasticsearch
        await client.index({
            index: "posts",
            id: newPost._id.toString(),
            document: {
                title: newPost.title,
                desc: newPost.desc,
                username: newPost.username,
                category: newPost.category,
                photo: newPost.photo,
            }
        });

        return res.status(201).json(newPost);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "An error occurred while creating the post." });
    }
};

exports.deletePost = async (req, res) => {
    const postId = req.params.id;

    try {
        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ error: "Post not Found" });

        await Post.findByIdAndDelete(postId);
        await client.delete({
            index: "posts",
            id: postId,
        });

        return res.status(200).json({ message: "Post Deleted" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "An error occurred while deleting the post." });
    }
};

exports.updatePost = async (req, res) => {
    const postId = req.params.id;

    try {
        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ error: "Post Not Found." });

        if (post.username !== req.body.username) {
            return res.status(401).json({ error: "You Can Update Only Your Post" });
        }

        const updatedPost = await Post.findByIdAndUpdate(postId, req.body, { new: true });

        // Update the document in Elasticsearch
        await client.update({
            index: "posts",
            id: updatedPost._id.toString(),
            doc: {
                title: updatedPost.title,
                desc: updatedPost.desc,
                username: updatedPost.username,
                category: updatedPost.category,
                photo: updatedPost.photo,
            }
        });

        return res.status(200).json(updatedPost);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "An error occurred while updating the post." });
    }
};

exports.getPost = async (req, res) => {
    const postId = req.params.id;

    try {
        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ error: "Post Not Found." });
        return res.status(200).json(post);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "An error occurred while retrieving the post." });
    }
};

exports.getAllPosts = async (req, res) => {
    const { username, catName } = req.query;

    try {
        let posts;
        if (username) {
            posts = await Post.find({ username });
        } else if (catName) {
            posts = await Post.find({ category: catName });
        } else {
            posts = await Post.find();
        }
        return res.status(200).json(posts);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "An error occurred while retrieving posts." });
    }
};

exports.getElasticPost = async (req, res) => {
    const postId = req.params.id;

    try {
        const post = await client.get({
            index: "posts",
            id: postId,
        });
        return res.status(200).json(post._source);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "An error occurred while retrieving the post from Elasticsearch." });
    }
};
