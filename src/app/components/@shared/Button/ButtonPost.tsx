import { Button } from '@mui/material'
import React from 'react'
type Props = {
     label: string
}
const ButtonPost = ({ label }: Props) => {
     return (
          <Button variant='contained' sx={{
               '&.MuiButtonBase-root': {
                    bgcolor: '#347928'
               }
          }}>
               {label === 'Online' ? 'Take test' : 'Join activity'}
          </Button>
     )
}

export default ButtonPost