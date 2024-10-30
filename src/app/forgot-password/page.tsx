"use client"
import { Alert, Box, Button, FormControl, Snackbar, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import ErrorMessage from '../components/@shared/text/ErrorMessage'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from '@/store';
import { authActions } from '@/store/auth';
import { LoadingButton } from '@mui/lab'

interface FormData {
     email: string;
}
const defaultValues: FormData = {
     email: '',
}
const ForgotPassword = () => {
     const dispatch = useDispatch();
     const { loading } = useSelector(state => state.auth)
     const [snackbarOpen, setSnackbarOpen] = useState(false);
     const [snackbarMessage, setSnackbarMessage] = useState('');
     const { control, handleSubmit, formState: { errors } } = useForm({
          defaultValues,
          mode: 'onBlur',
          resolver: yupResolver(
               yup.object().shape({
                    email: yup.string().email('Invalid email').required('Email is required'),
               })
          )
     })
     const onSubmit = (form: FormData) => {
          dispatch(
               authActions.forgotPassword({
                    email: form.email
               })
          )
          setSnackbarMessage(`Email has been sent to ${form.email}`);
          setSnackbarOpen(true);
     }

     const handleCloseSnackbar = () => {
          setSnackbarOpen(false);
     };
     return (
          <div className='pattern-login'>
               <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: {
                         xs: '85%',
                         sm: '80%',
                         md: '40%',
                         lg: '30%',
                    },
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    border: '1px solid white',
                    paddingY: '50px',
                    paddingX: '30px',
                    background: 'white',
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
                    borderRadius: '10px',
               }}>
                    <Typography variant='h5' sx={{
                         textAlign: 'center',
                         marginBottom: '20px',
                    }}>
                         Forgot Password</Typography>
                    <Typography variant='body1'>
                         ** Systems will send a link to your email to reset your password
                    </Typography>
                    <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                         <FormControl fullWidth sx={{
                              mb: '30px',
                              mt: '20px',
                         }}>
                              <Controller
                                   name='email'
                                   control={control}
                                   rules={{ required: true }}
                                   render={({ field }) => (
                                        <TextField
                                             autoFocus
                                             label="Email"
                                             value={field.value}
                                             onChange={field.onChange}
                                             error={Boolean(errors.email)}
                                             placeholder='Enter your email'
                                        />
                                   )}
                              />
                              {errors.email && <ErrorMessage error={errors.email} />}
                         </FormControl>
                         <LoadingButton variant='contained' sx={{
                              width: 'fit-content',
                              backgroundColor: 'green',
                              margin: '0 auto',
                              display: 'flex'
                         }}
                              loading={loading[authActions.forgotPassword.typePrefix]}
                              type='submit'
                         >Send mail</LoadingButton>
                    </form>

               </Box>
               <Snackbar anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
               }} open={snackbarOpen} autoHideDuration={5000} onClose={handleCloseSnackbar}>
                    <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                         {snackbarMessage}
                    </Alert>
               </Snackbar>
          </div>
     )
}

export default ForgotPassword