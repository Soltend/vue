const sendSuccess = (res, code, message, result) => {
    return res.status(code).send({
        message: message,
        result
    })
}

module.exports = sendSuccess;