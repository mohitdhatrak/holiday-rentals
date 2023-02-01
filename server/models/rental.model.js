const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rentalSchema = new Schema(
    {
        // todo: check if errors are being sent properly in catch block
        hostId: {
            // type: ObjectId,
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: [true, "House/hotel title required!"],
        },
        description: {
            type: String,
            required: [true, "House/hotel description required!"],
        },
        // price per night
        price: {
            type: String,
            required: [true, "House/hotel price required!"],
        },
        image: {
            type: String,
            required: [true, "House/hotel image required!"],
        },
        // should rules be an array?
        rules: {
            type: String,
            required: [true, "House/hotel rules required!"],
        },
        location: {
            type: String,
            required: [true, "House/hotel location required!"],
        },
        transport: {
            type: String,
            required: [true, "House/hotel modes of transport required!"],
        },
        // should these types be a Date or string?
        beginDate: {
            type: Date,
            required: [true, "House/hotel availability details required!"],
        },
        endDate: {
            type: Date,
            required: [true, "House/hotel availability details required!"],
        },
        // number of guests or number of rooms etc
        accomodation: {
            type: String,
        },
        ammenities: {
            type: String,
            required: [true, "House/hotel ammenities details required!"],
        },
        ratings: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const Rental = mongoose.model("Rental", rentalSchema);

module.exports = { Rental };
