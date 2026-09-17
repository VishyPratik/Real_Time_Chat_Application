const express = require("express");
const router = express.Router();
const {auth}=require("../middleware/auth")
const { signUp, Login, Logout }=require("../Controller/userController")
router.post("/signup", signUp);
router.post("/login", Login);
router.get("/logout", auth, Logout);


module.exports = router;