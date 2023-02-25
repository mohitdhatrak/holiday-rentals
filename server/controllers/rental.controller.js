const { Rental } = require("../models/rental.model");

const allListings = async (req, res) => {
    try {
        const listings = await Rental.find({});
        res.status(200).json({
            listings: listings,
        });
    } catch (error) {
        console.log(error);
    }
};

const uploadListing = async (req, res) => {
    const rentalData = req.body;
    const image = req.file ? req.file.filename : null;
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
            const newRental = new Rental({
                ...rentalData,
                hostId,
                image,
            });
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
};

module.exports = {
    allListings,
    uploadListing,
};
