const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../modules/users/user.model')

const protect = asyncHandler(async (req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
       
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1]

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            req.user = await User.findById(decoded.id).select('-password')
            return next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error("Not authorized");
        }
    }

    res.status(401)
    throw new Error("Not authorized ,no token");

})

module.exports = { protect }