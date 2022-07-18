const fp = require('fastify-plugin')
const { FastifyPluginAsync } = require('fastify')
const { PrismaClient } = require('@prisma/client')

const prismaPlugin = fp(async (server, options) => {

    try {
        const prisma = new PrismaClient()
    
        await prisma.$connect()
    
        console.log('Mongo DB and prisma connected')
        // Make Prisma Client available through the fastify server instance: server.prisma
        server.decorate('prisma', prisma)
    
        server.addHook('onRequest', (req, reply, done) => {
            req.prisma = prisma
    
            done()
        })
        
    } catch (error) {
        server.log.info('MongoDB connection error! ###################################', error.message)
        
    }

    server.addHook('onClose', async (server) => {
        server.log.info('disconnecting Prisma from DB ###############################')
        await server.prisma.$disconnect()
    })

})

module.exports = prismaPlugin