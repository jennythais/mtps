import { Box, Card, CardContent, CardHeader, Skeleton, Stack, Typography } from '@mui/material'
import React from 'react'

const LoadingPost = () => {
  return (
    <div className='flex flex-col justify-center items-center pt-8 gap-2'>
      {[...Array(3)].map((_, i) => (
        <Card key={i} sx={{ marginBottom: 2, width: '80%', borderRadius: '20px' }}>
          <CardHeader
            avatar={<Skeleton variant="circular" width={60} height={60} />}
            title={<Skeleton width="80%" />}
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
            subheader={<Skeleton width="60%" />}
          />
          <CardContent>
            <Box sx={{ mb: 2 }}>
              <Typography variant='h6'>
                <Skeleton width="60%" />
              </Typography>
              <Typography variant='body1'>
                <Skeleton width="80%" />
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Stack direction='row' alignItems='center' spacing={2}>
                <Skeleton variant="circular" width={20} height={20} />
                <Skeleton width="30%" />
              </Stack>
              <Stack direction='row' alignItems='center' spacing={2}>
                <Skeleton variant="circular" width={20} height={20} />
                <Skeleton width="40%" />
              </Stack>
              <Stack direction='row' alignItems='center' spacing={2}>
                <Skeleton variant="circular" width={20} height={20} />
                <Skeleton width="40%" />
              </Stack>
              <Stack direction='row' alignItems='center' spacing={2}>
                <Skeleton variant="circular" width={20} height={20} />
                <Skeleton width="40%" />
              </Stack>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <Skeleton variant="rectangular" width="15%" height={36} />
            </Box>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default LoadingPost