
exports.getSeachData = async (req, reply) => {

    try {
        const discussions = await req.prisma.discussion.findMany({
            where: {
                OR: [
                    {
                        title: {
                            contains: req.query.q,
                            mode: 'insensitive',
                        }
                    },
                    {
                        content: {
                            contains: req.query.q,
                            mode: 'insensitive',
                        }
                    }
                ]
            },
            take: 10
        })

        const users = await req.prisma.user.findMany({
            where: {
                OR: [
                    {
                        username: {
                            contains: req.query.q,
                            mode: 'insensitive',
                        }
                    },
                    {
                        name: {
                            contains: req.query.q,
                            mode: 'insensitive',
                        }
                    },
                    {
                        name: {
                            contains: req.query.q,
                            mode: 'insensitive',
                        }
                    }
                ]
            },
            take: 10
        })

        // console.log('Seatch Resulsts ############################### ', {discussions, users})
        reply.send({ discussions, users })

    } catch (error) {

        console.log('Search Error ################### ', error.message)
    }

}