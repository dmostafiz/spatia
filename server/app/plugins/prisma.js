const { FastifyPluginAsync } = require('fastify')
const { PrismaClient } = require('@prisma/client')

const prismaPlugin = async (server, options, done) => {

    const prisma = new PrismaClient({
        log: ['error', 'warn'],
    })


    // Make Prisma Client available through the fastify server instance: server.prisma
    // server.decorate('prisma', prisma)

    server.addHook('onRequest', async (req, reply, done) => {

        await prisma.$connect()
        console.log('Mongo DB and prisma connected')

        req.prisma = prisma

        done()
    })

    server.addHook('onClose', async (server) => {
        server.log.info('disconnecting Prisma from DB')
        await prisma.$disconnect()
    })

    done()

}

module.exports = prismaPlugin