import { Avatar, Box, Button, Center, Flex, HStack, Link, Spacer, Stack, Text, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import ProfileLayout from '../../Components/profile/ProfileLayout'
import NextLink from 'next/link'
import axios from 'axios'
import authUser from '../../Hooks/authUser'
import BigSpinner from '../../Components/Common/BigSpinner'

export default function ignored_users() {

  const user = authUser()
  const toast = useToast()
  const [hatings, setHatings] = useState([])
  const [pageLoading, setPageLoading] = useState(true)
  const [removing, setRemoving] = useState({status: false, uid: null})

  useEffect(() => {

    if (user.data?.id) {
      getUserInfo()
    }

  }, [user.data])



  const removeFromIgnore = async (userId) => {

    setRemoving({status: true, uid: userId})

    const res = await axios.post('/user/remove_from_ignore', { userId })
    if (res.data.status == 'success') {
      toast({
        description: res.data.msg,
        status: 'success',
        duration: 9000,
        isClosable: true,
      })

      getUserInfo()
    }
    setRemoving({status: false, uid: null})
  }


  async function getUserInfo() {
    const res = await axios.get(`/user/${user.data.id}`)
    console.log('Users with hatings ', res.data)
    setHatings(res.data.hatings)
    setPageLoading(false)
  }


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
                  <Button isLoading={removing.status && removing.uid == user.id} onClick={() => removeFromIgnore(user.id)} size='xs' bg='cyan.400' _hover={{ bg: 'cyan.500' }} rounded='0'>Remove from ignore list</Button>
                </Box>
              </Flex>
            </Box>

          })
            : <Center w='full' h={300}>
              {pageLoading ? <BigSpinner /> : <Text>No ignored users found</Text>}
            </Center>
          }


        </Stack>
      </Box>
    </ProfileLayout>
  )
}
