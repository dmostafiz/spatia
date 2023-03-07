const AWS = require('aws-sdk');
const fs = require('fs');
const fileType = require('file-type');

AWS.config.update({
    // accessKeyId: "AKIAW7OWVSOQTG45HKDA",
    // secretAccessKey: "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",
    secretAccessKey: 'vHnaYxrFNFTAJZQtXINrEi8aWmKvWfnytp1ntapw',
    accessKeyId: 'AKIAQT2UU5ZDEZHVS7FE',
});

const s3 = new AWS.S3();

const uploadFile = async (buffer, name, type) => {
    const params = {
        // ACL: 'public-read',
        Body: buffer,
        Bucket: 'metanote',
        ContentType: type.mime,
        Key: `${name}.${type.ext}`,
    };

    return s3.upload(params).promise();
};


const deleteFile = async (name) => {
    const params = {
        Bucket: 'metanote',
        Key: name,
    };

    console.log("file deleted Successfully")
    return await s3.deleteObject(params).promise()


};

exports.uploadFiles = async (req, reply) => {

    try {

        const dataFiles = await req.saveRequestFiles()

        const uploadInstanceMapping = dataFiles.map(async file => {

            const buffer = fs.readFileSync(file.filepath);

            const type = await fileType.fromBuffer(buffer);

            // const type = file.mimetype
            const fileName = `community/${Date.now().toString()}`;

            const data = await uploadFile(buffer, fileName, type);

            // var myarr =  data.Key.split('/')

            // console.log('Uploading file: ', file)
            console.log('Uploaded file: ', data)

            return { url: data.Location, name: file.filename, key: data.Key }

        })


        const uploadedUrlArray = await Promise.all(uploadInstanceMapping)

        console.log('Request Files ', uploadedUrlArray)

        reply.send({ status: 'success', files: uploadedUrlArray })


    } catch (error) {
        console.log('Try Catch Error ', error)
    }
}

exports.deleteFiles = async (req, reply) => {

    try {

        console.log('Delete file url: ', req.body.file_url)

        const dlt = await deleteFile(req.body.file_url)

        console.log('Deleted file: ', dlt)

        reply.send({ status: 'success' })


    } catch (error) {
        console.log('Try Catch Error ', error)
        reply.send({ status: 'error', msg: error.message })
    }
}

