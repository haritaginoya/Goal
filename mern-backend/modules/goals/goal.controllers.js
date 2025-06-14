const asyncHandler = require('express-async-handler')
const Goal = require('./goal.model')
const User = require('../users/user.model')

// @desc Get goal
// @route /goals
const getGoals = asyncHandler(async (req, res) => {
    const data = await Goal.find({ user: req.user.id })
    res.status(200).json(data)
})

// @desc Add goal
// @route /goals
const addGoals = asyncHandler(async (req, res) => {
    try {

        console.log(req.body)

        const { text } = req.body;

        if (!text) {
            res.status(400)
            throw new Error('Please add a text field')
        }
        const goal = await Goal.create({ text, user: req.user.id })

        res.status(200).json(goal)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

// @desc Update goal
// @route /goals/:id
const updateGoal = asyncHandler(async (req, res) => {

    try {
        const goal = await Goal.findById(req.params.id)
        console.log(goal);

        if (!goal) {
            throw new Error('Goal not found')
        }

        const user = await User.findById(req.user.id)

        // Check for user
        if (!user) {
            res.status(401)
            throw new Error("User not found");
        }

        // Make sure the logged in user matches the goal user
        if (goal.user.toString() !== user.id) {
            res.status(401)
            throw new Error("User not authorized");

        }

        const updateData = await Goal.findByIdAndUpdate(req.params.id, { text: req.body.text }, { new: false })
        res.status(200).json(updateData)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }

})

// @desc Delete goal
// @route /goals/:id
const deleteGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)
    try {
        if (!goal) {
            throw new Error('Goal not found')
        }
        const user = await User.findById(req.user.id)

        // Check for user
        if (!user) {
            res.status(401)
            throw new Error("User not found");
        }

        // Make sure the logged in user matches the goal user
        if (goal.user.toString() !== user.id) {
            res.status(401)
            throw new Error("User not authorized");

        }

        await goal.deleteOne();
        res.status(200).json({ message: 'Goal deleted' });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

module.exports = { getGoals, addGoals, updateGoal, deleteGoal }