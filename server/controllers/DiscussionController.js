const tryCatch = require("../../Helpers/tryCatch")

exports.storeDiscussion = async (req, reply) => {

    try {

        const body = req.body

        const discussion = await req.prisma.discussion.create({

            data: {
                title: body.title,
                content: body.content,

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


        console.log('Discussion created ##################### ', discussion)
        reply.send({ status: 'success', body: discussion })

        // })

    } catch (error) {
        // return error
        console.log('TryCatch Error: ###################### ', error.message)
        reply.send({ status: 'error', msg: error.message })
    }



}

exports.getOneDiscussion = async (req, reply) => {

    try {

        // console.log('Discussion ID: ################################## ', discussionId)

        const discussion = await req.prisma.discussion.findFirst({

            where: {
                
                id: req.params.discussionId
            }

        })

        console.log('Discussion: ################################## ', discussion)

        reply.send(discussion)

    } catch (error) {

        console.log('Discussion Error: ################################## ', error.message)
        reply.send({status: 'error', msg: error.message})
    }


}