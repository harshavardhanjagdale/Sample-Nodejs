const express = require("express");
const router = express.Router();

const userController = require("../controller/userController");
const authController = require("../controller/auth");
router.use("/users", userController);
router.use("/auth", authController);

module.exports = router;
