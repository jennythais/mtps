import { AppTypes } from '@/types'
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Autocomplete, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid2, Stack, Switch, TextField, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import dayjs, { Dayjs } from 'dayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import getCurrentSemester from '@/utils/semester'
import { useDispatch, useSelector } from '@/store'
import { postActions } from '@/store/post'
import ErrorMessage from '@/app/components/@shared/text/ErrorMessage'
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
const NewActivityDialog = forwardRef((_, ref) => {
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
        category: yup.string().oneOf(["All", "Academic", "Volunteer", "Mental Physical", "Discipline", "Reward", "Pioneering"]).required('Category is required'),
        semester: yup.string().required('Semester is required'),
        point: yup.mixed<AppTypes.Point>().oneOf([3, 5, 7, 10]).required('Point is required'),
        status: yup.mixed<AppTypes.Status>().oneOf(['Public', 'Private']).required('Status is required'),
        startAt: yup.number().required('Start At is required'),
        endAt: yup.number().required('End At is required'),
      })),
    defaultValues: {
      ...defaultValues,
      facultyName: user?.facultyName ?? '',
    },
  })
  const [isPublic, setIsPublic] = useState(true)
  const today = dayjs().startOf('day');
  const now = dayjs();
  const [startDate, setStartDate] = useState<Dayjs>(today);
  const [startTime, setStartTime] = useState<Dayjs>(now);
  const [endDate, setEndDate] = useState<Dayjs>(today.add(1, 'day'));
  const [endTime, setEndTime] = useState<Dayjs>(now.add(1, 'hour'));
  const [semesterOptions, setSemesterOptions] = useState<string[]>([]);
  const dispatch = useDispatch()
  const handleStartDateChange = (newDate: Dayjs | null) => {
    if (!newDate) return;
    setStartDate(newDate);
    if (newDate.isSame(today, 'day')) {
      setStartTime(now);
    } else {
      setStartTime(newDate.startOf('day'));
    }
    if (newDate.isAfter(endDate, 'day')) {
      setEndDate(newDate);
    }
  };
  const handleStartTimeChange = (newTime: Dayjs | null) => {
    if (!newTime) return;
    setStartTime(newTime);
  };

  const handleEndDateChange = (value: Dayjs | null) => {
    if (!value) return;
    setEndDate(value ? value : today.add(1, 'day'));
  };
  const handleEndTimeChange = (newTime: Dayjs | null) => {
    if (!newTime) return;
    if (startDate.isSame(endDate, 'day') && newTime.isBefore(startTime)) {
      return;
    }
    setEndTime(newTime);
  };

  useEffect(() => {
    const availableSemesters = getCurrentSemester(new Date());
    setSemesterOptions(availableSemesters);
  }, []);
  const handleOk = async (data: AppTypes.CreatePostRequest) => {
    try {
      const format: AppTypes.CreatePostRequest = {
        ...data,
        startAt: dayjs(startDate).add(startTime.hour(), 'hour').add(startTime.minute(), 'minute').valueOf(),
        endAt: dayjs(endDate).add(endTime.hour(), 'hour').add(endTime.minute(), 'minute').valueOf(),
        status: isPublic ? 'Public' : 'Private',
        facultyName: user?.facultyName ?? '',
      }
      const resp = await dispatch(postActions.createPost(format)).unwrap();
      options?.onOk?.(resp?.data?.data);
      setOptions({
        ...options,
        open: false
      });
    } catch (error) {
      console.log('error:', error);
    }
  };

  const handleCancel = () => {
    options?.onCancel?.()
    setOptions({
      ...options,
      open: false
    })
    reset()
  }
  useImperativeHandle(
    ref,
    () => {
      return {
        show: (options: Options) => {
          setOptions({
            ...options,
            open: true
          })
          reset()
        },
        hide: () => {
          setOptions({
            open: false
          })
        }
      }
    },
    []
  )
  useEffect(() => {
    if (errors) {
      console.log('Form Errors:', errors);
    }
  }, [errors]);
  return (
    <Dialog
      onClose={handleCancel}
      aria-labelledby='new-activity-dialog'
      open={options?.open ?? false}
      maxWidth='sm'
      fullWidth
    >
      <form noValidate autoComplete='off' >
        <DialogTitle id='new-activity-dialog'>Create new activity</DialogTitle>
        <DialogContent dividers>
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
                      options={['Academic', 'Volunteer', 'Mental Physical', 'Discipline', 'Reward', 'Pioneering']}
                      renderInput={(params) =>
                        <TextField {...params}
                          label='Category'
                        />}
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
                    <DatePicker
                      label="Start Date"
                      value={startDate}
                      onChange={handleStartDateChange}
                      disablePast
                    />
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
                    <DatePicker
                      label="End Date"
                      value={endDate}
                      onChange={handleEndDateChange}
                      minDate={startDate}  // Ensures end date cannot be before start date
                    />
                  }
                />
              </LocalizationProvider>
            </Grid2>
          </Grid2>
        </DialogContent>
        <DialogActions>
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '8px 16px',
            margin: 'auto',
            gap: '20px',
          }}>
            <LoadingButton
              disabled={isSubmitting}
              color='error'
              variant='outlined'
              onClick={handleCancel}
            >
              Cancel
            </LoadingButton>
            {/* <LoadingButton
              loading={isSubmitting}
              variant='outlined'
              onClick={
                handleSubmit(handleOk)
              }
            >
              Create
            </LoadingButton> */}
            <Button onClick={handleSubmit((data) => {
              console.log('handleSubmit called');
              handleOk(data);
            })}>
              Create
            </Button>


          </Box>
        </DialogActions>
      </form>
    </Dialog>
  )
})

export type NewActivityDialogRef = {
  show: (options: Options) => void
  hide: () => void
}
export const useNewActivityDialog = () => {
  const ref = useRef<NewActivityDialogRef>()
  const renderDialog = () => <NewActivityDialog ref={ref} />
  const showDialog = (option: Options) => {
    ref.current?.show(option)
  }
  const hideDialog = () => {
    ref.current?.hide()
  }
  return { renderDialog, showDialog, hideDialog }
}

export default NewActivityDialog