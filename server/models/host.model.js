const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hostRentalSchema = new Schema(
    {
        // todo: check if errors are being sent properly in catch block
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
        // pictures: {
        //     type: String,
        // },
        rules: {
            type: String,
            required: [true, "House/hotel rules required!"],
        },
        location: {
            type: String,
            required: [true, "House/hotel location required!"],
        },
        howToGetThere: {
            type: String,
        },
        // should availability type be a Date?
        availability: {
            type: String,
            required: [true, "House/hotel availability details required!"],
        },
        // number of guests or number of rooms etc
        accomodation: {
            type: String,
        },
        ratings: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const HostRental = mongoose.model("HostRental", hostRentalSchema);

module.exports = { HostRental };
