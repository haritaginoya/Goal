const express = require('express')
const router = express.Router()
const { getGoals, addGoals, updateGoal, deleteGoal } = require('./goal.controllers')
const { protect } = require('../../middleware/authmiddleware')

router.route('/').get(protect, getGoals).post(protect, addGoals)
router.route('/:id').put(protect,updateGoal).delete(protect,deleteGoal)

module.exports = router

