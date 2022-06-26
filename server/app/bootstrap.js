const bootstrap = (app) => {

    app.register(require('@fastify/jwt'), {
        secret: 'supersecret'
    })

    app.addHook('onRequest', async (req, reply) => {
        // console.log('Request #########################: ', req.ip)
        req.app = app
    })

    app.decorate('auth', async (req, reply) => {

        await req.jwtVerify(function (err, decoded) {
            // console.log('Auth Response %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%: ', err || decoded)
            if(err){
                console.log('Auth Error######### ', err)
            }else{
                console.log('*******Auth Success*********')
            }
        })
        // console.log('Authentication################################### :', verify)
    })


}

module.exports = bootstrap