const jwt = require('jsonwebtoken')
require('dotenv').config()

const verifyToken = (req, res, next) => {
    // We'll send the token in a custom header called 'x-auth-token'
    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(401).json({ message: 'No token provided, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        console.log(`Decoded user is ${req.user}`);

        next();
    }
    catch (err) {
        return res.status(401).json({ message: 'Token is not valid' });
    }
}

module.exports = verifyToken;