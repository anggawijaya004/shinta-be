const jwt = require('jsonwebtoken')
const SALT = process.env.SALTPASSWORD

function generateToken(payload) {
    return jwt.sign(payload, SALT)
}

function verifyedToken(token) {
    return jwt.verify(token, SALT)
}

module.exports = { generateToken, verifyedToken }