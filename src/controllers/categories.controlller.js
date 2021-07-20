const Category = require("../models/Category");

const post = async (req, res) => {
   const newCat = new Category(req.body)
   try {
      const savedCat = await newCat.save();
      res.json(savedCat)
   } catch (e) {
      res.json("Error")
   }
};

const get = async (req, res) => {
   try {
      const cats = await Category.find();
      res.json(cats);
   } catch (e) {
      res.json("Error")
   }
}

module.exports = { post, get }