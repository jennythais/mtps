import { useDispatch, useSelector } from '@/store'
import { postActions } from '@/store/post'
import { Autocomplete, Box, MenuItem, TextField } from '@mui/material'
import React from 'react'
const category = [
      {
            value: 'all',
            label: 'All'
      },
      {
            value: 'academic',
            label: 'Academic'
      },
      {
            value: 'volunteer',
            label: 'Volunteer'
      },
      {
            value: 'mentalPhysical',
            label: 'Mental & Physical'
      },
]
const FilterSection = () => {
      const dispatch = useDispatch()
      const { posts } = useSelector((state) => state.post)
      const handleFilter = (value: string[]) => {
            if (value.length === 0 || value.includes('all')) {
                  if (posts) {
                        dispatch(postActions.setPostFilter(posts))
                  }
            } else {
                  dispatch(postActions.getPostByCategory(value))
            }
      }
      return (
            <Box>
                  <Autocomplete
                        sx={{
                              display: 'flex',
                              margin: '0 auto',
                              width: '80%',
                              '& .MuiAutocomplete-inputRoot': {
                                    fontFamily: 'var(--font-montserrat)',
                              },
                        }}

                        multiple
                        options={category}
                        getOptionLabel={(option) => option.label}
                        onChange={(event, value) => {
                              const selectedCategories = value.map((option) => option.value)
                              if (selectedCategories.includes('all')) {
                                    handleFilter(['all'])
                              } else {
                                    handleFilter(selectedCategories)
                              }
                        }}
                        renderInput={(params) => (
                              <TextField
                                    sx={{
                                          '& .MuiTextField-root': {
                                                fontFamily: 'var(--font-montserrat)'
                                          }
                                    }}
                                    {...params}
                                    variant='outlined'
                                    label='Category'
                              />
                        )}
                  />
            </Box>
      )
}

export default FilterSection