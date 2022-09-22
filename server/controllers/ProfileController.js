exports.updateProfile = async (request, reply) => {

    try {

        console.log('request.body() ', request.body)

        const body = request.body

        const user = await request.prisma.user.update({
            where: {
                id: request.user.id,
            },

            data: {
                username: body.userName,
                name: body.fullName, 
                email: body.email
            }
        })

        console.log('Updated User ', user)

        reply.send({status: 'success', user})
        
    } catch (error) {
        console.log('TryCatch Error ##################### ', error.message)
        reply.send({status: 'error'})
    }
}