const whitelist = ["https://holiday-rentals.netlify.app"];

function resHeaders(req, res, next) {
    res.header("Access-Control-Allow-Credentials", true);
    // use whitelist array later
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
    res.header(
        "Access-Control-Allow-Headers",
        "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
    );
    next();
}

module.exports = { resHeaders };
