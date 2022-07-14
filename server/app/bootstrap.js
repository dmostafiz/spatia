const prismaPlugin = require('./plugins/prisma')
const { PrismaClient } = require('@prisma/client')

const bootstrap = async (app) => {

    // app.register(prismaPlugin)

    app.register(require('@fastify/jwt'), {
        secret: 'supersecret'
    })


    // Mongo DB Connecttion Prisma
    const prisma = new PrismaClient({
        log: ['error', 'warn'],
    })

    try {

        await prisma.$connect()
        console.log('Mongo DB and prisma connected')

        app.decorate('prisma', prisma)

        app.addHook('onRequest', (req, reply, done) => {
            req.prisma = prisma
    
            done()
        })
    
        app.addHook('onClose', async (server) => {
            server.log.info('disconnecting Prisma from DB')
            await server.prisma.$disconnect()
        })
        
    } catch (error) {
        
        console.log('MongoDB Error ################## ', error.message)

    }



    // Mongo DB Connecttion Prisma


    app.addHook('onRequest', async (req, reply) => {
        // console.log('Request #########################: ', req.ip)
        req.app = app
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