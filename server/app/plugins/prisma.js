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


    done()

}

module.exports = prismaPlugin