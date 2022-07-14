exports.signup = async (request, reply) => {

    try {

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


    } catch (error) {

        console.log('TryCatch Error ##################### ', error.message)

    }

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
