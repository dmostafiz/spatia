const app = require('fastify')({
    logger: true
})

// app.decorateRequest('user', 'Getter');

app.register(require('fastify-nextjs'), {
    dev: process.env.NODE_ENV !== 'production',
    noServeAssets: true

}).after(() => {
    app.next('/*')
})

require('./web/bootstrap')(app)

app.register(require('./web/router'), { prefix: 'api' })

const PORT = process.env.PORT || 3000

const start = async () => {
    try {

        await app.listen({ port: PORT, host: '0.0.0.0' })

    } catch (err) {
        app.log.error(err)
        process.exit(1)
    }
}

start()