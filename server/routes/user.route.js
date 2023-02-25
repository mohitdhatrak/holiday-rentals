const express = require("express");
const router = express.Router();

const {
    signup,
    login,
    logout,
    getUser,
} = require("../controllers/user.controller");
const { requireAuth } = require("../middlewares/auth.middleware");

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);
router.get("/", requireAuth, getUser);

module.exports = router;
