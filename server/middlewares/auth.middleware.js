const { verifyJwtToken } = require("../utils/verifyJwtToken");

function requireAuth(req, res, next) {
    const token = req.cookies.jwtToken;

    const user = token && verifyJwtToken(token);

    if (user) {
        req.user = user;
        next();
    } else {
        res.status(401).json({ message: "Token invalid" });
    }
}

module.exports = { requireAuth };
