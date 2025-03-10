import { Box, Button, Dialog, DialogTitle, Typography } from '@mui/material';
import React from 'react'
interface DialogProps {
     open: boolean;
     onClose: () => void;
     onConfirm?: () => void;
}
const DialogConfirm = ({ open, onClose, onConfirm }: DialogProps) => {
     const handleClose = () => {
          if (onClose) {
               onClose();
          }
     }
     const handleConfirm = () => {
          if (onConfirm) {
               onConfirm();
          }
          handleClose();
     }
     return (
          <Dialog onClose={handleClose} open={open} sx={{
               '& .MuiDialog-paper': {
                    width: '600px',
                    padding: '20px'
               }
          }}>
               <DialogTitle>Confirm Join Activity</DialogTitle>
               <Box>
                    <Typography variant='body1' textAlign='center'>Are you sure you want to join this activity?</Typography>
                    <Box sx={{
                         display: 'flex',
                         justifyContent: 'center',
                         gap: 6,
                         mt: 4
                    }}>
                         <Button variant='contained' sx={{
                              bgcolor: '#f44336'
                         }} onClick={handleClose}>Cancel</Button>
                         <Button variant='contained' sx={{
                              bgcolor: '#347928'
                         }} onClick={handleConfirm}>Confirm</Button>
                    </Box>
               </Box>
          </Dialog>
     )
}

export default DialogConfirm