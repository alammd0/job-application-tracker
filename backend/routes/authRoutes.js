const express = require("express");
const {signup, login, getuser, deleteUser, } = require("../controllers/authControllers");
const { middleware } = require("../middleware/middleware")

const router = express.Router();

// create auth route
router.post("/signup", signup);
router.post("/login", login);
router.get("/get-user", middleware, getuser)
router.delete("/delete-user", middleware, deleteUser)

module.exports = router;