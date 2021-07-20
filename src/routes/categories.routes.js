const router = require("express").Router();
const catCtr = require("../controllers/categories.controlller")

//CREATE CATEGORY
router.post("/", catCtr.post)
//GET CATEGORIES
router.get("/", catCtr.get)

module.exports = router;