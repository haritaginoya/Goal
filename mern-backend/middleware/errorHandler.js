const errorHandler = (err , req , res , next) => {

    const statusCode = res.statusCode ? res.statusCode : 500

    console.log(statusCode)
    res.status(statusCode)

    console.log(process.env.NODE_ENV)

    res.json({
        message : err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })

}

module.exports = {
    errorHandler
}