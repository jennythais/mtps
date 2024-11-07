"use client"
import { TabContext, TabPanel } from '@mui/lab'
import { Box, Tab, Table, TableCell, TableHead, TableRow, Tabs } from '@mui/material'
import React, { useState } from 'react'
import ProfileTable from './ProfileTable'
import TraningPointTable from './TraningPointTable'
type Head = {
  id: string
  label: string
  value?: string
}
const tab: Head[] = [
  {
    id: 'profile',
    label: 'Profile',
    value: "0",
  },
  {
    id: 'training point details',
    label: 'Training Point Details',
    value: "1",
  },
]
const Profile = () => {
  const [value, setValue] = useState("0")
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }
  return (
    <Box sx={{
      pt: 5,
      px: 5,
    }}>
      <TabContext value={value}>
        <Box>
          <Tabs value={value} onChange={handleChange}>
            {tab.map((item) => (
              <Tab key={item.id} label={item?.label} id={item?.id} value={item?.value} />
            ))}
          </Tabs>
        </Box>
        <TabPanel role='tab' value={value} >
          {value === "0" && (
            <ProfileTable />
          )}
          {value === "1" && (
            <TraningPointTable />
          )}
        </TabPanel>
      </TabContext>
    </Box>
  )
}

export default Profile