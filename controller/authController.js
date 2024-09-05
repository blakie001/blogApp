const { default: mongoose } = require("mongoose");
const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.registerUser = async (req, res) => {
    let existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
        return res.status(500).json("Email Alredy Registered");
    }
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass,
            // ProfilePic: req.body.ProfilePic,
        })
        const user = await newUser.save();
        return res.status(200).json(user);
    }
    catch (err) {
        console.error(err)
        return res.status(500).json(err);
    }
}

exports.loginUser = async (req, res) => {
    // if(!email || !password) return res.status(500).json("Please enter Details");

    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).json("User Not Found");

        const match = await bcrypt.compare(req.body.password, user.password)
        if (!match) return res.status(500).json("Invalid Credentials");

        return res.status(200).json(user);
    }
    catch (err) {
        console.error(err)
        return res.status(500).json(err);
    }
}