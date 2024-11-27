import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Button, Dialog, DialogContent, DialogTitle, Tab, Table, TableBody, TableCell, TableRow, TextField } from '@mui/material'
import React, { useState } from 'react'
import DialogCreateActivity from './DialogCreateActivity'
import DialogCreateTest from './DialogCreateTest'

const CreatePost = () => {
  const [showDialogCreate, setShowDialogCreate] = useState(false)
  const [value, setValue] = React.useState('1');
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
          width: '90%',
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