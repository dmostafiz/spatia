
exports.storeDiscussion = async (req, reply) => {


    try {

        const body = req.body

        const connectSubCategory = body.subCategoryId ? {
            subCategory: {
                connect: { id: body.subCategoryId || null }
            }
        } : undefined

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
                },

                ...connectSubCategory
            },

            include: {
                author: true,
                category: true,
                subCategory: true,
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
        console.log('Discussion sorting ################################# ', req.query.sortBy)

        const orderBy = req.query.sortBy == 'Newest'
            ? {
                id: 'desc'
            }

            : req.query.sortBy == 'Newest'
                ? {
                    id: 'asc'
                }

                : req.query.sortBy == 'Most Viewed'
                    ? {
                        views: 'desc'
                    }

                    : req.query.sortBy == 'Most Replied'
                        ? {
                            replies: {

                                _count: 'desc'
                            }
                        }

                        : undefined


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
            orderBy: orderBy,
            include: {
                category: true,
                subCategory: true,
                author: true,
                tags: true,
                replies: {
                    // orderBy: { crearedAt: 'desc' },
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

exports.getFollowingDiscussions = async (req, reply) => {

    try {

        console.log('Category Discussions query string ################################# ', req.query.cursor)
        console.log('Discussion sorting ################################# ', req.query.sortBy)

        const orderBy = req.query.sortBy == 'Newest'
            ? {
                id: 'desc'
            }

            : req.query.sortBy == 'Newest'
                ? {
                    id: 'asc'
                }

                : req.query.sortBy == 'Most Viewed'
                    ? {
                        views: 'desc'
                    }

                    : req.query.sortBy == 'Most Replied'
                        ? {
                            replies: {

                                _count: 'desc'
                            }
                        }

                        : undefined



        const limit = 5
        const cursor = typeof req.query.cursor === 'undefined' ? 0 : parseInt(req.query.cursor)

        const discussions = await req.prisma.discussion.findMany({
            where: {
                followingUsersIds: {
                    has: req.user.id
                },
                isPrivate: false
            },
            skip: cursor,
            take: limit,
            // cursor: cursorObj,
            orderBy: orderBy,
            include: {
                category: true,
                subCategory: true,
                author: true,
                tags: true,
                replies: {
                    // orderBy: { crearedAt: 'desc' },
                    include: { author: true }
                }
            }
        })


        // const nextCursor = discussions.length == limit? discussions[limit - 1].id : null

        console.log('Following Discussions end ################################# ', discussions)
        // console.log('Discussion Cursor last ################################# ',nextCursor)

        return reply.send(discussions)

    } catch (error) {
        console.log('Category Discussions Error ################################# ', error.message)
        return reply.send({ status: 'error', msg: error.message })
    }
}

exports.getsubCategoryDiscussions = async (req, reply) => {

    try {

        console.log('Category Discussions query string ################################# ', req.query.cursor)
        console.log('Discussion sorting ################################# ', req.query.sortBy)

        const orderBy = req.query.sortBy == 'Newest'
            ? {
                id: 'desc'
            }

            : req.query.sortBy == 'Newest'
                ? {
                    id: 'asc'
                }

                : req.query.sortBy == 'Most Viewed'
                    ? {
                        views: 'desc'
                    }

                    : req.query.sortBy == 'Most Replied'
                        ? {
                            replies: {

                                _count: 'desc'
                            }
                        }

                        : undefined


        const whereQuery = req.params.categorySlug == 'all'

            ? {}

            : {
                subCategory: {
                    id: req.params.id
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
            orderBy: orderBy,
            include: {
                category: true,
                subCategory: true,
                author: true,
                tags: true,
                replies: {
                    // orderBy: { crearedAt: 'desc' },
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


exports.getTagDiscussions = async (req, reply) => {

    try {

        console.log('Tag Discussions query string ################################# ', req.query.cursor)
        console.log('Discussion sorting ################################# ', req.query.sortBy)

        const orderBy = req.query.sortBy == 'Newest'
            ? {
                id: 'desc'
            }

            : req.query.sortBy == 'Newest'
                ? {
                    id: 'asc'
                }

                : req.query.sortBy == 'Most Viewed'
                    ? {
                        views: 'desc'
                    }

                    : req.query.sortBy == 'Most Replied'
                        ? {
                            replies: {

                                _count: 'desc'
                            }
                        }

                        : undefined


        const whereQuery = req.params.categorySlug == 'all'

            ? {}

            : {
                tags: {
                    some: {
                        name: req.params.name
                    }
                }
            }


        const limit = 5
        const cursor = typeof req.query.cursor === 'undefined' ? 0 : parseInt(req.query.cursor)

        const discussions = await req.prisma.discussion.findMany({
            where: {
                tags: {
                    some: {
                        name: {
                            contains: req.params.name,
                            mode: 'insensitive'
                        }
                    }
                },
                isPrivate: false
            },
            skip: cursor,
            take: limit,
            // cursor: cursorObj,
            orderBy: orderBy,
            include: {
                category: true,
                subCategory: true,
                author: true,
                tags: true,
                replies: {
                    // orderBy: { crearedAt: 'desc' },
                    include: { author: true }
                }
            }
        })


        // const nextCursor = discussions.length == limit? discussions[limit - 1].id : null

        console.log('tag Discussions end ################################# ', discussions)
        // console.log('Discussion Cursor last ################################# ',nextCursor)

        return reply.send(discussions)

    } catch (error) {
        console.log('tag Discussions Error ################################# ', error.message)
        return reply.send({ status: 'error', msg: error.message })

    }
}

exports.getUserPosts = async (req, reply) => {

    try {

        console.log('User discussions ############################### ', req.params.userId)
        console.log('Category Discussions query string ################################# ', req.query.cursor)
        console.log('Discussion sorting ################################# ', req.query.sortBy)

        const orderBy = req.query.sortBy == 'Newest'
            ? {
                id: 'desc'
            }

            : req.query.sortBy == 'Newest'
                ? {
                    id: 'asc'
                }

                : req.query.sortBy == 'Most Viewed'
                    ? {
                        views: 'desc'
                    }

                    : req.query.sortBy == 'Most Replied'
                        ? {
                            replies: {

                                _count: 'desc'
                            }
                        }

                        : undefined


        const limit = 5
        const cursor = typeof req.query.cursor === 'undefined' ? 0 : parseInt(req.query.cursor)

        const discussions = await req.prisma.discussion.findMany({
            where: {
                authorId: req.params.userId,
                isPrivate: false
            },
            skip: cursor,
            take: limit,
            // cursor: cursorObj,
            orderBy: orderBy,
            include: {
                category: true,
                subCategory: true,
                author: true,
                tags: true,
                replies: {
                    // orderBy: { crearedAt: 'desc' },
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


exports.getUserDiscussions = async (req, reply) => {

    try {

        console.log('User discussions ############################### ', req.params.userId)
        console.log('Category Discussions query string ################################# ', req.query.cursor)
        console.log('Discussion sorting ################################# ', req.query.sortBy)

        const orderBy = req.query.sortBy == 'Newest'
            ? {
                id: 'desc'
            }

            : req.query.sortBy == 'Newest'
                ? {
                    id: 'asc'
                }

                : req.query.sortBy == 'Most Viewed'
                    ? {
                        views: 'desc'
                    }

                    : req.query.sortBy == 'Most Replied'
                        ? {
                            replies: {

                                _count: 'desc'
                            }
                        }

                        : undefined


        const limit = 5
        const cursor = typeof req.query.cursor === 'undefined' ? 0 : parseInt(req.query.cursor)

        const discussions = await req.prisma.discussion.findMany({
            where: {
                // authorId: req.params.userId,
                isPrivate: false,
                replies: {
                    some: {
                        authorId: req.params.userId

                    }
                }
            },
            skip: cursor,
            take: limit,
            // cursor: cursorObj,
            orderBy: orderBy,

            include: {
                category: true,
                subCategory: true,
                author: true,
                tags: true,
                replies: {
                    // orderBy: { crearedAt: 'desc' },
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

exports.getUserMentions = async (req, reply) => {

    try {

        console.log('User discussions ############################### ', req.params.userId)
        console.log('Category Discussions query string ################################# ', req.query.cursor)
        console.log('Discussion sorting ################################# ', req.query.sortBy)

        const orderBy = req.query.sortBy == 'Newest'
            ? {
                id: 'desc'
            }

            : req.query.sortBy == 'Newest'
                ? {
                    id: 'asc'
                }

                : req.query.sortBy == 'Most Viewed'
                    ? {
                        views: 'desc'
                    }

                    : req.query.sortBy == 'Most Replied'
                        ? {
                            replies: {

                                _count: 'desc'
                            }
                        }

                        : undefined


        const limit = 5
        const cursor = typeof req.query.cursor === 'undefined' ? 0 : parseInt(req.query.cursor)

        const discussions = await req.prisma.discussion.findMany({
            where: {
                // authorId: req.params.userId,
                isPrivate: false,

                replies: {
                    some: {
                        mentions: {
                            some: {
                                userId: req.params.userId
                            }
                        }

                    }
                }
            },
            skip: cursor,
            take: limit,
            // cursor: cursorObj,
            orderBy: orderBy,

            include: {
                category: true,
                subCategory: true,
                author: true,
                tags: true,

                replies: {
                    // orderBy: { crearedAt: 'desc' },
                    include: { author: true }
                }
            }
        })


        // const nextCursor = discussions.length == limit? discussions[limit - 1].id : null

        console.log('Mentioned Discussions ################################# ', discussions)
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

        // console.log('Category Discussions query string ################################# ', req.query.cursor)

        const orderBy = req.query.sortBy == 'Newest'
            ? {
                id: 'desc'
            }

            : req.query.sortBy == 'Newest'
                ? {
                    id: 'asc'
                }

                : req.query.sortBy == 'Most Viewed'
                    ? {
                        views: 'desc'
                    }

                    : req.query.sortBy == 'Most Replied'
                        ? {
                            replies: {

                                _count: 'desc'
                            }
                        }

                        : undefined

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
            orderBy: orderBy,
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
                subCategory: true,
                author: {
                    include: {
                        followers: true,
                        haters: true
                    }
                },
                tags: true,
                replies: {
                    take: 3,
                    orderBy: { id: 'desc' },
                    include: { author: true },
                    distinct: ['authorId']
                }
            }

        })

        const replyCount = await req.prisma.reply.count({

            where: {
                discussionId: req.params.discussionId
            },

        })

        if (discussion.isPrivate == true && (!discussion.privateMemberIds.includes(req.user.id) && discussion.authorId != req.user.id)) {
            return reply.send({ status: 'error', msg: 'you are not authorized to view this discussion!' })
        }

        console.log('Reply Count: ################################## ', replyCount)

        discussion.replyCount = replyCount

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
                parentId: body.parentId,

                mentions: body.mentions.map(mention => {
                    return { userId: mention }
                })
            },

            include: {
                author: true,
                parent: true,
                childs: true
            }
        })

        body.mentions.forEach(async (mention) => {
            await req.prisma.notification.create({
                data: {
                    userId: mention,
                    text: `mentioned you in a discussion reply.`,
                    link: `/discussion/${comment.discussionId}`,
                    senderName: req.user.name
                }
            })
        })


        const discussion = await req.prisma.discussion.findFirst({
            where: {
                id: comment.discussionId
            }
        })

        if (req.user.id != discussion.authorId) {
            await req.prisma.notification.create({
                data: {
                    userId: discussion.authorId,
                    text: `replied on your discussion.`,
                    link: `/discussion/${comment.discussionId}`,
                    senderName: req.user.name
                }
            })
        }

        const updateUserPoint = await req.prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                points: {
                    increment: 1
                }
            }
        })

        if (updateUserPoint) {
            await req.prisma.notification.create({
                data: {
                    userId: user.id,
                    text: `You have received 1 point for replying to a discussion.`,
                    link: `/discussion/${comment.discussionId}`,
                }
            })
        }

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
        console.log('Point Increased: ', updateUserPoint.points)

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


        const discussion = await req.prisma.discussion.findFirst({
            where: {
                id: body.discussionId
            }
        })



        if (req.user.id != discussion.authorId) {

            const updateUserPoint = await req.prisma.user.update({
                where: {
                    id: discussion.authorId
                },
                data: {
                    points: {
                        increment: 1
                    }
                }
            })

            console.log('Reaction point update ################## ', updateUserPoint.points)
        }



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

// Follow or ignore any discussion
exports.discussionAction = async (req, reply) => {
    try {


        console.log('Request Body ################ ', req.body)

        let action = {}

        if (req.body.action == 'Follow') {
            action = {
                followingUsers: {
                    connect: {
                        id: req.user.id
                    }
                },

                ignoringUsers: {
                    disconnect: {
                        id: req.user.id
                    }
                }
            }

        }

        else if (req.body.action == 'Ignore') {
            action = {
                followingUsers: {
                    disconnect: {
                        id: req.user.id
                    }
                },

                ignoringUsers: {
                    connect: {
                        id: req.user.id
                    }
                }
            }
        }

        else if (req.body.action == 'Unfollow') {
            action = {
                followingUsers: {
                    disconnect: {
                        id: req.user.id
                    }
                }
            }
        }

        else if (req.body.action == 'Ignored') {
            action = {
                ignoringUsers: {
                    disconnect: {
                        id: req.user.id
                    }
                }
            }
        }


        const discussion = await req.prisma.discussion.update({
            where: {
                id: req.body.discussionId
            },

            data: {
                ...action
            }
        })


        if (req.body.action == 'Follow') {

            const notification = await req.prisma.notification.create({
                data: {
                    userId: discussion.authorId,
                    text: 'started following your discussion.',
                    link: `/discussion/${discussion.id}`,
                    senderName: req.user.name
                }
            })
        }

        console.log('Action Discussion #####################3 ', discussion)

        return reply.send(discussion)

    } catch (error) {
        console.log('Bio Error ################## ', error.message)
    }
}

exports.setBestAnswer = async (req, reply) => {

    const body = req.body

    console.log(body)

    const discussion = await req.prisma.discussion.findFirst({
        where: {
            id: body.discussionId
        }
    })

    if (req.user.id != discussion.authorId) {
        console.log('You are not authenticated to do this action.')
        return reply.send({ status: 'error', msg: 'You are not authenticated to do this action.' })
    }

    const replies = await req.prisma.reply.findMany({
        where: {
            discussionId: discussion.id
        }
    })

    replies.forEach(async reply => {

        await req.prisma.reply.update({
            where: {
                id: reply.id
            },

            data: {
                bestAnswer: false
            }
        })

    })


    const rp = await req.prisma.reply.update({

        where: {
            id: body.replyId
        },

        data: {
            bestAnswer: true
        }

    })


    const user = await req.prisma.user.update({
        where: {
            id: rp.authorId
        },

        data: {
            points: {
                increment: 10
            }
        }
    })

    if (user) {
        await req.prisma.notification.create({
            data: {
                userId: user.id,
                text: `You have received 10 points for best answer badge in a discussion.`,
                link: `/discussion/${body.discussionId}`,
            }
        })
    }


    console.log('discussion replies point', user)


    return reply.send({ status: 'success', msg: 'The reply set as a best answer.' })


}


