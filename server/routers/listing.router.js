const express = require("express");
const { Rental } = require("../models/rental.model");
const router = express.Router();

router.route("/").get(async (req, res) => {
    try {
        const listings = await Rental.find({});
        res.status(200).json({
            listings: listings,
        });
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
