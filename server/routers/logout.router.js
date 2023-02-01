const express = require("express");
const router = express.Router();

router.route("/").get(async (req, res) => {
    res.cookie("jwtToken", "", {
        // maxAge: process.env.COOKIE_EXPIRES_IN,
        httpOnly: true,
        // adding samesite and secure to ensure cookies work in https
        sameSite: "none",
        secure: true,
    });

    res.cookie("userId", "", {
        // maxAge: process.env.COOKIE_EXPIRES_IN,
        httpOnly: true,
        // adding samesite and secure to ensure cookies work in https
        sameSite: "none",
        secure: true,
    });

    res.status(200).json({
        message: "User logged out successfully",
    });
});

module.exports = router;
