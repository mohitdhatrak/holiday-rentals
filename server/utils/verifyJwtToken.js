const jwt = require("jsonwebtoken");
require("dotenv").config();

function verifyJwtToken(token) {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return false;
    }
}

module.exports = { verifyJwtToken };
