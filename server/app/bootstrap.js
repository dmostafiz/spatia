const bootstrap = async (app) => {

    app.register(require('@fastify/jwt'), {
        secret: process.env.APP_SECRET
    })


    app.addHook('onRequest', async (req, reply) => {
        // console.log('Request #########################: ', req.ip)
        req.app = app
    })

    app.decorate('auth', async (req, reply) => {

        // console.log('____Token ### ', req.headers)
        try {
            await req.jwtVerify(function (err, decoded) {
                // console.log('Auth Response %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%: ', err || decoded)
                if (err) {
                    // console.log('Auth Error######### ', err)
                    return reply.send({ status: 'error', msg: 'Authentication failed!' })
                } else {
                    // console.log('*******Auth Success********* ', decoded)
                }
            })

        } catch (error) {
            // console.log('*******Auth try catch error********* ', error.message)
            // return reply.send({ status: 'error', msg: 'Authentication failed' })
        }
        // console.log('Authentication################################### :', verify)
    })


    // This decoration will verify the 1 minute sso (JWT TOKEN) coming from spatail.sg 
    // and the token is valid it will push the user information to the global request
    // and  we can get the user object from any request component

    // You must have to use this decoration (authSso) as a onRequest middleware on the rout you want to verify the token

    app.decorate('authSso', async (req, reply) => {

        try {
            await req.jwtVerify(function (err, decoded) {

                if (err) {
                    // console.log('Auth Error######### ', err)
                    return reply.send({ status: 'error', msg: 'Authentication failed!' })
                } else {
                    // console.log('*******Auth Success********* ', decoded)
                }
            })

        } catch (error) {
            // console.log('*******Auth try catch error********* ', error.message)
        }
    })


}

module.exports = bootstrap