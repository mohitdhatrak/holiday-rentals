const { verifyJwtToken } = require("../utils/verifyJwtToken");

function requireAuth(req, res, next) {
    const token = req.cookies.jwtToken;
    // doubt - is this method correct to get the token, works fine
    //  or do we need to send the token in req.headers.authorization, if yes why?
    // console.log(req.headers);

    if (token && verifyJwtToken(token)) {
        next();
    } else {
        res.status(401).json({ message: "Token invalid" });
    }
}

module.exports = { requireAuth };
