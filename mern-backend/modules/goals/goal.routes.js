const express = require('express')
const router = express.Router()
const {getGoals} = require('./goal.controllers')

router.route('/').get(getGoals)

module.exports = router

