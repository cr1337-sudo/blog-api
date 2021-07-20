const User = require("../models/User")
const bcrypt = require('bcrypt');

//REGISTER USER
const register = async (req, res) => {
   try {
      const { username, email, password } = req.body;
      const hashedPassword = await bcrypt.hashSync(password, 10);
      const newUser = new User({ username, email, password: hashedPassword })
      const savedUser = await newUser.save()
      res.json(savedUser)
   } catch (e) {
      res.status(500).json({ "e": e })
   }
}

//LOGIN USER
const login = async (req, res) => {
   try {
      const { username, password } = req.body;
      const user = await User.findOne({ username })
      const checkPassword = await bcrypt.compareSync(password, user.password)
      if (checkPassword) {
         const { password, ...other } = user._doc;
         res.json(other)
      }
      //If check  not true
      res.json({ "error": "Invalid credentials" })
   } catch (e) {
      res.json({ "Error": "Error" })
   }

}
module.exports = { register, login }