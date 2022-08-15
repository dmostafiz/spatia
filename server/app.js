// const { PrismaClient } = require('@prisma/client')
const prismaPlugin = require('./app/plugins/prisma')
const socketioServer = require('fastify-socket.io')
// const http = require('http');
const { Server } = require('socket.io')

const app = require('fastify')({
    logger: false,
    pluginTimeout: 20000,
})



app.register(require('@fastify/cors'), {
    origin: '*'
})

// app.register(require('@fastify/websocket'))

const PORT = process.env.PORT || 3000
const HOST = '0.0.0.0'

app.register(require('fastify-nextjs'), {

    dev: process.env.NODE_ENV !== 'production',
    noServeAssets: false,
    hostname: HOST,
    port: PORT

}).after(() => {
    app.next('/*')
})

app.register(prismaPlugin)


app.register(require('@fastify/cookie'), {
    secret: process.env.APP_SECRET, // for cookies signature
    parseOptions: {}     // options for parsing cookies
})

require('./app/bootstrap')(app)

app.register(require('@fastify/websocket'))

app.register(require('./web/router'), { prefix: 'api' })



app.register(socketioServer)

app.ready(err => {

    if (err) throw err


    let users = []

    const addUser = (user, socketId) => {
        !users.some(usr => usr.id == user?.id) && users.push({ id: user?.id, socketId })
    }

    const removeUser = (socketId) => {
        users = users.filter(user => user?.socketId != socketId)
    }


    app.io.on('connection', (socket) => {

        console.info('Socket connected!', socket?.id)

        //Socket codes here


        socket.on('addUser', (data) => {

            addUser(data?.user, socket?.id)

            socket.emit('userAdded', users)

            console.log('userLoggedIn called', users)
        })


        socket.on('disconnect', () => {

            removeUser(socket?.id)
            console.info('Socket disconnected! from #disconnect#')

        })

    })


})


const start = async () => {
    try {

        app.listen({ port: PORT, host: HOST })

    } catch (err) {
        console.log('App Error #################', err.message)
        process.exit(1)
    }
}

start()