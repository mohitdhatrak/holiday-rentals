const GoogleStrategy = require("passport-google-oauth20");
const { User } = require("../models/user.model");
require("dotenv").config();

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:5000/auth/google/callback",
            // passReqToCallback: true,
        },
        async (accessToken, refreshToken, profile, cb) => {
            try {
                const existingUser = await User.findOne({
                    googleId: profile.id,
                });

                if (!existingUser) {
                    const newUser = new User({
                        name: profile.name,
                        googleId: profile.id,
                    });
                    await newUser.save();

                    // res.status(200).json({
                    //     userId: newUser._id,
                    //     message: "Account created successfully!",
                    // });

                    await cb(null, newUser);
                } else {
                    res.status(400).json({
                        message: "This account is already registered!",
                    });
                }
            } catch (error) {
                console.log(error);
                res.status(400).json({
                    message: "There was some error while creating your account",
                    error,
                });
            }
        }
    )
);

passport.serializeUser((user, cb) => cb(null, user.id));

passport.deserializeUser((id, cb) => {
    try {
        User.findById(id, (err, user) => {
            cb(err, user);
        });
    } catch (err) {
        console.log(err);
    }
});
