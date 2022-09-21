import { Flex, Icon, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import React from 'react'
import { FaCog, FaCogs } from 'react-icons/fa'
import { Bell, Settings, User } from 'tabler-icons-react'
import GeneralSettings from '../../Components/profile/GeneralSettings'
import NotificationSettings from '../../Components/profile/NotificationSettings'
import ProfileLayout from '../../Components/profile/ProfileLayout'
import UpddateProfile from '../../Components/profile/UpddateProfile'

export default function settings() {
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
            <UpddateProfile />
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
