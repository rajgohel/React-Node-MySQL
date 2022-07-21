const jwt = require('jsonwebtoken');

// Create and send token and save in Cookie
const sendToken = (user, statusCode, res) => {

    const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWET_EXPIRES_TIME });

    const options = {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000),
        httpOnly: true
    };
    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        token
    });
}
module.exports = sendToken;