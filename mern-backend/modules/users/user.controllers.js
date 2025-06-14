const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('./user.model')

// @desc Register user
// @route POST /users
const registerUser = asyncHandler(async (req, res) => {

    const { name, email, password } = req.body

    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please add all field')
    }

    // check if User exist
    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedpassword = await bcrypt.hash(password, salt)

    // Create User
    const user = await User.create({
        name, email, password: hashedpassword
    })

    if (user) {
        res.status(201).json({ _id: user.id, name: user.name, email: user.email, token: generateToken(user._id) })
    }
    else {
        res.status(400)
        throw new Error('Invalid user data')
    }

})

// @desc Authenticate user
// @route POST /users/login
const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body

    // Check for user email
    const user = await User.findOne({ email })

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({ _id: user.id, name: user.name, email: user.email, token: generateToken(user._id) })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }

    

    res.json({ message: 'Register User' })
})

// @desc Get user data
// @route GET /users/me
const getMe = asyncHandler(async (req, res) => {
    const { _id, name, email } = await User.findById(req.user.id)

    res.status(200).json({ id: _id, name, email })
})

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = { registerUser, loginUser, getMe }