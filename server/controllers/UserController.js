const tryCatch = require("../../Helpers/tryCatch")

exports.signup = async (request, reply) => {

    await tryCatch(reply, async function () {

        const user = await request.prisma.user.upsert({
            where: {
                email: 'test@gmail.com',
            },
            update: {},
            create: {
                email: 'test@gmail.com',
                name: 'Test User'
            },
        })

        const token = request.app.jwt.sign({
            id: user.id,
            username: user.username,
            email: user.email
        })

        console.log('Token Signed ##################### ', token)

        reply
            .setCookie('_token', token, {
                path: '/'
            })
            .send({ token: token })

    })

}

exports.getUser = async (request, reply) => {
    const token = request.app.jwt.sign({
        id: '13',
        username: 'Ullash',
        email: 'ullash@gmail.com'
    })

    reply
        .setCookie('_token', token, {
            path: '/'
        })
        .send({ user: request?.user || 'Fastify - No authentication' })
}

exports.protected = async (request, reply) => {
    reply.send({ status: 'This is a protected route' })
}
