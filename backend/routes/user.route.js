const express = require("express");
const router = express.Router();

const upload = require("../middlewares/multer");
const { register, login, updateProfile, logOut } = require("../controllers/user.controller.js");
const isAuthenticated = require("../middlewares/isAuthenticated.js");

router.post("/register", upload.single("profile"), register);
router.post("/login", login);
router.post("/logout", logOut);
router.post("/profile/update", isAuthenticated, isAuthenticated, upload.single("file") ,updateProfile);

module.exports = router;