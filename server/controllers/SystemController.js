
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


        const discussionTags = await req.prisma.discussion.findMany({
            where: {
                OR: [
                    // {
                    //     tags: {
                    //         some: {
                    //             name: req.query.q
                    //         }
                    //     }

                    // },

                    {
                        tags: {
                            some: {
                                name: {
                                    contains: req.query.q,
                                    mode: 'insensitive',
                                }
                            }
                        }

                    },
                    {
                        subCategory: {
                            is: {
                                name: {
                                    contains: req.query.q,
                                    mode: 'insensitive',
                                }
                            }
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
                    }
                ]
            },
            take: 10
        })

        console.log('Seatch Resulsts ############################### ', discussionTags)
        reply.send({ discussions, users, discussionTags })

    } catch (error) {

        console.log('Search Error ################### ', error.message)
    }

}