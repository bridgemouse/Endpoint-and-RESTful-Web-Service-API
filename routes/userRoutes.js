const router = require("express").Router(),
    usersController = require("../controllers/usersController");

router.get( '/', usersController.index, usersController.indexView);
router.post( '/', usersController.saveUser );

router.get( '/:id/edit', usersController.edit );
router.put( '/:id/update', usersController.update, usersController.redirectView );
router.get( '/:id', usersController.show, usersController.showView );
router.delete( '/:id/delete', usersController.delete, usersController.redirectView );

module.exports = router;