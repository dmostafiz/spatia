const prismaPlugin = require('./app/plugins/prisma')

const app = require('fastify')({
    logger: true
})

app.register(require('@fastify/cors'), {
    origin: '*'
})

app.register(prismaPlugin)

// app.decorateRequest('user', 'Getter');

const PORT = process.env.PORT || 3000
const HOST = '0.0.0.0'

app.register(require('fastify-nextjs'), {
    dev: process.env.NODE_ENV !== 'production',
    noServeAssets: true,
    hostname: HOST,
    port: PORT
}).after(() => {
    app.next('/*')
})


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
        app.log.error(err)
        process.exit(1)
    }
}

start()