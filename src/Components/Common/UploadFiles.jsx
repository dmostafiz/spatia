import { Box, Button } from '@chakra-ui/react'
import axios from 'axios'
import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

export default function UploadFiles({setFiles}) {

    const onDrop = useCallback(async acceptedFiles => {
        // Do something with the files
        console.log('acceptedFiles ', acceptedFiles)

        const {data} = await axios.post('/upload_files', { files: acceptedFiles }, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

        if(data.status == 'success'){
            setFiles(data.files)
        }

    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        maxFiles:3,
        acceptedFiles: "application/pdf,.doc,.docx,.xls,.xlsx,.csv,.tsv,.ppt,.pptx,.pages,.odt,.rtf",
        onDrop: onDrop,
    })


    return (
        <Box as={Button} {...getRootProps()} rounded={'none'}>
            <input {...getInputProps()} />
            Upload files
        </Box>
    )
}
