const asyncHandler = require('express-async-handler')


const getGoals = asyncHandler( async(req, res) => {

    res.send("Get request")
})


module.exports = { getGoals }