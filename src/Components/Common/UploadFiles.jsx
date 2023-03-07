import { Box, Button } from '@chakra-ui/react'
import axios from 'axios'
import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'

export default function UploadFiles({ setFiles }) {

    const [loading, setLoading] = useState(false)
    const onDrop = useCallback(async acceptedFiles => {
        // Do something with the files



        // console.log('acceptedFiles', acceptedFiles)

        var uploadAbleFiles = []

        acceptedFiles.forEach(file => {

            if (file.type == "image/png" || file.type == "image/jpg" || file.type == "image/jpeg" || file.type == "image/gif" || file.type == "image/webp" || file.type == "image/bmp"|| file.type == "image/svg" || file.type == "image/x-icon" || file.type == "image/ico") {
                return alert("Image files is not allowed!")
            } else {
                uploadAbleFiles.push(file)
            }
        })

        console.log('acceptedFiles ', acceptedFiles)

        if (uploadAbleFiles.length > 0) {
            setLoading(true)

            const { data } = await axios.post('/upload_files', { files: uploadAbleFiles }, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            if (data.status == 'success') {
                setFiles(data.files)
            }

        }


        setLoading(false)

    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        maxFiles: 20,
        acceptedFiles: "application/pdf,.doc,.docx,.xls,.xlsx,.csv,.tsv,.ppt,.pptx,.pages,.odt,.rtf",
        onDrop: onDrop,
    })


    return (
        <Box as={Button} isLoading={loading} loadingText={'Uploading...'} {...getRootProps()} rounded={'none'}>
            <input {...getInputProps()} />
            Upload files
        </Box>
    )
}
