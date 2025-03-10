import { useDispatch, useSelector } from '@/store';
import { postActions } from '@/store/post';
import { AppTypes } from '@/types';
import { formatDateTime } from '@/utils/formatDateTime';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, Card, CardContent, CardHeader, IconButton, Menu, MenuItem, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import AvatarColor from '../@shared/avatar/AvatarColor';
import ButtonPost from '../@shared/Button/ButtonPost';
import ChipCategory from '../@shared/chip/ChipCategory';
import LoadingPost from '../Loading/LoadingPost';
import CheckAttendees from './CheckAttendees';
import DialogConfirm from './DialogConfirm';
import EditSection from './EditSection';
const PostPage = () => {
     const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
     const [showDialog, setShowDialog] = useState(false)
     const [showEditSection, setShowEditSection] = useState(false)
     const [showCheckAttendees, setShowCheckAttendees] = useState(false)
     const { posts, postFilter, loading, postsAssistant } = useSelector((state) => state.post)
     const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
     const [selectedPostToEdit, setSelectedPostToEdit] = useState<string | null>(null);
     const [selectedPostToCheck, setSelectedPostToCheck] = useState<string | null>(null);
     const [location, setLocation] = useState<string | null>(null);
     const [joined, setJoined] = useState<string[]>([])
     const { user } = useSelector((state) => state.me)
     const dispatch = useDispatch()
     useEffect(() => {
          switch (user?.role) {
               case 'assistant':
                    dispatch(postActions.getPostAssistant())
                    break;
               case 'student':
                    dispatch(postActions.getPost())
                    break;
               default:
                    break;
          }
     }, [user])
     const open = Boolean(anchorEl);
     const handleClick = (event: React.MouseEvent<HTMLElement>, postId: string, location: string) => {
          setAnchorEl(event.currentTarget);
          setSelectedPostToEdit(postId);
          setSelectedPostToCheck(postId);
          setLocation(location);
     }
     const handleClose = () => {
          setAnchorEl(null);
     }
     const handleCloseDialog = () => {
          setShowDialog(false)
     }
     const handleCloseEditSection = () => {
          setShowEditSection(false)
     }
     const handleOpenDialog = (postId: string | null) => {
          setSelectedPostId(postId);
          setShowDialog(true);
     }
     const handleConfirm = (postId: string) => {
          if (user) {
               dispatch(postActions.joinPost({ studentId: user.id, postId: postId }))
          }
     }
     useEffect(() => {
          if (user && posts) {
               const joinedPosts = posts
                    .filter((post: AppTypes.Post) => post?.stdJoin?.some((std) => std === user.id))
                    .map((post) => post.id);
               setJoined(joinedPosts);
          }
     }, [user, posts])
     const dataDisplay = user?.role === 'student'
          ? (Array.isArray(postFilter) && postFilter.length === 0 ? posts : postFilter)
          : (postsAssistant ? [...postsAssistant].sort((a) => (a.facultyName === user?.facultyName ? -1 : 1)) : []);
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
                                                  user?.role === 'assistant' && item.facultyName === user.facultyName && (
                                                       <IconButton
                                                            id='button-post'
                                                            aria-controls={open ? 'action-menu' : undefined}
                                                            aria-haspopup="true"
                                                            aria-expanded={open ? 'true' : undefined}
                                                            onClick={(e) => {
                                                                 e.stopPropagation();
                                                                 handleClick(e, item.id, item.location);
                                                            }}
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
                                                  <Typography variant='body1' sx={{
                                                       fontStyle: 'italic',
                                                  }}>{item?.desc}</Typography>
                                             </Box>
                                             <Box sx={{
                                                  display: 'flex',
                                                  flexDirection: 'column',
                                                  gap: 2
                                             }}>
                                                  <Stack direction='row' alignItems='center' spacing={1}>
                                                       <Typography sx={{ fontSize: '16px', fontWeight: 500 }}>Number of participants: </Typography>
                                                       <Typography sx={{ fontSize: '16px' }}>{item?.numberParticipants}</Typography>
                                                  </Stack>
                                                  <Stack direction='row' alignItems='center' spacing={1}>
                                                       <Typography sx={{ fontSize: '16px', fontWeight: 500 }}>Location: </Typography>
                                                       <Typography sx={{ fontSize: '16px' }}>{item?.location}</Typography>
                                                  </Stack>
                                                  <Stack direction='row' alignItems='center' spacing={1}>
                                                       <Typography sx={{ fontSize: '16px', fontWeight: 500 }}>Start at: </Typography>
                                                       <Typography sx={{ fontSize: '16px' }}>
                                                            {formatDateTime(item?.startAt)}
                                                       </Typography>
                                                  </Stack>
                                                  <Stack direction='row' alignItems='center' spacing={1}>
                                                       <Typography sx={{ fontSize: '16px', fontWeight: 500 }}>Finish at: </Typography>
                                                       <Typography sx={{ fontSize: '16px' }}>
                                                            {formatDateTime(item?.endAt)}
                                                       </Typography>
                                                  </Stack>
                                             </Box>
                                             {user?.role === 'student' && (
                                                  <Box sx={{
                                                       display: 'flex',
                                                       justifyContent: 'center',
                                                       mt: 2
                                                  }}>
                                                       <ButtonPost label={item?.location} onClick={item?.location === 'Online' ? undefined : () => handleOpenDialog(item?.id)} joined={joined.includes(item.id)} />
                                                  </Box>
                                             )}
                                        </CardContent>
                                   </Card>
                              ))}
                              <Menu
                                   id='action-menu'
                                   anchorEl={anchorEl}
                                   open={open}
                                   onClose={handleClose}
                                   MenuListProps={{ 'aria-labelledby': 'button-post' }}
                              >
                                   <MenuItem onClick={() => { setShowEditSection(true); handleClose(); }}>Edit</MenuItem>
                                   {location !== 'Online' && (
                                        <MenuItem onClick={() => { setShowCheckAttendees(true); handleClose(); }}>Check attendees</MenuItem>
                                   )}
                              </Menu>
                              <DialogConfirm open={showDialog} onClose={handleCloseDialog} onConfirm={() => selectedPostId && handleConfirm(selectedPostId)}
                              />
                              <EditSection open={showEditSection} onClose={handleCloseEditSection} postId={selectedPostToEdit || ''} location={location || ''} />
                              <CheckAttendees open={showCheckAttendees} onClose={() => setShowCheckAttendees(false)} postId={selectedPostToCheck || ''} />
                         </Box>


                    </>
               )
               }
          </>
     )
}

export default PostPage