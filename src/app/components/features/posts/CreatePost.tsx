import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Button, Dialog, DialogContent, DialogTitle, Tab, Table, TableBody, TableCell, TableRow, TextField } from '@mui/material'
import React, { useState } from 'react'
import DialogCreateActivity from './DialogCreateActivity'
import DialogCreateTest from './DialogCreateTest'
import { useNewActivityDialog } from '@/app/create-post/NewActivityDialog'
import { useSelector } from '@/store'

const CreatePost = () => {
  const [showDialogCreate, setShowDialogCreate] = useState(false)
  const [value, setValue] = React.useState('1');
  const { posts, postsAssistant } = useSelector((state) => state.post)
  const handleOpenDialogCreate = () => {
    setShowDialogCreate(true)
  }
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const handleClose = () => {
    setShowDialogCreate(false)
  }
  return (
    <>
      <Button variant='outlined' onClick={handleOpenDialogCreate}>
        Create Post
      </Button>
      <Dialog open={showDialogCreate} sx={{
        '& .MuiDialog-paper': {
          maxWidth: '60%',
          padding: '20px'
        }
      }}>
        <DialogTitle>Create</DialogTitle>
        <DialogContent>
          <TabContext value={value}>
            <Box>
              <TabList onChange={handleChange}>
                <Tab label='Create Activity' value="1" />
                <Tab label='Create Test' value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <DialogCreateActivity handleClose={handleClose} />
            </TabPanel>
            <TabPanel value="2">
              <DialogCreateTest handleClose={handleClose} />
            </TabPanel>
          </TabContext>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default CreatePost