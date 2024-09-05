const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");


exports.updateUser = async (req,res) =>{
    const id = req.params.id;
    const user = await User.findById(id);
    
    if(!user) return res.status(400).json("User Not found.");

    if(req.body.password)
    {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    // {username, email, newPass};
    try
    {
        const updatedUser = await User.findByIdAndUpdate(id, req.body, {new: true});

        return res.status(200).json(updatedUser);
    }
    catch(err)
    {
        return res.status(500).json(err);
    }
}

exports.deleteUser = async (req, res) =>{
    try
    {
        const id = req.params.id;
        const user = await User.findById(id);
        if(!user) return res.status(404).json("User Not Found.");

        // delete all posts associated with the user:
        await User.deleteMany({username : user.username})        
        await User.findByIdAndDelete(id);
        return res.status(200).json("User Deleted Successfully.");
    }
    catch(err)
    {
        return res.status(500).json(err);
    }
}

exports.getUser = async (req, res) =>{
    try
    {
        const id = req.params.id;
        const user = await User.findById(id);
        if(!user) return res.status(404).json("User Not Found.");
        
        return res.status(200).json(user);
    }
    catch(err)
    {
        return res.status(500).json(err);
    }
}