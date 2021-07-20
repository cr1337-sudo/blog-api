const bcrypt = require("bcrypt")
const User = require("../models/User")

//UPDATE USER
const update = async (req, res) => {
   if (req.body.userId == req.params.id) {
      if (req.body.password) req.body.password = await bcrypt.hashSync(req.body.password, 10)
      try {
         //new:true devuelve en el json enl archivo modificado, $set toma como valores a editar los que estàn dentro del req.body
         const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { useFindAndModify: false, new: true })
         res.json(updatedUser)
      } catch (e) {
         console.log("Entra al try")
         res.send("error")
      }
   } else {
      res.json({ e: "Invalid credentials" })
   }
}

//DELETE USER
const remove = async (req, res) => {
   if (req.body.userId === req.params.id) {
      try {
         const user = await User.findById(req.params.id);
         if (user) {
            try {
               await Post.deleteMany({ username: user.username });
               await User.findByIdAndDelete(req.params.id);
               res.status(200).json("User deleted");
            } catch (err) {
               await User.findByIdAndDelete(req.params.id);
               res.json("User deleted")
            }
         }
      } catch (err) {
         res.status(404).json("User not found");
      }
   } else {
      res.status(401).json("Error");
   }
}

//GET USER
const get = async (req, res) => {
   try {
      const user = await User.findById(req.params.id);
      const { password, ...others } = user._doc;
      res.status(200).json(others);
   } catch (err) {
      res.status(500).json("Uset not found");
   }
}

module.exports = { update, remove, get }