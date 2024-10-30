import { FormHelperText } from "@mui/material"
import { FieldError } from "react-hook-form"

type Props = {
     error: FieldError | string
}
const ErrorMessage = ({ error }: Props) => {
     if (!error) return <></>
     return (
          <FormHelperText sx={{ color: 'error.main' }} id='error-field'>
               {typeof error === 'string' ? error : error.message}
          </FormHelperText>
     )
}
export default ErrorMessage