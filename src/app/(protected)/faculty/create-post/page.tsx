'use client'
import { Box, Button, Grid2 } from '@mui/material'
import React from 'react'
import { useNewActivityDialog } from './NewActivityDialog'

const CreatePost = () => {
  const { renderDialog, showDialog } = useNewActivityDialog()
  const handleClick = () => {
    showDialog({
      onOk: async (data: any) => {
        return true
      }
    })
  }
  return (
    <Box sx={{
      marginTop: '20px',
      paddingX: '30px',
    }}>
      <Grid2 container spacing={2}>
        <Grid2 size={7}>

        </Grid2>
        <Grid2 size={5}>
          <Box sx={{ display: 'flex', gap: '20px', justifySelf: 'flex-end' }}>
            <Button variant="contained" color="primary" onClick={
              handleClick
            }>Create Activity</Button>
            <Button variant="contained" color="primary">Create Test</Button>
            {renderDialog()}
          </Box>
        </Grid2>
      </Grid2>
    </Box>
  )
}

export default CreatePost