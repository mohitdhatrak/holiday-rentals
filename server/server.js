const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const { connectToMongoDB } = require("./db/db.connect");
const login = require("./routers/login.router");
const signup = require("./routers/signup.router");
const user = require("./routers/user.router");
const { requireAuth } = require("./middlewares/auth.middleware");
const { resHeaders } = require("./middlewares/resHeader.middleware");

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

app.use("/login", resHeaders, login);
app.use("/signup",resHeaders, signup);
// app.use(requireAuth); // all routes after this are protected, can be only accessed by authenticated users
app.use("/user", requireAuth, user);

app.listen(process.env.PORT, () => console.log("Listening on port 5000"));
