const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "User's name required!"],
        },
        email: {
            type: String,
            unique: true,
            required: [true, "User's email address required!"],
            lowercase: true,
            validate: [isEmail, "Please enter a valid email address!"],
        },
        // todo: check if errors are being sent properly in catch block
        password: {
            type: String,
            required: [true, "User's password required!"],
            minlength: [8, "Minimum length of password is 8 characters!"],
        },
        phone: {
            type: String,
        },
        location: {
            type: String,
        },
        role: {
            type: String,
            required: [true, "User's role required!"],
        },
        googleId: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

// pre method used to do something pre or before the action (here 'save')
userSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt); // this - refers to the instance of the 'new User' we created
    next();
});

// static method to login user
userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const passwordsMatch = await bcrypt.compare(password, user.password);
        if (passwordsMatch) {
            return user;
        }
        return 401;
    }
    return 404;
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
