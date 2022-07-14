const fp = require('fastify-plugin')
const { FastifyPluginAsync } = require('fastify')
const { PrismaClient } = require('@prisma/client')

const prismaPlugin = async (server, options, done) => {

    const prisma = new PrismaClient({
        log: ['error', 'warn'],
      })

    await prisma.$connect()
    console.log('Mongo DB and prisma connected')
    // Make Prisma Client available through the fastify server instance: server.prisma
    server.decorate('prisma', prisma)

    server.addHook('onRequest', async (req, reply) => {
        req.prisma = prisma
    })

    server.addHook('onClose', async (server) => {
        server.log.info('disconnecting Prisma from DB')
        await server.prisma.$disconnect()
    })


    done()

}

module.exports = prismaPlugin