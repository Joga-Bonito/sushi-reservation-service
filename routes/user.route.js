const router = require("express").Router();
const { UserController } = require("../controllers");

router.post("/register", UserController.create);

router.post("/login", UserController.read);

router.post("/update", UserController.update);

router.post("/getUserData", UserController.getUserData);

router.get("/auth", UserController.auth);

module.exports = router;
