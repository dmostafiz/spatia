const prismaPlugin = require('./plugins/prisma')

const bootstrap = (app) => {
    
    app.register(require('@fastify/cors'), {
        // put your options here
    })

    app.register(prismaPlugin)


    app.addHook('onRequest', (req, reply, done) => {

        req.prisma = app.prisma

        done()
    })

    app.addHook('onClose', async (server) => {
        server.log.info('disconnecting Prisma from DB')
        await server.prisma.$disconnect()
    })


    app.register(require('@fastify/jwt'), {
        secret: 'supersecret'
    })

    app.addHook('onRequest', (req, reply, done) => {
        // console.log('Request #########################: ', req.ip)
        req.app = app

        done()
    })

    app.decorate('auth', async (req, reply) => {

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
            return reply.send({ status: 'error', msg: 'Authentication failed' })
        }
        // console.log('Authentication################################### :', verify)
    })


}

module.exports = bootstrap