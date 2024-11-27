import { useDispatch, useSelector } from '@/store';
import { postActions } from '@/store/post';
import { testActions } from '@/store/test';
import { AppTypes } from '@/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Autocomplete, Box, Button, Dialog, DialogTitle, Divider, FormControl, Grid2, TextField, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
dayjs.extend(customParseFormat);


interface FormData {
  name: string;
  desc: string;
  endTime: Date;
  endDate: Date;
  numberParticipants: number;
  questions: AppTypes.Test['questions'];
  target: AppTypes.Test['target'];
}
const defaultValues: FormData = {
  name: '',
  desc: '',
  endTime: new Date(),
  endDate: new Date(),
  numberParticipants: 0,
  questions: [],
  target: 0
}
interface EditSectionProps {
  open: boolean;
  onClose: () => void;
  // onConfirm?: () => void;
  location?: string;
  postId: string;
}
const EditSection = ({ open, onClose, location, postId }: EditSectionProps) => {
  const dispatch = useDispatch();
  const { testByPostId } = useSelector(state => state.test)
  const { postById, loading } = useSelector(state => state.post)
  const { control, handleSubmit, formState: { errors }, reset, getValues } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(
      yup.object().shape({
        name: yup.string().required("Name of the post is required"),
        desc: yup.string().required("Description is required"),
        endTime: yup.date().required("End time is required"),
        endDate: yup.date().required("End date is required"),
        numberParticipants: yup.number().required("Number of participants is required"),
        questions: yup.array().of(
          yup.object().shape({
            question: yup.string().required("Question is required"),
            options: yup.array().of(
              yup.object().shape({
                id: yup.string().required("Option ID is required"),
                text: yup.string().required("Option text is required")
              })
            ).required(),
            correctOption: yup.string().required("Correct option is required")
          })
        ).required(),
        target: yup.number().required("Target is required")
      })
    )
  })
  useEffect(() => {
    if (postId) {
      dispatch(postActions.getPostById(postId))
      if (location === 'Online') {
        dispatch(testActions.getTestByPostId({ postId }))
      }
    }
  }, [postId, location, dispatch])

  useEffect(() => {
    if (postById && testByPostId?.questions) {
      reset({
        name: postById.name || '',
        desc: postById.desc || '',
        endTime: dayjs(postById.endTime, "hh:mm A").toDate(),
        endDate: postById.endDate ? new Date(postById.endDate) : new Date(),
        numberParticipants: postById.numberParticipants || 0,
        questions: testByPostId?.questions?.map((question: AppTypes.Question) => {
          return {
            question: question.question,
            options: question.options.map((option) => {
              return {
                id: option.id,
                text: option.text
              }
            }),
            correctOption: question.correctOption
          }
        }),
        target: testByPostId.target || 0
      })
    }
  }, [postById, testByPostId, reset])

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  }
  const handleConfirm = async () => {
    const data = getValues();
    const { name, desc, endTime, endDate, numberParticipants, questions, target } = data;
    const updatedPostData: AppTypes.UpdatedPostData = {
      name,
      desc,
      endTime: dayjs(endTime).format("hh:mm A"),
      endDate: dayjs(endDate).format("YYYY-MM-DD"),
      numberParticipants
    }
    const updatedTestData: AppTypes.UpdatedTestData = {
      questions,
      target
    }
    const form: AppTypes.UpdatePostRequest = {
      postId,
      updatedPostData,
      updatedTestData,
      location: location || ''
    }
    const result = await dispatch(postActions.updatePost(form))
    if (result.meta.requestStatus === 'fulfilled') {
      handleClose && handleClose();
    }
  }

  return (
    <Dialog onClose={handleClose} open={open} sx={{
      '& .MuiDialog-paper': {
        maxWidth: '80%',
        padding: '20px'
      }
    }}>
      <DialogTitle textAlign='center'>Edit post</DialogTitle>
      <Box>
        <form noValidate>
          <Grid2 container rowGap={4} columnGap={2} justifyContent='space-between'>
            <Grid2 size={{
              md: 12,
              xs: 6
            }}>
              <FormControl fullWidth>
                <Controller
                  name='name'
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label='Name'
                      value={field.value}
                      onChange={field.onChange}
                      error={Boolean(errors.name)}
                      placeholder='Enter the name of the post'
                    />
                  )}
                />
              </FormControl>
            </Grid2>

            <Grid2 size={12}>
              <FormControl fullWidth>
                <Controller
                  name='desc'
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label='Description'
                      rows={2}
                      value={field.value}
                      onChange={field.onChange}
                      error={Boolean(errors.desc)}
                      placeholder='Enter the description of the post'
                    />
                  )}
                />
              </FormControl>
            </Grid2>

            <Grid2 size={{ md: 5, xs: 12 }}>
              <FormControl fullWidth>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Controller
                    name='endDate'
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        label='End Date'
                        value={field.value ? dayjs(field.value) : null}
                        onChange={(date) => field.onChange(date)}
                      />
                    )}
                  />
                </LocalizationProvider>
              </FormControl>
            </Grid2>
            <Grid2 size={{ md: 5, xs: 12 }}>
              <FormControl fullWidth>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Controller
                    name='endTime'
                    control={control}
                    render={({ field }) => (
                      <TimePicker
                        label='End Time'
                        value={field.value ? dayjs(field.value) : null}
                        onChange={(time) => field.onChange(time)}
                      />
                    )}
                  />
                </LocalizationProvider>
              </FormControl>
            </Grid2>
            <Grid2 size={12}>
              <FormControl fullWidth>
                <Controller
                  name='numberParticipants'
                  control={control}
                  render={({ field }) => (
                    <TextField
                      type='number'
                      label='Number of Participants'
                      value={field.value}
                      onChange={field.onChange}
                      error={Boolean(errors.numberParticipants)}
                      placeholder='Enter the number of participants'
                    />
                  )}
                />
              </FormControl>
            </Grid2>
          </Grid2>

          {location === 'Online' && (
            <>
              <Divider sx={{ my: 4 }} />
              <Typography variant='h6' mb={4}>Test Details</Typography>
              <Grid2 container rowGap={2}>
                <Grid2 size={3}>
                  <FormControl>
                    <Controller
                      name='target'
                      control={control}
                      render={({ field }) => (
                        <TextField
                          label='Target'
                          type='number'
                          value={field.value}
                          onChange={field.onChange}
                          error={Boolean(errors.target)}
                          placeholder='Enter the target (number of questions needed to pass)'
                        />
                      )}
                    />
                  </FormControl>
                </Grid2>
                <Grid2 size={12}>
                  <FormControl fullWidth>
                    <Controller
                      name='questions'
                      control={control}
                      render={({ field }) => {
                        return (
                          <>
                            {Array.isArray(field.value) && field.value.length > 0 ? (
                              field.value.map((question, index) => (
                                <div key={index} style={{ marginBottom: '28px' }}>
                                  <Box>
                                    <TextField
                                      label={`Question ${index + 1}`}
                                      value={question.question}
                                      onChange={(e) => {
                                        const updatedQuestions = [...field.value];
                                        updatedQuestions[index].question = e.target.value;
                                        field.onChange(updatedQuestions);
                                      }}
                                      error={Boolean(errors.questions?.[index]?.question)}
                                      placeholder="Enter the question"
                                      fullWidth
                                    />
                                  </Box>

                                  {/* Render Options */}
                                  <Box sx={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    justifyContent: 'space-between',
                                    my: 2
                                  }}>
                                    {question.options.map((option, optionIndex) => (
                                      <div key={optionIndex}>
                                        <TextField

                                          label={option.id}
                                          value={option.text}
                                          onChange={(e) => {
                                            const updatedQuestions = [...field.value];
                                            updatedQuestions[index].options[optionIndex].text = e.target.value;
                                            field.onChange(updatedQuestions);
                                          }}
                                          error={Boolean(errors.questions?.[index]?.options?.[optionIndex]?.text)}
                                          placeholder={`Enter Option ${optionIndex + 1}`}
                                          style={{ marginRight: '8px', maxWidth: '300px' }}
                                        />
                                      </div>
                                    ))}
                                  </Box>

                                  <Box>
                                    <Autocomplete
                                      options={question.options}
                                      getOptionLabel={(option) => option.id}
                                      value={question.options.find((option) => option.id === question.correctOption) || null}
                                      onChange={(e, value) => {
                                        const updatedQuestions = [...field.value];
                                        updatedQuestions[index].correctOption = value?.id || '';
                                        field.onChange(updatedQuestions);
                                      }}
                                      renderInput={(params) => (
                                        <TextField
                                          {...params}
                                          label="Correct Option"
                                          error={Boolean(errors.questions?.[index]?.correctOption)}
                                          placeholder="Select the correct option"
                                        />
                                      )}
                                    />
                                  </Box>
                                </div>

                              ))
                            ) : (
                              ""
                            )}
                          </>
                        );
                      }}
                    />
                  </FormControl>
                </Grid2>
              </Grid2>
            </>

          )}
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 6,
            mt: 4
          }}>
            <Button variant='contained' sx={{
              bgcolor: '#f44336'
            }} onClick={handleClose}>Cancel</Button>
            <LoadingButton variant='contained' sx={{
              width: 'fit-content',
              backgroundColor: 'green',
            }}
              loading={loading[postActions.updatePost.typePrefix]}
              onClick={handleConfirm}
            >Update</LoadingButton>
          </Box>
        </form>
      </Box>
    </Dialog >
  )
}

export default EditSection