const bootstrap = async (app) => {


    app.register(require('@fastify/jwt'), {
        secret: 'supersecret'
    })


    app.addHook('onRequest', async (req, reply) => {
        // console.log('Request #########################: ', req.ip)
        req.app = app
    })

    app.decorate('auth', async (req, reply) => {

        console.log('____Token ### ', req.headers)
        try {
            await req.jwtVerify(function (err, decoded) {
                // console.log('Auth Response %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%: ', err || decoded)
                if (err) {
                    console.log('Auth Error######### ', err)
                    return reply.send({ status: 'error', msg: 'Authentication failed!' })
                } else {
                    console.log('*******Auth Success********* ', decoded)
                }
            })

        } catch (error) {
            console.log('*******Auth try catch error********* ', error.message)
            // return reply.send({ status: 'error', msg: 'Authentication failed' })
        }
        // console.log('Authentication################################### :', verify)
    })


}

module.exports = bootstrap