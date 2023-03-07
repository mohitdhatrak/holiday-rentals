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
        .toLowerCase()
        .replaceAll(" ", "_")}`;

    // adding other rules to the rules list in model
    // we can also make another field called customRules in model and add these there
    const otherRulesArray = rentalData.otherRules.split(",");
    for (let i = 0; i < otherRulesArray.length; i++) {
        otherRulesArray[i] = otherRulesArray[i].trim();
    }
    const otherRules = otherRulesArray.join(",");
    const finalRules = rentalData.rules + "," + otherRules;

    // adding other ammenities to the ammenities list in model
    const otherAmmenitiesArray = rentalData.otherAmmenities.split(",");
    for (let i = 0; i < otherAmmenitiesArray.length; i++) {
        otherAmmenitiesArray[i] = otherAmmenitiesArray[i].trim();
    }
    const otherAmmenities = otherAmmenitiesArray.join(",");
    const finalAmmenities = rentalData.rules + "," + otherAmmenities;

    try {
        const existingRental = await Rental.findOne({
            // title: rentalData.title, // hostId has title concatenated
            hostId,
        });

        if (!existingRental) {
            const newRental = new Rental({
                ...rentalData,
                hostId,
                image,
                rules: finalRules,
                ammenities: finalAmmenities,
            });
            await newRental.save();

            res.status(200).json({
                message: "Listing added successfully!",
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
