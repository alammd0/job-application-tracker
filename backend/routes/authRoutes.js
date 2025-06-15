const express = require("express");
const {signup, login, getuser, } = require("../controllers/authControllers");
const { middleware } = require("../middleware/middleware")

const router = express.Router();

// create auth route
router.post("/signup", signup);
router.post("/login", login);
router.get("/get-user", middleware, getuser)

module.exports = router;