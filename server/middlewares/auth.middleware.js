const { verifyJwtToken } = require("../utils/verifyJwtToken");

function requireAuth(req, res, next) {
    const token = req.cookies.jwtToken;

    if (token && verifyJwtToken(token)) {
        next();
    } else {
        res.status(401).json({ message: "Token invalid / expired" });
    }
}

module.exports = { requireAuth };
