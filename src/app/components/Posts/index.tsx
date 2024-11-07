import { useDispatch, useSelector } from '@/store';
import { postActions } from '@/store/post';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import GroupsIcon from '@mui/icons-material/Groups';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, Card, CardContent, CardHeader, IconButton, Menu, MenuItem, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import AvatarColor from '../@shared/avatar/AvatarColor';
import ButtonPost from '../@shared/Button/ButtonPost';
import ChipCategory from '../@shared/chip/ChipCategory';
import Loading from '../Loading/LoadingPost';
import LoadingPost from '../Loading/LoadingPost';
const PostPage = () => {
     const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
     const { posts, postFilter, loading } = useSelector((state) => state.post)
     const { user } = useSelector((state) => state.me)
     const dispatch = useDispatch()
     useEffect(() => {
          dispatch(postActions.getPost())

     }, [])
     const open = Boolean(anchorEl);
     const handleClick = (event: React.MouseEvent<HTMLElement>) => {
          setAnchorEl(event.currentTarget);
     }
     const handleClose = () => {
          setAnchorEl(null);
     }
     const dataDisplay = Array.isArray(postFilter) && postFilter.length === 0 ? posts : postFilter
     return (
          <>
               {loading[postActions.getPost.typePrefix] ? (<LoadingPost />) : (
                    <>
                         <Box sx={{
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'center',
                              alignItems: 'center',
                              pt: 4,
                              gap: 2
                         }}>
                              {dataDisplay?.map((item) => (
                                   <Card key={item.id} sx={{ marginBottom: 2, width: '80%', borderRadius: '20px' }}>
                                        <CardHeader
                                             avatar={
                                                  <AvatarColor name={item?.facultyName} width={60} height={60} />
                                             }
                                             title={item?.facultyName}

                                             action={
                                                  user?.role === 'assistant' && (
                                                       <IconButton id='button-post' aria-controls={open ? 'action-menu' : undefined} aria-haspopup="true"
                                                            aria-expanded={open ? 'true' : undefined} onClick={handleClick}
                                                       >
                                                            <MoreVertIcon />
                                                       </IconButton>
                                                  )
                                             }
                                             sx={{
                                                  '& .MuiCardHeader-title': {
                                                       fontSize: '18px',
                                                  },
                                                  '& .MuiCardHeader-content': {
                                                       display: 'flex',
                                                       flexDirection: 'column',
                                                       gap: 1
                                                  }
                                             }}
                                             subheader={
                                                  <ChipCategory category={item?.category} />
                                             }
                                        />
                                        <CardContent>
                                             <Box sx={{
                                                  mb: 2
                                             }}>
                                                  <Typography variant='h6'>{item?.name}</Typography>
                                                  <Typography variant='body1'>{item?.desc}</Typography>
                                             </Box>
                                             <Box sx={{
                                                  display: 'flex',
                                                  flexDirection: 'column',
                                                  gap: 2
                                             }}>
                                                  <Stack direction='row' alignItems='center' spacing={2}>
                                                       <GroupsIcon />
                                                       <Typography variant='body2'>{item?.numberParticipants}</Typography>
                                                  </Stack>
                                                  <Stack direction='row' alignItems='center' spacing={2}>
                                                       <LocationOnIcon />
                                                       <Typography variant='body2'>{item?.location}</Typography>
                                                  </Stack>
                                                  <Stack direction='row' alignItems='center' spacing={2}>
                                                       <AccessTimeIcon />
                                                       <Typography variant='body2'>{item?.startTime} - {item?.endTime}</Typography>
                                                  </Stack>
                                                  <Stack direction='row' alignItems='center' spacing={2}>
                                                       <CalendarMonthIcon />
                                                       <Typography variant='body2'>{item?.startDate} - {item?.endDate}</Typography>
                                                  </Stack>
                                             </Box>
                                             <Box sx={{
                                                  display: 'flex',
                                                  justifyContent: 'center',
                                                  mt: 2
                                             }}>
                                                  <ButtonPost label={item?.location} />
                                             </Box>
                                        </CardContent>
                                   </Card>
                              ))}
                         </Box>
                         <Menu id='action-menu' anchorEl={anchorEl} open={open} onClose={handleClose} MenuListProps={{
                              'aria-labelledby': 'button-post',
                         }}>
                              <MenuItem>Edit</MenuItem>
                         </Menu>
                    </>
               )}
               {/* <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    pt: 4,
                    gap: 2
               }}>
                    {dataDisplay?.map((item) => (
                         <Card key={item.id} sx={{ marginBottom: 2, width: '80%', borderRadius: '20px' }}>
                              <CardHeader
                                   avatar={
                                        <AvatarColor name={item?.facultyName} width={60} height={60} />
                                   }
                                   title={item?.facultyName}

                                   action={
                                        user?.role === 'assistant' && (
                                             <IconButton id='button-post' aria-controls={open ? 'action-menu' : undefined} aria-haspopup="true"
                                                  aria-expanded={open ? 'true' : undefined} onClick={handleClick}
                                             >
                                                  <MoreVertIcon />
                                             </IconButton>
                                        )
                                   }
                                   sx={{
                                        '& .MuiCardHeader-title': {
                                             fontSize: '18px',
                                        },
                                        '& .MuiCardHeader-content': {
                                             display: 'flex',
                                             flexDirection: 'column',
                                             gap: 1
                                        }
                                   }}
                                   subheader={
                                        <ChipCategory category={item?.category} />
                                   }
                              />
                              <CardContent>
                                   <Box sx={{
                                        mb: 2
                                   }}>
                                        <Typography variant='h6'>{item?.name}</Typography>
                                        <Typography variant='body1'>{item?.desc}</Typography>
                                   </Box>
                                   <Box sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 2
                                   }}>
                                        <Stack direction='row' alignItems='center' spacing={2}>
                                             <GroupsIcon />
                                             <Typography variant='body2'>{item?.numberParticipants}</Typography>
                                        </Stack>
                                        <Stack direction='row' alignItems='center' spacing={2}>
                                             <LocationOnIcon />
                                             <Typography variant='body2'>{item?.location}</Typography>
                                        </Stack>
                                        <Stack direction='row' alignItems='center' spacing={2}>
                                             <AccessTimeIcon />
                                             <Typography variant='body2'>{item?.startTime} - {item?.endTime}</Typography>
                                        </Stack>
                                        <Stack direction='row' alignItems='center' spacing={2}>
                                             <CalendarMonthIcon />
                                             <Typography variant='body2'>{item?.startDate} - {item?.endDate}</Typography>
                                        </Stack>
                                   </Box>
                                   <Box sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        mt: 2
                                   }}>
                                        <ButtonPost label={item?.location} />
                                   </Box>
                              </CardContent>
                         </Card>
                    ))}
               </Box>
               <Menu id='action-menu' anchorEl={anchorEl} open={open} onClose={handleClose} MenuListProps={{
                    'aria-labelledby': 'button-post',
               }}>
                    <MenuItem>Edit</MenuItem>
               </Menu> */}
          </>
     )
}

export default PostPage