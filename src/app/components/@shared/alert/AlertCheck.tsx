import React from 'react'
import Alert from '@mui/material/Alert';
interface AlertProps {
     icon?: React.ReactNode;
     severity: 'success' | 'info' | 'warning' | 'error';
     label: string;
}
const AlertCheck = ({ icon, severity, label }: AlertProps) => {
     return (
          <Alert icon={icon} severity={severity}>
               {label}
          </Alert>
     )
}

export default AlertCheck