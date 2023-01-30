const express = require("express");
const router = express.Router();
require("dotenv").config();

const { User } = require("../models/user.model");
const { createJwtToken } = require("../utils/createJwtToken");

router.route("/").post(async (req, res) => {
    const { userData } = req.body;

    try {
        const existingUser = await User.findOne({
            email: userData.email,
        });

        if (!existingUser) {
            const newUser = new User(userData);
            await newUser.save();

            const jwtToken = createJwtToken(newUser._id);

            res.cookie("jwtToken", jwtToken, {
                maxAge: process.env.COOKIE_EXPIRES_IN,
                httpOnly: true,
                // adding samesite and secure to ensure cookies work in https
                sameSite: "none",
                secure: true,
            });

            res.status(200).json({
                userId: newUser._id,
                message: "Account created successfully!",
            });
        } else {
            res.status(400).json({
                message: "This email is already registered!",
            });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: "There was some error while creating your account",
            error,
        });
    }
});

module.exports = router;
