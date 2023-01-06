const express = require("express");
const router = express.Router();

router.route("/profile").get((req, res) => {
    res.json({
        message: "User profile, this line can be seen only after auth",
    });
});

module.exports = router;
