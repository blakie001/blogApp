const mongoose = require("mongoose");

const postSchema = mongoose.Schema ({
    title: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: false,
    },
    username: {
        type: String,
        required: true,
    },
    category: {
        type: Array,
        required: false,
    }

}, {timestamps: true}
);

module.exports = mongoose.model("Post", postSchema);