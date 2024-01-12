const { secretWord } = require('../jwtSecret.js');
const jwt = require('../lib/jwt.js')

async function authMiddleWare(req, res, next) {

    const token = req.cookies["auth"];
    if (token) {
        try {
            const decodedToken = await jwt.verify(token, secretWord);
            req.user = decodedToken;
        }
        catch (err) {
            res.clearCookie("auth");
            res.redirect('/login')
        }
    }
    next();
}

module.exports = {authMiddleWare};