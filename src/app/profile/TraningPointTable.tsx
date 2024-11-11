import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect, useState } from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useDispatch, useSelector } from '@/store';
import { userActions } from '@/store/me';
type Props = {
  name: string;
  point: number;
}

const TraningPointTable = () => {
  const [open, setOpen] = useState(false)
  const { user, userPoint } = useSelector((state) => state.me)
  const dispatch = useDispatch()
  // useEffect(() => {
  //   if (user) {
  //     dispatch(userActions.getPoint({ id: user?.id }))
  //   }
  // }, [])
  return (
    <TableContainer>
      <Table aria-label='collapsible-table'>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Category</TableCell>
            <TableCell>Point</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <IconButton
                aria-label='expand row'
                size='small'
                onClick={() => setOpen(!open)}
              >
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </TableCell>
            <TableCell>Academic</TableCell>
            <TableCell>{}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TraningPointTable