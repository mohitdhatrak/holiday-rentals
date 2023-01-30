const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "Images");
    },
    filename: (req, file, cb) => {
        const format = file.mimetype.split("/")[1];
        // is this a good way to name the file? or use any other way
        cb(null, `files/admin-${file.fieldname}-${Date.now()}.${format}`);
    },
});

const fileFilter = (req, file, cb) => {
    const format = file.mimetype.split("/")[1];

    if (
        format === "png" ||
        format === "jpg" ||
        format === "jpeg"
        // format === "svg"
    ) {
        cb(null, true);
    } else {
        cb(new Error("Image format not supported!"), false);
    }
};

const upload = multer({ storage, fileFilter });

module.exports = { upload };
