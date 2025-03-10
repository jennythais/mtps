"use client"
import { useDispatch, useSelector } from '@/store'
import { assistantActions } from '@/store/assistant'
import { TabContext, TabPanel } from '@mui/lab'
import { Box, Tab, Tabs } from '@mui/material'
import React, { useEffect, useState } from 'react'
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
  // const [studentsByFaculty, setStudenstByFaculty] = useState<AppTypes.Student[]>([])
  const dispatch = useDispatch()
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }
  const { user } = useSelector((state) => state.me)
  const { studentsByFaculty } = useSelector((state) => state.assistant)
  useEffect(() => {
    if (user && user?.facultyName) {
      const res = dispatch(assistantActions.getStudentsByFaculty({
        faculty: user?.facultyName
      }))
    }
  }, [user])

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
            <TraningPointTable data={studentsByFaculty} />
          )}
        </TabPanel>
      </TabContext>
    </Box>
  )
}

export default Profile