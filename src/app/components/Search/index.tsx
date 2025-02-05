import { AppTypes } from '@/types'
import { Faculty } from '@/utils/faculty'
import { Autocomplete, Box, TextField } from '@mui/material'
import React from 'react'

const SearchByFaculty = () => {
  return (
    <Box>
      <Autocomplete
        multiple
        options={Object.values(Faculty)}
        getOptionLabel={(option: AppTypes.Faculty) => option.name}
        renderInput={(params) => (
          <TextField {...params} label="Search by faculty" />
        )}
      />
    </Box>
  )
}

export default SearchByFaculty