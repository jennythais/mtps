import { Chip } from '@mui/material'
import React from 'react'
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
type Props = {
     category: string;
}
const ChipCategory = ({ category }: Props) => {
     const color = category === 'academic' ? '#D76C82' : category === 'volunter' ? '#608BC1' : '#AB886D'
     return (
          <Chip label={category}
               icon={
                    <LocalOfferIcon
                         sx={{
                              width: '15px',
                              height: '15px',
                              '&.MuiSvgIcon-root': {
                                   color: 'white',
                              }
                         }}

                    />
               }
               sx={{
                    bgcolor: color,
                    color: 'white',
                    textTransform: 'capitalize',
               }}
          />
     )
}

export default ChipCategory