import { useDispatch, useSelector } from '@/store'
import { postActions } from '@/store/post'
import { AppTypes } from '@/types'
import getCurrentSemester from '@/utils/semester'
import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import { Autocomplete, Box, FormControl, Grid2, Stack, Switch, TextField, Typography } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import dayjs, { Dayjs } from 'dayjs'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import ErrorMessage from '../@shared/text/ErrorMessage'
type Options = {
     onOk?: (data: AppTypes.CreatePostRequest) => Promise<boolean>
     onCancel?: () => void
}
const defaultValues: AppTypes.CreatePostRequest = {
     name: '',
     desc: '',
     status: 'Public',
     startAt: 0,
     endAt: 0,
     location: '',
     numberParticipants: 0,
     facultyName: '',
     category: 'Academic',
     point: 3 as AppTypes.Point,
     semester: '',
}
interface Props {
     handleClose?: () => void
}
const DialogCreateActivity = ({ handleClose }: Props) => {
     const [options, setOptions] = useState<Options & { open: boolean }>()
     const user = useSelector(state => state.me.user)
     const { control, handleSubmit, formState: { errors, isSubmitting }, reset, setValue } = useForm<AppTypes.CreatePostRequest>({
          resolver: yupResolver<AppTypes.CreatePostRequest>(
               yup.object().shape({
                    name: yup.string().required('Name is required'),
                    desc: yup.string().required('Description is required'),
                    facultyName: yup.string().default(user?.facultyName ?? ''),
                    location: yup.string().required('Location is required'),
                    numberParticipants: yup.number().required('Number of participants is required'),
                    category: yup.string().oneOf(["Academic", "Volunteer", "Mental Physical"]).required('Category is required'),
                    semester: yup.string().required('Semester is required'),
                    point: yup.mixed<AppTypes.Point>().oneOf([3, 5, 7, 10]).required('Point is required'),
                    status: yup.mixed<AppTypes.Status>().oneOf(['Public', 'Private']).required('Status is required'),
                    startAt: yup.number().required('Start Date is required'),
                    endAt: yup.number().required('Start Time is required'),
               })),
          defaultValues: {
               ...defaultValues,
               facultyName: user?.facultyName ?? '',
          },
     })
     const [isPublic, setIsPublic] = useState(true)
     const today = new Date();
     const [start, setStart] = useState<Date>(today);
     const [end, setEnd] = useState<Date>();
     const [semesterOptions, setSemesterOptions] = useState<string[]>([]);
     const dispatch = useDispatch()
     useEffect(() => {
          const currentDate = new Date();
          const nextDay = new Date(currentDate);
          nextDay.setDate(currentDate.getDate() + 1);
          nextDay.setHours(currentDate.getHours() + 1);

          setEnd(nextDay);
     }, []);

     const handleChangeStart = (newStart: Dayjs | null) => {
          const now = new Date();
          if (!newStart || newStart.toDate() < now) {
               return;
          }
          setStart(newStart.toDate());
     };
     const handleChangeEnd = (newEnd: Dayjs | null) => {
          if (!newEnd) return;

          const startDate = dayjs(start);
          const endDate = dayjs(newEnd);

          if (endDate.isBefore(startDate, 'minute')) {
               return;
          }
          setEnd(newEnd.toDate());
     };

     useEffect(() => {
          const availableSemesters = getCurrentSemester(new Date());
          setSemesterOptions(availableSemesters);
     }, []);
     const handleOk = async (data: AppTypes.CreatePostRequest) => {
          try {
               const format: AppTypes.CreatePostRequest = {
                    ...data,
                    startAt: start.valueOf() ?? 0,
                    endAt: end?.valueOf() ?? 0,
                    status: isPublic ? 'Public' : 'Private',
                    facultyName: user?.facultyName ?? '',
               }
               const resp = await dispatch(postActions.createPost(format)).unwrap();
               options?.onOk?.(resp?.data?.data);
               setOptions({
                    ...options,
                    open: false
               });
               handleClose?.();
          } catch (error) {
               console.log('error:', error);
          }
     };
     return (
          <form noValidate autoComplete='off'  >
               <Grid2 container spacing={2}>
                    <Grid2 size={12}>
                         <FormControl fullWidth sx={{ height: '100%' }}>
                              <Controller
                                   name='status'
                                   control={control}
                                   render={({ field }) =>
                                        <Box sx={{ height: '100%' }}>
                                             <Stack direction="row" spacing={1} sx={{ alignItems: 'center', height: '100%', justifyContent: 'center' }}>
                                                  <Typography sx={{ fontWeight: 500 }} color={isPublic ? '#5D8736' : 'textSecondary'}>Public</Typography>
                                                  <Switch checked={isPublic} onChange={() => setIsPublic(!isPublic)}
                                                       color={isPublic ? 'success' : 'warning'}
                                                  />
                                                  <Typography sx={{ fontWeight: 500 }} color={!isPublic ? '#FF9D23' : 'textSecondary'}>Private</Typography>
                                             </Stack>
                                        </Box>
                                   }
                              />
                              <ErrorMessage error={errors?.status?.message || ''} />
                         </FormControl>
                    </Grid2>
                    <Grid2 size={12}>
                         <FormControl fullWidth>
                              <Controller
                                   name='name'
                                   control={control}
                                   render={({ field }) =>
                                        <TextField
                                             {...field}
                                             required
                                             label='Name activity'
                                             error={Boolean(errors?.name)}
                                        />
                                   }
                              />
                              <ErrorMessage error={errors?.name?.message || ''} />
                         </FormControl>
                    </Grid2>
                    <Grid2 size={12}>
                         <FormControl fullWidth>
                              <Controller
                                   name='desc'
                                   control={control}
                                   render={({ field }) =>
                                        <TextField
                                             {...field}
                                             required
                                             label='Description'
                                             error={Boolean(errors?.desc)}
                                             rows={3}
                                             multiline
                                        />
                                   }
                              />
                              <ErrorMessage error={errors?.desc?.message || ''} />
                         </FormControl>
                    </Grid2>
                    <Grid2 size={12}>
                         <FormControl fullWidth>
                              <Controller
                                   name='facultyName'
                                   control={control}
                                   render={({ field }) =>
                                        <TextField
                                             {...field}
                                             disabled
                                             label='Faculty'
                                             value={user?.facultyName ?? ''}
                                             error={Boolean(errors?.facultyName)}
                                        />
                                   }
                              />
                              <ErrorMessage error={errors?.facultyName?.message || ''} />
                         </FormControl>
                    </Grid2>
                    <Grid2 size={7}>
                         <FormControl fullWidth>
                              <Controller
                                   name='category'
                                   control={control}
                                   render={({ field }) =>
                                        <Autocomplete
                                             {...field}
                                             options={['Academic', 'Volunteer', 'Mental Physical']}
                                             renderInput={(params) =>
                                                  <TextField {...params}
                                                       label='Category'
                                                  />}
                                             getOptionLabel={(option) => option.toString()}
                                             isOptionEqualToValue={(option, value) => option === value}
                                             onChange={(_, newValue) => field.onChange(newValue)}
                                        />
                                   }
                              />
                              <ErrorMessage error={errors?.category?.message || ''} />
                         </FormControl>
                    </Grid2>
                    <Grid2 size={5}>
                         <FormControl fullWidth>
                              <Controller
                                   name='point'
                                   control={control}
                                   render={({ field }) =>
                                        <Autocomplete
                                             {...field}
                                             options={[3, 5, 7, 10]}
                                             renderInput={(params) =>
                                                  <TextField {...params}
                                                       label='Point'
                                                  />}
                                             getOptionLabel={(option) => option.toString()}
                                             isOptionEqualToValue={(option, value) => option === value}
                                             onChange={(_, newValue) => field.onChange(newValue)}
                                        />
                                   }
                              />
                              <ErrorMessage error={errors?.point?.message || ''} />
                         </FormControl>
                    </Grid2>
                    <Grid2 size={7}>
                         <FormControl fullWidth>
                              <Controller
                                   name='location'
                                   control={control}
                                   render={({ field }) =>
                                        <TextField
                                             {...field}
                                             required
                                             label='Location'
                                             error={Boolean(errors?.location)}
                                        />
                                   }
                              />
                              <ErrorMessage error={errors?.location?.message || ''} />
                         </FormControl>
                    </Grid2>
                    <Grid2 size={5}>
                         <FormControl fullWidth>
                              <Controller
                                   name='numberParticipants'
                                   control={control}
                                   render={({ field }) =>
                                        <TextField
                                             {...field}
                                             required
                                             type='number'
                                             label='Number of participants'
                                             error={Boolean(errors?.numberParticipants)}
                                        />
                                   }
                              />
                              <ErrorMessage error={errors?.numberParticipants?.message || ''} />
                         </FormControl>
                    </Grid2>
                    <Grid2 size={12}>
                         <FormControl fullWidth>
                              <Controller
                                   name='semester'
                                   control={control}
                                   render={({ field }) => (
                                        <Autocomplete
                                             {...field}
                                             options={semesterOptions}
                                             renderInput={(params) => <TextField {...params} label="Semester" />}
                                             getOptionLabel={(option) => option.toString()}
                                             isOptionEqualToValue={(option, value) => option === value}
                                             onChange={(_, newValue) => field.onChange(newValue)}
                                        />

                                   )}
                              />
                              <ErrorMessage error={errors?.semester?.message || ''} />
                         </FormControl>
                    </Grid2>
                    <Grid2 size={6}>
                         <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <Controller
                                   name='startAt'
                                   control={control}
                                   render={({ field }) =>
                                        <DemoContainer components={['DateTimePicker']}>
                                             <DateTimePicker
                                                  {...field}
                                                  label="Activity start at"
                                                  value={dayjs(start)}
                                                  onChange={handleChangeStart}
                                                  minDate={dayjs()}
                                                  minTime={dayjs().add(1, 'minute').set('second', 0).set('millisecond', 0)}
                                             />
                                        </DemoContainer>
                                   }
                              />
                         </LocalizationProvider>
                    </Grid2>
                    <Grid2 size={6}>
                         <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <Controller
                                   name='endAt'
                                   control={control}
                                   render={({ field }) =>
                                        <DemoContainer components={['DateTimePicker']}>
                                             <DateTimePicker
                                                  {...field}
                                                  label="Activity end at"
                                                  value={dayjs(end)}
                                                  onChange={handleChangeEnd}
                                                  minDate={dayjs(start)}
                                                  minTime={dayjs(start).add(1, 'minute').set('second', 0).set('millisecond', 0)}
                                             />
                                        </DemoContainer>
                                   }
                              />
                         </LocalizationProvider>
                    </Grid2>
               </Grid2>
               <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    margin: '20px auto 0 auto',
                    gap: '10px',
               }}>
                    <LoadingButton
                         disabled={isSubmitting}
                         color='error'
                         variant='outlined'
                         onClick={handleClose}
                    >
                         Cancel
                    </LoadingButton>
                    <LoadingButton
                         loading={isSubmitting}
                         variant='outlined'
                         onClick={
                              handleSubmit(handleOk)
                         }
                    >
                         Create
                    </LoadingButton>
               </Box>
          </form>
     )
}

export default DialogCreateActivity