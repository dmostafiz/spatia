const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: 'webexe',
    api_key: '986459928668525',
    api_secret: '1-cghRnRjkjLs6ZvYABLUODjf3c',
});

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
                email: body.email,
                isNew: false
            }
        })

        console.log('Updated User ', user)

        reply.send({status: 'success', user})
        
    } catch (error) {
        console.log('TryCatch Error ##################### ', error.message)
        reply.send({status: 'error'})
    }
}

exports.uploadProfilePhoto = async (request, reply) => {

    try {

        const data = await request.saveRequestFiles()

        console.log('request.body() ', data[0].filepath)

        const upload = await cloudinary.uploader.upload(data[0].filepath,{
            upload_preset:'spacom',
            // folder:folder,
        })

        console.log('Upload ', upload)
        // const body = request.body

        const user = await request.prisma.user.update({
            where: {
                id: request.user.id,
            },

            data: {
                avatar: upload.url
            }
        })

        console.log('Updated User ', user)

        reply.send({status: 'success', user})
        
    } catch (error) {
        console.log('TryCatch Error ##################### ', error.message)
        reply.send({status: 'error'})
    }
}

exports.uploadDiscussionPhoto = async (request, reply) => {

    try {

        const data = await request.saveRequestFiles()

        console.log('request.body() ', data[0].filepath)

        const upload = await cloudinary.uploader.upload(data[0].filepath,{
            upload_preset:'spacom',
            // folder:folder,
        })

        console.log('Upload ', upload)
        // const body = request.body

        // const user = await request.prisma.user.update({
        //     where: {
        //         id: request.user.id,
        //     },

        //     data: {
        //         avatar: upload.url
        //     }
        // })

        console.log('Updated User ',)

        reply.send({status: 'success', url: upload.url})
        
    } catch (error) {
        console.log('TryCatch Error ##################### ', error.message)
        reply.send({status: 'error'})
    }
}