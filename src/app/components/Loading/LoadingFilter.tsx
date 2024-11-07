import { Skeleton } from '@mui/material'
import React from 'react'

const LoadingFilter = () => {
  return (
    <Skeleton className='flex m-auto' variant="rectangular" width="80%" height={46} />
  )
}

export default LoadingFilter