const express = require("express");
const { User } = require("../models/user.model");
const router = express.Router();

router.route("/").get(async (req, res) => {
    // const user = await User.findOne({
    //     _id: req.cookies.userId,
    // });

    res.status(200).json({
        // userId: user._id,
        message: "Set user",
    });
});

module.exports = router;
