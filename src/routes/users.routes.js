const router = require("express").Router();
const usersCtr = require("../controllers/users.controller")

//UPDATE USER
router.put("/:id", usersCtr.update)

//DELETE USER
router.delete("/:id", usersCtr.remove);

//GET USER
router.get("/:id", usersCtr.get);

module.exports = router;