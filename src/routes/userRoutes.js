const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/users",userController.storeUser);
router.get("/users",userController.index);
router.delete("/users/:id",userController.destroyUser);
router.get("/users/:id" ,userController.showUser);
router.put('/users/:id', userController.updateUser);
router.post("/login", userController.login);
router.post("/logout" ,userController.logout);

module.exports = router;
