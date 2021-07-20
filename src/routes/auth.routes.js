const { Router } = require("express");
const router = Router()
const authCtr = require("../controllers/auth.controller")

//Register 
router.post("/register", authCtr.register)

//Login
router.post("/login", authCtr.login)

module.exports = router