const router = require("express").Router(),
    usersController = require("../controllers/usersController");

router.get("/users", usersController.index, usersController.respondJSON);
router.use(usersController.errorJSON);
module.exports = router;