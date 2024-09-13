const express = require("express");
const router = express.Router();
const { logIn, logOut, signUp } = require("../controller/auth.controller");

router.post("/signUp", signUp);
router.post("/login", logIn);
router.get("/logout", logOut);

module.exports = router;
