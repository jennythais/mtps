"use client"
import { useDispatch, useSelector } from '@/store'
import { userActions } from '@/store/me'
import { Avatar, Box, Divider, MenuItem, MenuList, Stack, Typography } from '@mui/material'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import HomeIcon from '@mui/icons-material/Home';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import CreateIcon from '@mui/icons-material/Create';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';


type Navigation = {
     segment: string;
     title: string;
     icon: JSX.Element;
}
const Navbar = () => {

     const dispatch = useDispatch();
     const { user } = useSelector((state) => state.me);

     useEffect(() => {
          dispatch(userActions.getUser());
     }, [dispatch]); 

     const pathname = usePathname().split('/')[1];
     console.log(pathname);
     const Nav: Navigation[] = [
          {
               segment: '/',
               title: 'Home',
               icon: <HomeIcon />,
          },
          ...(user?.role === 'assistant' ? [
               {
                    segment: '/update-discipline-point',
                    title: 'Update Discipline Point',
                    icon: <AutorenewIcon />,
               },
               {
                    segment: '/create-post', // Sửa lỗi chính tả
                    title: 'Create Post',
                    icon: <CreateIcon />,
               }
          ] : []),
          {
               segment: '/profile',
               title: 'Profile',
               icon: <PersonIcon />,
          },
          {
               segment: '/logout',
               title: 'Logout',
               icon: <LogoutIcon />,
          },
     ];


     return (
          <Box sx={{
               height: '100vh',
               maxWidth: '350px',
               borderRight: '1px solid'
          }}>
               <Box>
                    <Box sx={{
                         display: 'flex',
                         gap: 2,
                         alignItems: 'center',
                         p: 2
                    }}>
                         <Avatar sx={{
                              width: '70px',
                              height: '70px',
                         }} />
                         <Stack direction="column" spacing={0.5}>
                              <Typography variant="h6">{user?.name}</Typography>
                              <Typography variant="body2">{user?.email}</Typography>
                              <Typography variant="body2">{user?.facultyName}</Typography>
                         </Stack>
                    </Box>
                    <Divider />
                    <MenuList sx={{
                         display: 'flex',
                         flexDirection: 'column',
                         gap: 3,
                         mt: 4,
                         mx: 2
                    }}>
                         {Nav.map((item, index) => (
                              <MenuItem key={index} sx={{
                                   bgcolor: pathname === item?.segment.split('/')[1] ? '#CBDCEB' : 'transparent',
                                   borderRadius: '10px',
                              }}>
                                   <Link href={item?.segment} passHref>
                                        <Stack direction="row" spacing={1} alignItems="center">
                                             {item?.icon}
                                             <Typography variant="h6">{item?.title}</Typography>
                                        </Stack>
                                   </Link>
                              </MenuItem>
                         ))}
                    </MenuList>
               </Box>
          </Box>
     );
}

export default Navbar;
