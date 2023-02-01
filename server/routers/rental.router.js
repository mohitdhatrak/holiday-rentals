const express = require("express");
const { Rental } = require("../models/rental.model");
const { upload } = require("../middlewares/multer.middleware");
const router = express.Router();

router.route("/upload").post(upload.single("file"), async (req, res) => {
    const { rentalData } = req.body;
    // to make each hostID unique, we add the title to it,
    // getting an error of duplicate keys if same hostID
    // we can use .includes() method to check userID from hostID
    const hostId = `${req.cookies.userId}${rentalData.title
        .trim()
        .replaceAll(" ", "_")}`;

    try {
        const existingRental = await Rental.findOne({
            title: rentalData.title,
            hostId,
        });

        if (!existingRental) {
            const newRental = new Rental({ ...rentalData, hostId });
            await newRental.save();

            res.status(200).json({
                message: "Rental Listing created successfully!",
            });
        } else {
            res.status(400).json({
                message: "Rental with same title by same host exists!",
            });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: "There was some error",
            error,
        });
    }
});

module.exports = router;
