const jwt = require("jsonwebtoken");
const { User } = require("../models/user.model");

async function verifyJwtToken(token) {
    try {
        const decryptedPayload = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({
            _id: decryptedPayload.userId,
        });

        if (user) {
            return user;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
}

module.exports = { verifyJwtToken };
