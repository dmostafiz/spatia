exports.ssoAuthTest = async (request, reply) => {
    
    console.log('SSO User email', request.params.email)

    try {

        const user = await request.prisma.user.findFirst({
            where: {
                email: request.params.email,
            }
        })

        console.log('Redirector User ', user)

        const token = request.app.jwt.sign({
            id: user.id,
            username: user.username,
            email: user.email,
            name: user.name,
            avatar: user.avatar,
            isNew: user.isNew,
            role: user.role || 'user'
        })

        console.log('Token Signed ##################### ', token)

        reply
            .setCookie('_token', token, {
                domain: process.env.DOMAIN,
                path: '/'
            })
            .send({ status: 'success', token: token, isNew: user.isNew })


    } catch (error) {

        console.log('TryCatch Error ##################### ', error.message)
        reply.send({ status: 'error' })

    }

}

exports.ssoAuth = async (request, reply) => {

    try {

        // console.log('SSO User token', request.query.token)
        if (!request.user) {
            reply.send({ status: 'error', msg: 'Invalid Token' })
        }

        const userRole = request.user.role == 100
            ? 'user' : request.user.role == 99
                ? 'moderator' : request.user.role == 1
                    ? 'admin' : request.user.role == 0
                        ? 'admin' : 'user'

        const user = await request.prisma.user.upsert({
            where: {
                email: request.user.email,
            },

            update: {},

            create: {
                username: request.user.username,
                email: request.user.email,
                name: request.user.name,
                avatar: null,
                bio: null,
                role: userRole,
                isNew: true
            },
        })

        console.log('Redirector User ', user)

        const token = request.app.jwt.sign({
            id: user.id,
            username: user.username,
            email: user.email,
            name: user.name,
            avatar: user.avatar,
            isNew: user.isNew,
            role: user.role || 'user'
        })

        console.log('Token Signed ##################### ', token)

        reply
            .setCookie('_token', token, {
                domain: process.env.DOMAIN,
                path: '/'
            })
            .send({ status: 'success', token: token, isNew: user.isNew })


    } catch (error) {

        console.log('TryCatch Error ##################### ', error.message)
        reply.send({ status: 'error' })

    }

}



exports.exampleSignup = async (request, reply) => {

    try {

        // user@gmail.com - user
        // moderator@gmail.com - moderator
        // admin@gmail.com - admin
        
        const requestEmail = request.params.email || 'user@gmail.com'

        const user = await request.prisma.user.findFirst({
            where: {
                email: requestEmail,
            }
        })
         
        console.log('Find User: ', user)


        const token = request.app.jwt.sign({
            id: user.id,
            username: user.username,
            email: user.email,
            name: user.name,
            avatar: user.avatar,
            isNew: user.isNew,
            role: user.role
        })

        console.log('Token Signed ##################### ', token)

        reply
            .setCookie('_token', token, {
                domain: process.env.DOMAIN,
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

                posts: {
                    where: {
                        isPrivate: false
                    }
                },

                hatings: true
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
                        authorId: request.params.id
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

        const users = await request.prisma.user.findMany({
            select: {
                id: true,
                username: true,
            }
        })

        // console.log('Member searched ########### ', users)
        reply.send({ users })


    } catch (error) {

        console.log('Search Error ########### ', error.message)

    }


}

exports.getUnreadNotifications = async (req, reply) => {

    try {
        const notifications = await req.prisma.notification.findMany({
            where: {
                userId: req.user.id,
                status: false
            }
        })

        console.log('Unread Notifications ###################### ', notifications)

        return reply.send(notifications)

    } catch (error) {
        console.log('Notification error ###################### ', error.message)
        return reply.send({ status: 'error', msg: error.message })
    }
}


exports.makeNotificationUnread = async (req, reply) => {

    try {
        const notification = await req.prisma.notification.update({

            where: {
                id: req.body.notifyId,
            },

            data: {
                status: true
            }
        })

        console.log('Unread Notification Update ###################### ', notification)

        return reply.send({ status: 'success', msg: 'Notification updated as read' })

    } catch (error) {
        console.log('Notification error ###################### ', error.message)
        return reply.send({ status: 'error', msg: error.message })
    }
}

exports.saveBio = async (req, reply) => {

    try {

        const user = await req.prisma.user.update({
            where: {
                id: req.user.id
            },
            data: {
                bio: req.body.bio
            }
        })

        return reply.send({ status: 'success', msg: 'Bio updated successfully' })

    } catch (error) {
        console.log('Bio Error ################## ', error.message)
    }
}

exports.userAction = async (req, reply) => {

    try {


        console.log('Request Body ################ ', req.body)

        let action = {}

        if (req.body.action == 'Follow') {
            action = {
                followers: {
                    connect: {
                        id: req.user.id
                    }
                },

                haters: {
                    disconnect: {
                        id: req.user.id
                    }
                }
            }

        }

        else if (req.body.action == 'Ignore') {
            action = {
                followers: {
                    disconnect: {
                        id: req.user.id
                    }
                },

                haters: {
                    connect: {
                        id: req.user.id
                    }
                }
            }
        }

        else if (req.body.action == 'Unfollow') {
            action = {
                followers: {
                    disconnect: {
                        id: req.user.id
                    }
                }
            }
        }

        else if (req.body.action == 'Ignored') {
            action = {
                haters: {
                    disconnect: {
                        id: req.user.id
                    }
                }
            }
        }


        const user = await req.prisma.user.update({
            where: {
                id: req.body.userId
            },

            data: {
                ...action
            }
        })


        if (req.body.action == 'Follow') {

            const notification = await req.prisma.notification.create({
                data: {
                    userId: req.body.userId,
                    text: 'started following you.',
                    link: `/user/${req.user.id}`,
                    senderName: req.user.name
                }
            })
        }

        console.log('Action User #####################3 ', user)

        return reply.send(user)

    } catch (error) {
        console.log('user action Error ################## ', error.message)
    }
}

exports.removeFromIgnore = async (req, reply) => {

    try {

        const user = await req.prisma.user.update({
            where: {
                id: req.user.id
            },
            data: {
                hatings: {
                    disconnect: { id: req.body.userId },
                }
            }
        })

        return reply.send({ status: 'success', msg: 'The user removed from your ignore list.' })

    } catch (error) {
        console.log('Bio Error ################## ', error.message)
    }
}