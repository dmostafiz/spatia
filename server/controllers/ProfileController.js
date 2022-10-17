// const cloudinary = require("cloudinary").v2;

const cloudinary = require("../app/helpers/cloudinary")

// cloudinary.config({
//     cloud_name: 'webexe',
//     api_key: '986459928668525',
//     api_secret: '1-cghRnRjkjLs6ZvYABLUODjf3c',
// });

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

        const token = request.app.jwt.sign({
            id: user.id,
            username: user.username,
            email: user.email,
            name: user.name,
            avatar: user.avatar,
            isNew: false,
            role: user.role || 'user'
        })

        console.log('Profile update token  ', token)


        reply.send({ status: 'success',token: token, user })

    } catch (error) {
        console.log('TryCatch Error ##################### ', error.message)
        reply.send({ status: 'error' })
    }
}

exports.uploadProfilePhoto = async (request, reply) => {

    try {

        const data = await request.saveRequestFiles()

        console.log('request.body() ', data[0].filepath)

        const upload = await cloudinary.uploader.upload(data[0].filepath, {
            upload_preset: 'spacom',
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

        reply.send({ status: 'success', user })

    } catch (error) {
        console.log('TryCatch Error ##################### ', error.message)
        reply.send({ status: 'error' })
    }
}

exports.uploadDiscussionPhoto = async (request, reply) => {

    try {

        const data = await request.saveRequestFiles()

        console.log('request.body() ', data[0].filepath)

        const upload = await cloudinary.uploader.upload(data[0].filepath, {
            upload_preset: 'spacom',
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

        reply.send({ status: 'success', url: upload.url })

    } catch (error) {
        console.log('TryCatch Error ##################### ', error.message)
        reply.send({ status: 'error' })
    }
}

exports.updateSetting = async (request, reply) => {

    const body = request.body

    const user = await request.prisma.user.findFirst({
        where: {
            id: request.user.id
        }
    })

    const settingObject = body.setting == 'disablePrivateDiscussion'
        ? { disablePrivateDiscussion: !user.disablePrivateDiscussion }
        : body.setting == 'automaticallyFollowRepliedDiscussion'
            ? { automaticallyFollowRepliedDiscussion: !user.automaticallyFollowRepliedDiscussion }
            : {}

    const userSetting = await request.prisma.user.update({
        where: {
            id: request.user.id
        },

        data: settingObject
    })

    console.log('Setting body: ', userSetting)
    // console.log('Setting User: ', user)

    reply.send({ status: 'success', userSetting })

}

exports.updateNotification = async (request, reply) => {

    const body = request.body

    const user = await request.prisma.user.findFirst({
        where: {
            id: request.user.id
        }
    })

    const settingObject = body.type == 'webNotification'
        ? { webNotification: !user.disablePrivateDiscussion }
        : body.setting == 'emailNotification'
            ? { emailNotification: !user.automaticallyFollowRepliedDiscussion }
            : {}

    let notificationSetting = {} 

    if(body.type == 'web'){

        let existingWebNotification = user.webNotification

        if(existingWebNotification.includes(body.notification)){

            existingWebNotification = existingWebNotification.filter(not => not != body.notification)
        }else {
            existingWebNotification.push(body.notification)
        }

        notificationSetting = { webNotification: existingWebNotification }

    }else if(body.type == 'email'){

        let existingEmailNotification = user.emailNotification

        if(existingEmailNotification.includes(body.notification)){

            existingEmailNotification = existingEmailNotification.filter(not => not != body.notification)
        }else {
            existingEmailNotification.push(body.notification)
        }

        notificationSetting = {emailNotification: existingEmailNotification}
    }

    const userNotificationSetting = await request.prisma.user.update({
        where: {
            id: request.user.id
        },

        data: notificationSetting
    })

    console.log('Notification Setting Body: ', userNotificationSetting)
    // console.log('Setting User: ', user)

    reply.send({ status: 'success', user: userNotificationSetting })

}

