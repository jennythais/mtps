import { Skeleton, Stack } from '@mui/material';
import React from 'react'

const LoadingInfor = () => {
     return (
          <Stack direction="row" spacing={2} alignItems="center">
               <Skeleton variant="circular" width={70} height={70} />

               <Stack direction="column" spacing={1}>
                    <Skeleton variant="text" width={120} height={24} />

                    <Skeleton variant="text" width={160} height={20} />

                    <Skeleton variant="text" width={140} height={20} />
               </Stack>
          </Stack>
     );
}

export default LoadingInfor