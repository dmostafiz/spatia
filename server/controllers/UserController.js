exports.signup = async (request, reply) => {

    try {

        // const user = await request.prisma.user.upsert({
        //     where: {
        //         email: 'test@gmail.com',
        //     },
        //     update: {},
        //     create: {
        //         email: 'test@gmail.com',
        //         name: 'Test User'
        //     },
        // })

        const user = await request.prisma.user.findFirst({
            where: {
                email: 'test@gmail.com',
            }
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

exports.getMembers = async (request, reply) => {

    try {

        const query = request.query.q

        // const whereQuer = query != null ? { name: query } : {}

        const users = await request.prisma.user.findMany({
            where: {
                name: {
                    contains: query,
                    mode: 'insensitive'
                }
            }
        })

        // console.log('Member searched ########### ', users)
        reply.send({ users })


    } catch (error) {

        console.log('Search Error ########### ', error.message)

    }


}
