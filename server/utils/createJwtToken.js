const jwt = require("jsonwebtoken");

function createJwtToken(userId) {
    return jwt.sign(
        {
            userId,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: `${process.env.TOKEN_EXPIRES_IN}ms`,
        }
    );
}

module.exports = { createJwtToken };
