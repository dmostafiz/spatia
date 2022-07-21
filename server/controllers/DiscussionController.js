
exports.storeDiscussion = async (req, reply) => {

    try {

        const body = req.body

        const discussion = await req.prisma.discussion.create({

            data: {
                title: body.title,
                content: body.content,

                tags: body.tags.map(tag => {
                    return { name: tag }
                }),

                author: {
                    connect: { id: req.user.id }
                },

                category: {
                    connect: { id: body.categoryId }
                }
            },

            include: {
                author: true,
                category: true
            }

        })


        // console.log('Discussion created ##################### ', discussion)
        reply.send({ status: 'success', body: discussion })

        // })

    } catch (error) {
        // return error
        console.log('TryCatch Error: ###################### ', error.message)
        reply.send({ status: 'error', msg: error.message })
    }

}

// Store private discussion
exports.storePrivateDiscussion = async (req, reply) => {

    try {

        const body = req.body

        // console.log(body.members)
        // return reply.send({status: 'success', discussion: body})

        const discussion = await req.prisma.discussion.create({

            data: {
                title: body.title,
                content: body.content,

                tags: body.tags.map(tag => {
                    return { name: tag }
                }),

                author: {
                    connect: { id: req.user.id }
                },

                isPrivate: true,

                privateMembers: {
                    connect: body.users.map(member => {
                        return {
                            id: member.id
                        }
                    })
                }
            },

            include: {
                author: true,
                privateMembers: true
            }

        })


        // console.log('Discussion created ##################### ', discussion)
        reply.send({ status: 'success', body: discussion })

        // })

    } catch (error) {
        // return error
        console.log('TryCatch Error: ###################### ', error.message)
        reply.send({ status: 'error', msg: error.message })
    }

}

//Get all discussions by category ID
exports.getCategoryDiscussions = async (req, reply) => {

    try {

        console.log('Category Discussions query string ################################# ', req.query.cursor)


        const whereQuery = req.params.categorySlug == 'all'

            ? {}

            : {
                category: {
                    slug: req.params.categorySlug
                }
            }


        const limit = 5
        const cursor = typeof req.query.cursor === 'undefined' ? 0 : parseInt(req.query.cursor)

        const discussions = await req.prisma.discussion.findMany({
            where: {
                ...whereQuery,
                isPrivate: false
            },
            skip: cursor,
            take: limit,
            // cursor: cursorObj,
            orderBy: { id: 'desc' },
            include: {
                category: true,
                author: true,
                tags: true,
                replies: {
                    include: { author: true }
                }
            }
        })


        // const nextCursor = discussions.length == limit? discussions[limit - 1].id : null

        // console.log('Category Discussions end ################################# ', discussions)
        // console.log('Discussion Cursor last ################################# ',nextCursor)

        return reply.send(discussions)

    } catch (error) {
        console.log('Category Discussions Error ################################# ', error.message)
        return reply.send({ status: 'error', msg: error.message })

    }
}

//Get All private discussions
exports.getPrivateDiscussions = async (req, reply) => {

    try {

        console.log('Category Discussions query string ################################# ', req.query.cursor)



        const limit = 5
        const cursor = typeof req.query.cursor === 'undefined' ? 0 : parseInt(req.query.cursor)

        const discussions = await req.prisma.discussion.findMany({

            where: {
                isPrivate: true,
                OR: [
                    {
                        authorId: req.user?.id || null
                    },
                    {
                        privateMemberIds: { has: req.user?.id || null }
                    }
                    // { email: { endsWith: 'gmail.com' } },
                ],
            },
            skip: cursor,
            take: limit,
            // cursor: cursorObj,
            orderBy: { id: 'desc' },
            include: {
                category: true,
                author: true,
                tags: true,
                replies: {
                    include: { author: true }
                }
            }
        })


        // const nextCursor = discussions.length == limit? discussions[limit - 1].id : null

        // console.log('Category Discussions end ################################# ', discussions)
        // console.log('Discussion Cursor last ################################# ',nextCursor)

        return reply.send(discussions)

    } catch (error) {
        console.log('Category Discussions Error ################################# ', error.message)
        return reply.send({ status: 'error', msg: error.message })

    }
}

//Get a single discussion details
exports.getOneDiscussion = async (req, reply) => {

    try {

        // console.log('Discussion ID: ################################## ', discussionId)

        const discussion = await req.prisma.discussion.findFirst({

            where: {
                id: req.params.discussionId
            },

            include: {
                category: true,
                author: true,
                tags: true,
                replies: {
                    take: 3,
                    orderBy: { id: 'desc' },
                    include: { author: true },
                    distinct: ['authorId']
                }
            }

        })

        if (discussion.isPrivate == true && (!discussion.privateMemberIds.includes(req.user.id) && discussion.authorId != req.user.id)) {
            return reply.send({ status: 'error', msg: 'you are not authorized to view this discussion!' })
        }

        // console.log('Discussion: ################################## ', discussion)

        reply.send(discussion)

    } catch (error) {

        console.log('Discussion Error: ################################## ', error.message)
        reply.send({ status: 'error', msg: error.message })
    }

}

//Increase discussion views 
exports.increasDiscussionViews = async (req, reply) => {

    try {
        const discussion = await req.prisma.discussion.update({
            where: {
                id: req.params.id
            },

            data: {
                views: {
                    increment: 1
                }
            }
        })

        // console.log('Discussion views updated ############ ', discussion.views)

    } catch (error) {
        console.log('Discussion views error ############ ', error.message)
    }
}

//Store a reply for a discussion
exports.storeReply = async (req, reply) => {

    try {

        const user = req.user
        const body = req.body

        // console.log('Request User', body)
        const comment = await req.prisma.reply.create({
            data: {
                content: body.reply,
                discussionId: body.discussionId,
                authorId: user.id,
                parentId: body.parentId
                // parent: {
                //     connect:{id: body.parentId}
                // }
            },

            include: {
                author: true,
                parent: true,
                childs: true
            }

        })

        // const discussion = await req.prisma.discussion.findFirst({
        //     where:{
        //         id: body.discussionId
        //     },

        //     include: {
        //         replies: {
        //             include: {
        //                 author: true
        //             }
        //         }
        //     }
        // })

        // console.log('Reply Created: ', comment)
        // console.log('Reply updated: ', comment)

        return reply.send({ status: 'success', msg: 'Reply created successfully!' })

    } catch (error) {

        console.log('Reply Error #######: ', error.message)
        return reply.send({ status: 'error', msg: error.message })

    }



}

//Get replies of a discussion with infinite scroll pagination
exports.getDiscussionReplies = async (req, reply) => {
    try {

        // console.log('Category Discussions query string ################################# ', req.query.cursor)


        const limit = -5
        const cursor = typeof req.query.cursor === 'undefined' ? 0 : parseInt(req.query.cursor)

        const replies = await req.prisma.reply.findMany({
            where: {
                discussionId: req.params.discussionId
            },

            orderBy: { id: 'asc' },

            skip: cursor,
            take: limit,
            // cursor: cursorObj,

            include: {
                author: true,

                parent: {
                    include: {
                        author: true
                    }
                },

                childs: true,

                discussion: {
                    include: {
                        author: true
                    }
                }
            },

        })


        // const nextCursor = discussions.length == limit? discussions[limit - 1].id : null

        // console.log('Replies ################################# ', replies)
        // console.log('Discussion Cursor last ################################# ',nextCursor)

        return reply.send(replies)

    } catch (error) {
        console.log('Paginate replies Error ################################# ', error.message)
        return reply.send({ status: 'error', msg: error.message })

    }
}

//Store reaction emoji for discussions
exports.storeReaction = async (req, reply) => {

    if (!req.user) {

        console.log('No unauthenticated reaction ############################')
        return reply.send({ status: 'error', msg: 'You are not authenticated to react on any discussion!' })
    }

    try {

        const user = req.user
        const body = req.body


        const reaction = await req.prisma.reaction.upsert({
            where: {
                user_discussion: { userId: user.id, discussionId: body.discussionId },
            },
            update: {
                reaction: body.reaction,
            },

            create: {
                userId: user.id,
                discussionId: body.discussionId,
                reaction: body.reaction,
            }
        })


        // console.log('Reaction ################## ', reaction)

        return reply.send({ status: 'success', msg: 'Reaction updated successfully!' })

    } catch (error) {

        console.log('Reaction Error #######: ', error.message)
        return reply.send({ status: 'error', msg: error.message })

    }



}

//Store reaction emoji for replies
exports.storeReplyReaction = async (req, reply) => {

    if (!req.user) {

        console.log('No unauthenticated reaction ############################')
        return reply.send({ status: 'error', msg: 'You are not authenticated to react on any discussion!' })
    }

    try {

        const user = req.user
        const body = req.body


        const reaction = await req.prisma.replyreaction.upsert({
            where: {
                user_reply: { userId: user.id, replyId: body.replyId },
            },
            update: {
                reaction: body.reaction,
            },

            create: {
                userId: user.id,
                replyId: body.replyId,
                reaction: body.reaction,
            }
        })


        // console.log('Reaction ################## ', reaction)

        return reply.send({ status: 'success', msg: 'Reaction updated successfully!' })

    } catch (error) {

        console.log('Reaction Error #######: ', error.message)
        return reply.send({ status: 'error', msg: error.message })

    }



}

//Get discussion reactions
exports.getReaction = async (req, reply) => {

    try {

        const reactions = await req.prisma.reaction.findMany({
            where: {
                discussionId: req.params.discussionId
            },

            include: {

                user: true
            }
        })


        // const images = [
        //     { emoji: 'like', by: 'you' },
        //     { emoji: 'like', by: 'Mostafiz' },
        //     { emoji: 'love', by: 'Ullash' },
        //     { emoji: 'haha', by: 'Limon' },
        // ];

        const finalReactionData = reactions.map(reaction => {
            return { emoji: reaction.reaction, by: reaction.user.name }
        })


        // console.log('Reactions ################# ', finalReactionData)

        reply.send({ reactions: finalReactionData })

    } catch (error) {

        console.log('Reaction getting error ######################### '.error.message)
    }
}

//Get reply reactions
exports.getReplyReaction = async (req, reply) => {

    try {

        const reactions = await req.prisma.replyreaction.findMany({
            where: {
                replyId: req.params.replyId
            },

            include: {
                user: true
            }
        })


        // const images = [
        //     { emoji: 'like', by: 'you' },
        //     { emoji: 'like', by: 'Mostafiz' },
        //     { emoji: 'love', by: 'Ullash' },
        //     { emoji: 'haha', by: 'Limon' },
        // ];

        const finalReactionData = reactions.map(reaction => {
            return { emoji: reaction.reaction, by: reaction.user.name }
        })


        // console.log('Reactions ################# ', finalReactionData)

        reply.send({ reactions: finalReactionData })

    } catch (error) {

        console.log('Reaction getting error ######################### '.error.message)
    }
}



