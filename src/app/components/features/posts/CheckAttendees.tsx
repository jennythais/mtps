import { Box, Dialog, DialogTitle, FormControl, TextField } from '@mui/material'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { useDispatch, useSelector } from '@/store';
import { postActions } from '@/store/post';
import toast from 'react-hot-toast';
import AlertCheck from '../../@shared/alert/AlertCheck';


interface CheckAttendeesProps {
     open: boolean;
     onClose: () => void;
     postId: string;
}
interface FormData {
     studentId: string;
}
const defaultValues: FormData = {
     studentId: '',
}
const CheckAttendees = ({ open, onClose, postId }: CheckAttendeesProps) => {
     const dispatch = useDispatch();
     const [errorCheck, setErrorCheck] = useState(false)
     const { loading, error } = useSelector(state => state.post)
     const handleClose = () => {
          if (onClose) {
               onClose()
          }
     }
     const { control, getValues } = useForm({
          defaultValues,
          resolver: yupResolver(yup.object().shape({
               studentId: yup.string().required('Student ID is required')
          }))
     })
     const _onSubmit = async () => {
          const result = await dispatch(postActions.checkAttendees({
               studentId: getValues().studentId,
               postId
          }))
          if (result.meta.requestStatus === 'fulfilled') {
               toast.success('Check successful')
               handleClose()
          }
          if (result?.meta?.requestStatus === 'rejected') {
               setErrorCheck(true)
          }
     }
     return (
          <Dialog open={open} onClose={handleClose} sx={{
               '& .MuiDialog-paper': {
                    width: '350px',
                    padding: '20px'
               }
          }}>
               <DialogTitle>Check Attendees</DialogTitle>
               <form noValidate>
                    <FormControl fullWidth>
                         <Controller
                              name="studentId"
                              control={control}
                              render={({ field, fieldState }) => (
                                   <TextField
                                        label="Student ID"
                                        variant="outlined"
                                        fullWidth
                                        {...field}
                                        error={fieldState.invalid}
                                   />
                              )}
                         />
                    </FormControl>
                    <Box sx={{ mt: 4 }}>
                         <LoadingButton variant='contained'
                              sx={{
                                   width: 'fit-content',
                                   backgroundColor: 'green',
                                   display: 'flex',
                                   margin: 'auto'
                              }}
                              onClick={_onSubmit}
                              loading={loading[postActions.updatePost.typePrefix]}
                         >
                              Check
                         </LoadingButton>
                    </Box>
               </form>
               <Box sx={{
                    mt: 3
               }}>
                    {errorCheck && <AlertCheck severity='error' label={error || ''} />}
               </Box>
          </Dialog>
     )
}

export default CheckAttendees