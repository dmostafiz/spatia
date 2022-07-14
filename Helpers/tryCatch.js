const tryCatch = async (reply, callback) => {

    try {

        console.log('TryCatch Callback #####################')
        return callback()

    } catch (error) {
        // return error
        console.log('TryCatch Error: ###################### ', error.message)
        reply.send({ status: 'error', msg: error.message })
    }
}

module.exports = tryCatch