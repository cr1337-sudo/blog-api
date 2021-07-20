const router = require("express").Router()
const postsCtr = require("../controllers/posts.controller")

//CREATE POST
router.post("/:id", postsCtr.post)
//UPDATE POST
router.put("/:id", postsCtr.update)
//REMOVE POST
router.delete("/:id", postsCtr.remove)
//GET POST
router.get("/:id", postsCtr.get)
//GET ALL POSTS
router.get("/", postsCtr.getAll)

module.exports = router;