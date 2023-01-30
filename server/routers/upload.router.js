const express = require("express");
const router = express.Router();

router.route("/").post(async (req, res) => {
    const { imageData } = req.body;

    try {
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: "There was some error",
            error,
        });
    }
});

module.exports = router;
