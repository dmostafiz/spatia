import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import React from 'react'
import ProfileLayout from '../../Components/profile/ProfileLayout'
import UpddateProfile from '../../Components/profile/UpddateProfile'

export default function settings() {
  return (
    <ProfileLayout>

      <Tabs variant='enclosed'  colorScheme='yellow'>
        <TabList mb='1em'>
          <Tab>Profile</Tab>
          <Tab>Notifications</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
             <UpddateProfile />
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>

    </ProfileLayout>
  )
}
