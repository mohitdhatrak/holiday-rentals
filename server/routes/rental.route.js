const express = require("express");
const rentalRouter = express.Router();

const {
    allListings,
    uploadListing,
} = require("../controllers/rental.controller");
const { requireAuth } = require("../middlewares/auth.middleware");
const { upload } = require("../middlewares/multer.middleware");

rentalRouter
    .route("/listing")
    .get(allListings)
    .post([requireAuth, upload.single("image")], uploadListing);

// requireAuth not needed above as we are checking auth already, this endpoint can be accessed in frontend by authenticated users (host or admin) only

module.exports = rentalRouter;
