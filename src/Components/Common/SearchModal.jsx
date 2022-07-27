import React from 'react'

export default function SearchModal() {
    return (
        <InputGroup mr={20}>
            <Input
                rounded='full'
                minW={300}
                pr={50} pl={25} py={6} bg='white'
                border='0px solid #7e8b9f'
                _focus={{ ring: 0, border: '0px soild', outline: 0 }}
                placeholder='Search the community'
                fontFamily={`'Assistant', sans-serif`}
            />
            <InputRightElement py={6} pr={3} >
                <FiSearch color='green.500' fontSize={20} />
            </InputRightElement>
        </InputGroup>
    )
}
