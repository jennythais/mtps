"use client"
import { useDispatch, useSelector } from '@/store';
import { authActions } from '@/store/auth';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, FormControl, Icon, IconButton, Input, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import ErrorMessage from '../components/@shared/text/ErrorMessage';
import { useState } from 'react';
import Link from 'next/link';
import IconifyIcon from '../components/@shared/icon/IconifyIcon';
import { useRouter } from 'next/navigation';
import LoadingButton from '@mui/lab/LoadingButton'
import { userActions } from '@/store/me';

interface FormData {
     email: string;
     password: string;
}
const defaultValues: FormData = {
     email: '',
     password: '',
}
const Login = () => {
     const [showPassword, setShowPassword] = useState(false);
     const dispatch = useDispatch();
     const router = useRouter();
     const { loading } = useSelector(state => state.auth)
     const { control, handleSubmit, formState: { errors } } = useForm({
          defaultValues,
          mode: 'onBlur',
          resolver: yupResolver(
               yup.object().shape({
                    email: yup.string().email('Invalid email').required('Email is required'),
                    password: yup.string().required('Password is required')
               })
          )
     })
     const onSubmit = async (data: FormData) => {
          const { email, password } = data;
          const result = await dispatch(
               authActions.login({
                    email,
                    password
               })
          )

          if (result.meta.requestStatus === 'fulfilled') {
               toast.success('Login successful')

               router.push('/')
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
                    <Typography variant='h4' textAlign='center' >Welcome to MTPS</Typography>
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
                         <Box sx={{
                              mb: '40px',
                         }}>
                              <Link href='/forgot-password' style={{ fontSize: '14px', fontFamily: 'var(--font-montserrat' }}>Forgot password?</Link>
                         </Box>

                         <LoadingButton variant='contained' sx={{
                              width: 'fit-content',
                              backgroundColor: 'green',
                              margin: '0 auto',
                              display: 'flex'
                         }}
                              loading={loading[authActions.login.typePrefix]}
                              type='submit'
                         >Sign In</LoadingButton>
                    </form>
               </Box>
          </div>
     )
}

export default Login