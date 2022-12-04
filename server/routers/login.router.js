const express = require("express");
const router = express.Router();
require("dotenv").config();

const { User } = require("../models/user.model");
const { createJwtToken } = require("../utils/createJwtToken");

router.route("/").post(async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password); // using the static method login we created in User model
        if (user === 401) {
            throw new Error("Password is incorrect!");
        } else if (user === 404) {
            throw new Error(
                "This email is not registered, user does not exist!"
            );
        } else {
            const jwtToken = createJwtToken(user._id);

            res.cookie("jwtToken", jwtToken, {
                maxAge: process.env.TOKEN_EXPIRES_IN,
                // httpOnly: true,
            });

            res.status(200).json({
                userId: user._id,
                message: "Logged in successfully!",
                jwtToken,
            });
        }
    } catch (error) {
        res.status(400).json({
            message:
                error.message || "There was some error while authentication",
        });
    }
});

module.exports = router;
