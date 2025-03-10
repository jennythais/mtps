import { Box, FormControl, Grid2, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, Tab, Table, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AvatarColor from '../components/@shared/avatar/AvatarColor'
import { useDispatch, useSelector } from '@/store'
import { userActions } from '@/store/me'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import toast from 'react-hot-toast'
import ErrorMessage from '../components/@shared/text/ErrorMessage'
import IconifyIcon from '../components/@shared/icon/IconifyIcon'
import { LoadingButton } from '@mui/lab'

interface FormData {
  id?: string
  currentPassword: string
  newPassword: string
}
const defaultValues: FormData = {
  id: '',
  currentPassword: '',
  newPassword: '',
}
const ProfileTable = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const { user, loading } = useSelector((state) => state.me)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(userActions.getUser())
  }, [])
  const { control, handleSubmit, formState: { errors }, setValue } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(
      yup.object().shape({
        id: yup.string().optional(),
        currentPassword: yup.string().required('Current password is required'),
        newPassword: yup.string().required('New password is required').min(6, 'Password must be at least 6 characters')
      })
    )
  })

  useEffect(() => {
    if (user && user?.id) {
      setValue('id', user?.id)
    }
  }, [user, setValue])

  const onSubmit = async (data: FormData) => {
    const { id, currentPassword, newPassword } = data
    const result = await dispatch(
      userActions.changePassword({
        id,
        currentPassword,
        newPassword
      })
    )
    if (result.meta.requestStatus === 'fulfilled') {
      toast.success('Change password successful')
      setValue('currentPassword', '')
      setValue('newPassword', '')
    }
  }
  return (
    <Box sx={{
      border: '1px solid white',
      p: 5,
      boxShadow: '0 0 20px 0 rgba(0,0,0,0.1)',
      borderRadius: '10px',
      mt: 5
    }}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        mb: 3
      }}>
        <AvatarColor name={user?.name || ''} width={100} height={100} />
      </Box>
      <Stack direction='row' justifyContent='space-between'>
        <Stack direction='column' spacing={3}>
          <Typography variant='body1'>ID: {user?.id}</Typography>
          <Typography variant='body1'>Full name: {user?.name}</Typography>
        </Stack>
        <Stack direction='column' spacing={3}>
          <Typography variant='body1'>Email: {user?.email}</Typography>
          <Typography variant='body1'>Faculty: {user?.facultyName}</Typography>
        </Stack>
      </Stack>
      <Box sx={{
        mt: 5
      }}>
        <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)} >
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mb: 4
          }}>
            <FormControl sx={{
              width: '45%',
            }}>
              <InputLabel htmlFor='currentPassword'>Current Password</InputLabel>
              <Controller
                name='currentPassword'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <OutlinedInput
                    autoFocus
                    onBlur={field.onBlur}
                    label="Current Password"
                    value={field.value}
                    onChange={field.onChange}
                    error={Boolean(errors.currentPassword)}
                    type={showCurrentPassword ? 'text' : 'password'}
                    id='currentPassword'
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          onMouseDown={e => e.preventDefault()}
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        >
                          <IconifyIcon icon={showCurrentPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} fontSize={20} />
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                )}
              />
              {errors.currentPassword && <ErrorMessage error={errors.currentPassword} />}
            </FormControl>
            <FormControl sx={{
              width: '45%',
            }}>
              <InputLabel htmlFor='newPassword'>New Password</InputLabel>
              <Controller
                name='newPassword'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <OutlinedInput
                    autoFocus
                    onBlur={field.onBlur}
                    label="New Password"
                    value={field.value}
                    onChange={field.onChange}
                    error={Boolean(errors.newPassword)}
                    type={showNewPassword ? 'text' : 'password'}
                    id='currentPassword'
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          onMouseDown={e => e.preventDefault()}
                          onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                          <IconifyIcon icon={showNewPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} fontSize={20} />
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                )}
              />
              {errors.newPassword && <ErrorMessage error={errors.newPassword} />}
            </FormControl>
          </Box>
          <LoadingButton variant='contained' sx={{
            width: 'fit-content',
            backgroundColor: 'green',
            margin: '0 auto',
            display: 'flex'
          }}
            loading={loading[userActions.changePassword.typePrefix]}
            type='submit'
          >Save</LoadingButton>
        </form>
      </Box>
    </Box>
  )
}

export default ProfileTable