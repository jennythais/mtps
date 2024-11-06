import { Avatar } from '@mui/material';
import React from 'react'

type Props = {
     name: string;
     width?: number;
     height?: number;
}
function stringToColor(string: string) {
     let hash = 0;
     let i;
     for (i = 0; i < string.length; i += 1) {
          hash = string.charCodeAt(i) + ((hash << 5) - hash);
     }
     let color = '#';
     for (i = 0; i < 3; i += 1) {
          const value = (hash >> (i * 8)) & 0xff;
          color += `00${value.toString(16)}`.slice(-2);
     }
     return color;
}
function getAbbreviation(name: string) {
     return name
          .split(" ")
          .map(word => word[0])
          .join("")
          .toUpperCase();
}
const AvatarColor = ({ name, width, height }: Props) => {
     return (
          <Avatar sx={{ bgcolor: stringToColor(name), width: width, height: height }}>
               {getAbbreviation(name)}
          </Avatar>
     )
}

export default AvatarColor