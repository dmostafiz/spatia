import { Flex, Icon, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaCog, FaCogs } from 'react-icons/fa'
import { Bell, Settings, User } from 'tabler-icons-react'
import GeneralSettings from '../../Components/profile/GeneralSettings'
import NotificationSettings from '../../Components/profile/NotificationSettings'
import ProfileLayout from '../../Components/profile/ProfileLayout'
import UpddateProfile from '../../Components/profile/UpddateProfile'
import authUser from '../../Hooks/authUser'

export default function settings() {

  const aUser = authUser()

  const [user, setUser] = useState(null)

  useEffect(() => {
      async function getUserInfo() {

          const res = await axios.get(`/user/${aUser.data?.id}`)

          console.log('Got user', res.data)

          if (res.data.status != 'error') {
              setUser(res.data)
          }
      }

      if (aUser.data?.id) {
          getUserInfo()
      }
  }, [aUser.data])


  return (
    <ProfileLayout>

      <Tabs fontFamily='sans-serif' variant='enclosed' colorScheme='yellow'>
        <TabList mb='1em'>

          <Tab>
            <Flex alignItems='center' gap={1}>
              <Icon fontSize={20} as={User} />
              <Text> Profile </Text>
            </Flex>
          </Tab>

          <Tab>
            <Flex alignItems='center' gap={1}>
              <Icon fontSize={20} as={Settings} />
              <Text> General settings</Text>
            </Flex>
          </Tab>

          <Tab>
            <Flex alignItems='center' gap={1}>
              <Icon fontSize={20} as={Bell} />
              <Text> Notifications </Text>
            </Flex>
          </Tab>

        </TabList>
        <TabPanels>
          <TabPanel>
            {user &&  <UpddateProfile user={user}/> }
          </TabPanel>
          <TabPanel>
            <GeneralSettings />
          </TabPanel>
          <TabPanel>
            <NotificationSettings />
          </TabPanel>
        </TabPanels>
      </Tabs>

    </ProfileLayout>
  )
}
