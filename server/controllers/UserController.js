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
                email: 'test1@gmail.com',
            }
        })

        const token = request.app.jwt.sign({
            id: user.id,
            username: user.username,
            email: user.email,
            name: user.name
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

exports.getUserInfo = async (request, reply) => {

    try {

        const userWhere = request.params?.id ? { id: request.params.id } : {}

        console.log('USer ID: ################ ', userWhere)

        const user = await request.prisma.user.findFirst({
            where: {
                ...userWhere
            },

            include: {

                posts: true
            }
        })

        const discussions = await request.prisma.discussion.findMany({
            where: {
                replies: {
                    some: {
                        authorId: request.params.id
                    }
                }
            }
        })


        const privateDiscussions = await request.prisma.discussion.findMany({
            where: {
                isPrivate: true,
                OR: [
                    {
                        authorId:  request.params.id
                    },
                    {
                        privateMemberIds: { has: request.params.id }
                    }
                    // { email: { endsWith: 'gmail.com' } },
                ],
            },

        })



        user.discussions = discussions
        user.privateDiscussions = privateDiscussions

        reply.send(user)

    } catch (error) {

        console.log('User getting error ############## ', error.message)
        reply.send({ status: 'error', msg: error.message })

    }
}

exports.authorize = async (request, reply) => {

    const user = request.user

    console.log('Authorised User: ################## ', user)

    reply.send(user)
}

exports.getSearchedMembers = async (request, reply) => {

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

exports.getAllMembers = async (request, reply) => {

    try {

        const users = await request.prisma.user.findMany()

        // console.log('Member searched ########### ', users)
        reply.send({ users })


    } catch (error) {

        console.log('Search Error ########### ', error.message)

    }


}
