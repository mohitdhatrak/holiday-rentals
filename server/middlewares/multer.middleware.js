const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images");
    },
    filename: (req, file, cb) => {
        // const format = file.mimetype.split("/")[1];
        // is this a good way to name the file? or use any other way
        // cb(null, `files/admin-${file.fieldname}-${Date.now()}.${format}`);
        cb(null, `${Date.now()}${path.extname(file.originalname)}`);
    },
});

// const fileFilter = (req, file, cb) => {
//     const format = file.mimetype.split("/")[1];

//     if (
//         format === "png" ||
//         format === "jpg" ||
//         format === "jpeg"
//         // format === "svg"
//     ) {
//         cb(null, true);
//     } else {
//         cb(new Error("Image format not supported!"), false);
//     }
// };

// const upload = multer({ storage, fileFilter });
const upload = multer({ storage: storage });

module.exports = { upload };
