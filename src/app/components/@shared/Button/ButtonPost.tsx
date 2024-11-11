import { Button } from '@mui/material'
import React from 'react'
type Props = {
     label: string
     onClick?: () => void;
     joined: boolean;
}
const ButtonPost = ({ label, onClick, joined }: Props) => {
     const handleClick = () => {
          if (onClick) {
               onClick()
          }
     }
     return (
          <Button variant='contained' sx={{
               '&.MuiButtonBase-root': {
                    bgcolor: joined ? '#B7B7B7' : '#347928',
                    cursor: joined ? 'not-allowed' : 'pointer',
               }
          }} onClick={handleClick} disabled={joined}>
               {joined ? 'Joined' : (label === 'Online' ? 'Take test' : 'Join activity')}
          </Button>
     )
}


export default ButtonPost