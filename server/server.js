const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const { connectToMongoDB } = require("./db/db.connect");
const user = require("./routes/user.route");
const rental = require("./routes/rental.route");

const app = express();

app.use(express.json()); // can use this too instead of body-parser
app.use(express.urlencoded({ extended: true })); // support encoded bodies
app.use(cookieParser());

const whitelist = ["https://holiday-rentals.netlify.app"];

const corsOptions = {
    origin: whitelist,
    optionsSuccessStatus: 200,
    credentials: true,
};

if (process.env.NODE_ENV === "development") {
    app.use(cors({ origin: true, credentials: true }));
} else {
    app.use(cors(corsOptions));
}

connectToMongoDB();

app.use("/user", user);
app.use("/rental", rental);

app.listen(process.env.PORT, () =>
    console.log(`Listening on port ${process.env.PORT}`)
);
