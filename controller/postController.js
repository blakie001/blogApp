const Post = require("../models/Post");
const User = require("../models/User");


exports.newPost = async (req, res) =>{
    const id = req.params.id;
    const user = await User.findById(id);
    if(!user) return res.status(500).json("User Not Found .");

    try{
        const post = new Post({
            title: req.body.title,
            desc: req.body.desc,
            username: user.username,
            category: req.body.category,
            photo: req.body.photo
        })
        const newpost = await post.save();
        return res.status(200).json(newpost);
    }
    catch(err)
    {
        return res.status(500).json(err);
    }
}

exports.deletePost = async (req, res) =>{
    try
    {
        const postId = await Post.findById(req.params.id);
        if(!postId) return res.status(404).json("Post not Found");
        
        await Post.findByIdAndDelete(req.params.id);
        return res.status(200).json("Post Deleted");
    }
    catch(err)
    {
        return res.status(500).json(err);
    }
}

exports.updatePost = async (req,res) =>{
    // find the post forst :
    const postId = req.params.id;
    try
    {
        const post = await Post.findById(postId);
        if(!post) return res.status(404).json("Post Not Found.");

        if(post.username === req.body.username)
        {
            try
            {
                const newPost = await Post.findByIdAndUpdate(postId, req.body, {new: true});
                return res.status(200).json(newPost);
            }
            catch(err)
            {
                return res.status(500).json(err);
            }
        }
        else
        {
            return res.status(401).json("You Can Update Only Your Post")
        }
    }
    catch(err)
    {
        return res.status(500).json(err);
    }
}

exports.getPost = async (req, res) =>{
    const postId = req.params.id;
    if(!postId) return res.status(404).json("Post Not Found.");
    try
    {
        const post = await Post.findById(postId);
        return res.status(200).json(post);
    }
    catch(err)
    {
        return res.status(500).json(err);
    }
}

exports.getAllPosts = async(req, res) =>{
    const username = req.query.username;
    const catName = req.query.catName;
    let posts;
    try
    {
        if(username)
        {
            posts = await Post.find({username})
        }
        else if(catName)
        {
            posts = await Post.find({category: catName});
        }
        else
        {
            posts = await Post.find();
        }
        return res.status(200).json(posts);
    }
    catch(err)
    {
        return res.status(500).json(err);
    }
}
