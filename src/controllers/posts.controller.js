const User = require("../models/User");
const Post = require("../models/Post");

//CREATE POST 
const post = async (req, res) => {
   //Post(req.body) porque hay muchos valroes opcionales, y no se sabe cual se ha introducido en el req.body
   const newPost = new Post(req.body);
   try {
      const savedPost = await newPost.save();
      res.status(200).json(savedPost);
   } catch (e) {
      res.status(500).json(e);
   }
}

//UPDATE POST
const update = async (req, res) => {
   try {
      const post = await Post.findById(req.params.id);
      if (post.username === req.body.username) {
         try {
            const updatedPost = await Post.findByIdAndUpdate(
               req.params.id,
               { $set: req.body, },
               { useFindAndModify: false, new: true }
            );
            res.status(200).json(updatedPost);
         } catch (e) {
            res.status(500).json(e);
         }
      } else {
         res.status(401).json("You cant edit this post");
      }
   } catch (e) {
      res.status(500).json("Invalid credentials");
   }
}

//DELETE POST
const remove = async (req, res) => {
   try {
      const post = await Post.findById(req.params.id);
      if (post.username === req.body.username) {
         try {
            await post.delete();
            res.status(200).json("Post deleted");
         } catch (e) {
            res.status(500).json(e);
         }
      } else {
         res.status(401).json("You cant delete this post");
      }
   } catch (e) {
      res.status(500).json(e);
   }
}


//GET POST
const get = async (req, res) => {
   try {
      const post = await Post.findById(req.params.id)
      res.status(200).json(post)
   } catch (e) {
      res.json("Invalid post id")
   }
}

//GET ALL POSTS
const getAll = async (req, res) => {
   //Querys para filtrar por usuario o categoria en el caso de que sea necesario
   const username = req.query.user;
   const catName = req.query.cat;
   try {
      let posts;
      if (username) {
         posts = await Post.find({ username });
      } else if (catName) {
         //Encontra los posts, cuya catName está en categories
         posts = await Post.find({
            categories: {
               $in: [catName],
            },
         });
      } else {
         posts = await Post.find();
      }
      res.status(200).json(posts);
   } catch (err) {
      res.status(500).json(err);
   }
};

module.exports = { post, update, remove, get, getAll }