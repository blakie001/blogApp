const Category = require("../models/Category");

exports.postCategory = async (req, res) =>{
    const category = new Category(req.body);
    try
    {
        const savedCat = await category.save();
        return res.status(200).json(savedCat);
    }
    catch(err)
    {
        return res.status(500).json(err);
    }
}

exports.getCategory = async (req, res) =>{
    try
    {
        const cats = await Category.find();
        return res.status(200).json(cats);
    }
    catch(err)
    {
        return res.status(500).json(err);
    }
}
