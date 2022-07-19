// const { PrismaClient } = require('@prisma/client')
const prismaPlugin = require('./app/plugins/prisma')

const app = require('fastify')({
    logger: false, 
    pluginTimeout: 20000,
})

app.register(require('@fastify/cors'), {
    origin: '*'
})


// async function connectPrisma(){

//     const prisma = new PrismaClient()
    
//     await prisma.$connect()
    
//     console.log('Mongo DB and prisma connected')
//     // Make Prisma Client available through the fastify server instance: server.prisma
//     app.decorate('prisma', prisma)
    
//     app.addHook('onRequest', (req, reply, done) => {
//         req.prisma = prisma
    
//         done()
//     })
    
    
//     app.addHook('onClose', async (server) => {
//         server.log.info('disconnecting Prisma from DB ###############################')
//         await server.prisma.$disconnect()
//     })
// }

// connectPrisma()

// app.decorateRequest('user', 'Getter');

const PORT = process.env.PORT || 3000
const HOST = '0.0.0.0'

app.register(require('fastify-nextjs'), {
    dev: process.env.ENVIRONMENT !== 'production',
    noServeAssets: false,
    hostname: HOST,
    port: PORT

}).after(() => {
    app.next('/*')
})

app.register(prismaPlugin)


app.register(require('@fastify/cookie'), {
    secret: "4rgfdg234qwfr243rt34243rt344", // for cookies signature
    parseOptions: {}     // options for parsing cookies
})

require('./app/bootstrap')(app)

app.register(require('./web/router'), { prefix: 'api' })


const start = async () => {
    try {

        await app.listen({ port: PORT, host: HOST })

    } catch (err) {
        console.log('App Error #################', err.message)
        process.exit(1)
    }
}

start()