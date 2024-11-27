import { useSelector } from '@/store'
import { AppTypes } from '@/types'
import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import { Autocomplete, Box, Button, FormControl, Grid2, TextField } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import dayjs from 'dayjs'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import ErrorMessage from '../@shared/text/ErrorMessage'

const defaultValues: AppTypes.CreatePostRequest = {
     name: '',
     desc: '',
     facultyName: '',
     status: 'Public',
     startDate: new Date(),
     startTime: new Date(),
     endDate: new Date(),
     endTime: new Date(),
     location: '',
     point: 3,
     numberParticipants: 0,
     category: 'Academic',
     semester: '',
     test: {
          questions: [],
          target: 0
     }
}

interface Props {
     handleClose?: () => void
}
const DialogCreateTest = ({ handleClose }: Props) => {
     const Point: AppTypes.Point[] = [3, 5, 7, 10]

     const Category: AppTypes.Category[] = ['Academic', 'Volunteer', 'Mental Physical']
     const { control, formState: { errors }, getValues, reset } = useForm({
          defaultValues,
          mode: 'onBlur',
          resolver: yupResolver(yup.object().shape({
               name: yup.string().required('Name is required'),
               desc: yup.string().required('Description is required'),
               facultyName: yup.string().required('Faculty is required'),
               startDate: yup.date().required('Start Date is required'),
               startTime: yup.date().required('Start Time is required'),
               endDate: yup.date().required('End Date is required').min(
                    yup.ref('startDate'), 'End Date must be later than Start Date'
               ),
               endTime: yup.date().required('End Time is required'),
               location: yup.string().required('Location is required'),
               point: yup.number().required('Point is required'),
               numberParticipants: yup.number().required('Number of Participants is required'),
               category: yup.string().required('Category is required'),
               semester: yup.string().required('Semester is required'),
               test: yup.object().shape({
                    questions: yup
                         .array()
                         .of(
                              yup.object().shape({
                                   question: yup.string().required('Question is required'),
                                   options: yup
                                        .array()
                                        .of(
                                             yup.object().shape({
                                                  id: yup.string().required('Option ID is required'),
                                                  text: yup.string().required('Option text is required'),
                                             })
                                        )
                                        .required('Options are required'),
                                   correctOption: yup.string().required('Correct option is required'),
                              })
                         )
                         .required('Questions are required'),
                    target: yup.number().required('Target is required'),
               }).optional(),
          }))
     })
     const { user } = useSelector(state => state.me)
     useEffect(() => {
          if (user && user?.facultyName) {
               reset({
                    facultyName: user.facultyName,
               })
          }
     }, [user, reset])
     const onClose = () => {
          handleClose && handleClose()
     }
     return (
          <form>
               <Grid2 container sx={{
                    gap: 2,
                    justifyContent: 'space-between'
               }}>
                    <Grid2 size={12}>
                         <FormControl fullWidth>
                              <Controller
                                   name='facultyName'
                                   control={control}
                                   render={({ field }) =>
                                        <TextField
                                             value={field.value}
                                             onChange={field.onChange}
                                             error={Boolean(errors.facultyName)}
                                             label='Faculty'
                                             disabled
                                        />
                                   }
                              />
                         </FormControl>
                    </Grid2>
                    <Grid2 size={12}>
                         <FormControl fullWidth>
                              <Controller
                                   name="name"
                                   control={control}
                                   render={({ field }) =>
                                        <TextField
                                             value={field.value}
                                             onChange={field.onChange}
                                             error={Boolean(errors.desc)} label="Name"
                                        />}
                              />
                              {errors.name && <ErrorMessage error={errors.name} />}
                         </FormControl>
                    </Grid2>
                    <Grid2 size={12}>
                         <FormControl fullWidth>
                              <Controller
                                   name="desc"
                                   control={control}
                                   render={({ field }) =>
                                        <TextField
                                             value={field.value}
                                             onChange={field.onChange}
                                             error={Boolean(errors.desc)} label="Description"
                                        />}
                              />
                              {errors.desc && <ErrorMessage error={errors.desc} />}
                         </FormControl>
                    </Grid2>
                    <Grid2 size={12}>
                         <FormControl fullWidth>
                              <Controller
                                   name="location"
                                   control={control}
                                   render={({ field }) =>
                                        <TextField
                                             value={field.value}
                                             onChange={field.onChange}
                                             label="Location"
                                             error={Boolean(errors.location)}
                                        />}
                              />
                              {errors.location && <ErrorMessage error={errors.location} />}
                         </FormControl>
                    </Grid2>
                    <Grid2 size={3}>
                         <FormControl fullWidth>
                              <Controller
                                   name="point"
                                   control={control}
                                   render={({ field }) =>
                                        <Autocomplete
                                             options={Point}
                                             getOptionLabel={(option: AppTypes.Point) => option.toString()}
                                             onChange={(e, data) => field.onChange(data)}
                                             renderInput={(params) => <TextField {...params} label="Point" />}
                                        />
                                   }
                              />
                         </FormControl>
                    </Grid2>
                    <Grid2 size={4}>
                         <FormControl fullWidth>
                              <Controller
                                   name="category"
                                   control={control}
                                   render={({ field }) =>
                                        <Autocomplete
                                             options={Category}
                                             getOptionLabel={(option: AppTypes.Category) => option}
                                             onChange={(e, data) => field.onChange(data)}
                                             renderInput={(params) => <TextField
                                                  {...params} label="Category"
                                             />}
                                        />
                                   }
                              />
                         </FormControl>
                    </Grid2>
                    <Grid2 size={4}>
                         <FormControl fullWidth>
                              <Controller
                                   name="numberParticipants"
                                   control={control}
                                   render={({ field }) =>
                                        <TextField
                                             value={field.value}
                                             onChange={field.onChange}
                                             label="Number of Participants"
                                             error={Boolean(errors.numberParticipants)}
                                             type='number'
                                        />
                                   }
                              />
                              {errors.numberParticipants && <ErrorMessage error={errors.numberParticipants} />}
                         </FormControl>
                    </Grid2>
                    <Grid2 size={5.5}>
                         <FormControl fullWidth>
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                   <Controller
                                        name="startDate"
                                        control={control}
                                        render={({ field }) =>
                                             <DatePicker
                                                  label="Start Date"
                                                  value={field.value ? dayjs(field.value) : null}
                                                  onChange={(date) => field.onChange(date)}
                                             />
                                        }
                                   />
                              </LocalizationProvider>
                              {errors.startDate && <ErrorMessage error={errors.startDate} />}
                         </FormControl>
                    </Grid2>
                    <Grid2 size={5.5}>
                         <FormControl fullWidth>
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                   <Controller
                                        name="endDate"
                                        control={control}
                                        render={({ field }) =>
                                             <DatePicker
                                                  label="End Date"
                                                  value={field.value ? dayjs(field.value) : null}
                                                  onChange={(date) => field.onChange(date)}
                                             />
                                        }
                                   />
                              </LocalizationProvider>
                              {errors.endDate && <ErrorMessage error={errors.endDate} />}
                         </FormControl>
                    </Grid2>
                    <Grid2 size={5.5}>
                         <FormControl fullWidth>
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                   <Controller
                                        name="startTime"
                                        control={control}
                                        render={({ field }) =>
                                             <TimePicker
                                                  label="Start Time"
                                                  value={field.value ? dayjs(field.value) : null}
                                                  onChange={(date) => field.onChange(date)}
                                             />
                                        }
                                   />
                              </LocalizationProvider>
                              {errors.startTime && <ErrorMessage error={errors.startTime} />}
                         </FormControl>
                    </Grid2>
                    <Grid2 size={5.5}>
                         <FormControl fullWidth>
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                   <Controller
                                        name="endTime"
                                        control={control}
                                        render={({ field }) =>
                                             <TimePicker
                                                  label="End Time"
                                                  value={field.value ? dayjs(field.value) : null}
                                                  onChange={(date) => field.onChange(date)}
                                             />
                                        }
                                   />
                              </LocalizationProvider>
                              {errors.endDate && <ErrorMessage error={errors.endDate} />}
                         </FormControl>
                    </Grid2>
               </Grid2>
               <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: 6,
                    mt: 4
               }}>
                    <Button variant='contained' sx={{
                         bgcolor: '#f44336'
                    }} onClick={onClose}>Cancel</Button>
                    <LoadingButton variant='contained' sx={{
                         width: 'fit-content',
                         backgroundColor: 'green',
                    }}
                    // loading={loading[postActions..typePrefix]}
                    // onClick={handleConfirm}
                    >Create</LoadingButton>
               </Box>
          </form>
     )
}

export default DialogCreateTest