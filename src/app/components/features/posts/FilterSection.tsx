import { useDispatch, useSelector } from '@/store'
import { postActions } from '@/store/post'
import { Autocomplete, Box, MenuItem, TextField } from '@mui/material'
import React, { useEffect } from 'react'
import LoadingFilter from '../Loading/LoadingFilter'
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
      const { posts, postsAssistant } = useSelector((state) => state.post)
      const handleFilter = (value: string[]) => {
            if (value.length === 0 || value.includes('all')) {
                  if (posts || postsAssistant) {
                        dispatch(postActions.setPostFilter(posts ? posts : postsAssistant || []))
                  }
            } else {
                  dispatch(postActions.getPostByCategory(value))
            }
      }
      return (
            <>
                  <Box sx={{
                        width: '85%',
                  }}>
                        <Autocomplete
                              sx={{

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
            </>
      )
}

export default FilterSection