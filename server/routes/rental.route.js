const express = require("express");
const router = express.Router();

const {
    allListings,
    uploadListing,
} = require("../controllers/rental.controller");
const { requireAuth } = require("../middlewares/auth.middleware");
const { upload } = require("../middlewares/multer.middleware");

router.get("/viewListing", allListings);
router.post(
    "/uploadListing",
    [requireAuth, upload.single("image")],
    uploadListing
);

module.exports = router;
