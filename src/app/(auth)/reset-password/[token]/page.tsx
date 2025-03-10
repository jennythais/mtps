"use client"
import IconifyIcon from '@/app/components/@shared/icon/IconifyIcon';
import ErrorMessage from '@/app/components/@shared/text/ErrorMessage';
import { useDispatch, useSelector } from '@/store';
import { authActions } from '@/store/auth';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Typography } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
interface FormData {
     password: string;
}
const defaultValues: FormData = {
     password: '',
}
const ResetPassword = () => {
     const dispatch = useDispatch();
     const pathname = usePathname();
     const router = useRouter();
     const token = pathname.split('/')[2];
     const { loading } = useSelector(state => state.auth)
     const [showPassword, setShowPassword] = useState(false);
     const { control, handleSubmit, formState: { errors } } = useForm({
          defaultValues,
          mode: 'onBlur',
          resolver: yupResolver(
               yup.object().shape({
                    password: yup.string().required('Password is required'),
               })
          )
     })
     const onSubmit = async (form: FormData) => {
          const result = await dispatch(
               authActions.resetPassword({
                    token: token,
                    password: form.password
               })
          )
          if (result.meta.requestStatus === 'fulfilled') {
               router.push('/login')
          }
     }
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
                         Reset Password</Typography>
                    <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                         <FormControl fullWidth sx={{
                              mb: '10px',
                         }}>
                              <InputLabel htmlFor='password'>Password</InputLabel>
                              <Controller
                                   name='password'
                                   control={control}
                                   rules={{ required: true }}
                                   render={({ field }) => (
                                        <OutlinedInput
                                             autoFocus
                                             onBlur={field.onBlur}
                                             label="Password"
                                             value={field.value}
                                             onChange={field.onChange}
                                             error={Boolean(errors.password)}
                                             type={showPassword ? 'text' : 'password'}
                                             placeholder='Enter your password'
                                             id='password'
                                             endAdornment={
                                                  <InputAdornment position='end'>
                                                       <IconButton
                                                            edge='end'
                                                            onMouseDown={e => e.preventDefault()}
                                                            onClick={() => setShowPassword(!showPassword)}
                                                       >
                                                            <IconifyIcon icon={showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} fontSize={20} />
                                                       </IconButton>
                                                  </InputAdornment>
                                             }
                                        />
                                   )}
                              />
                              {errors.password && <ErrorMessage error={errors.password} />}
                         </FormControl>
                         <LoadingButton variant='contained' sx={{
                              width: 'fit-content',
                              backgroundColor: 'green',
                              margin: '0 auto',
                              display: 'flex'
                         }}
                              loading={loading[authActions.forgotPassword.typePrefix]}
                              type='submit'
                         >Reset password</LoadingButton>
                    </form>
               </Box>
          </div>
     )
}

export default ResetPassword