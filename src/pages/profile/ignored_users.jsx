import { Avatar, Box, Button, Center, Flex, HStack, Link, Spacer, Stack, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import ProfileLayout from '../../Components/profile/ProfileLayout'
import NextLink from 'next/link'
import axios from 'axios'
import authUser from '../../Hooks/authUser'

export default function ignored_users() {

  const user = authUser()

  const [hatings, setHatings] = useState([])

  useEffect(() => {

    async function getUserInfo() {
      const res = await axios.get(`/user/${user.data.id}`)
      console.log('Users with hatings ', res.data)
      setHatings(res.data.hatings)
    }

    if (user.data?.id) {
      getUserInfo()
    }

  }, [user.data])

  return (
    <ProfileLayout>
      <Text fontSize='32px' as='h3'>Ignored Users</Text>

      <Box>
        <Stack direction={'column'} gap={3}>

          {hatings.length ? hatings.map((user, index) => {
            return <Box key={index} bg='#ede7e0' p={5}>
              <Flex justify='flex-start' gap={8}>
                <Avatar size='xl' src={user.avatar} name={user.name} />
                <Box pt={2}>
                  <NextLink href={`/user/${user.id}`}>
                    <Link href={`/user/${user.id}`}>
                      <Text fontWeight='bold' fontSize='20px'>{user.name}</Text>
                    </Link>
                  </NextLink>
                  <Text>{user.bio}</Text>
                  <Spacer h={1} />
                  <Button size='xs' bg='cyan.400' _hover={{ bg: 'cyan.500' }} rounded='0'>Remove from ignore list</Button>
                </Box>
              </Flex>
            </Box>

          })
         : <Center w='full' h={300}>
            <Text>No ignored users found</Text>
         </Center>
        }


        </Stack>
      </Box>
    </ProfileLayout>
  )
}
