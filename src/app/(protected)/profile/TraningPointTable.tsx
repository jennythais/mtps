import { Box, Collapse, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useDispatch, useSelector } from '@/store';
import { userActions } from '@/store/me';
import { AppTypes } from '@/types';
import SearchByFaculty from '../components/Search';
type Props = {
  id: string;
  name: string
  point: AppTypes.PointCategory;
  activities?: string[];
}
interface TrainingPointProps {
  data?: AppTypes.Student[];
}
export const Row = ({ id, name, point }: Props) => {
  const [open, setOpen] = useState(false);
  console.log(point);
  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell sx={{ width: '50px' }}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {id}
        </TableCell>
        <TableCell component="th" scope="row">
          {name}
        </TableCell>
        <TableCell align="right">{point?.totalPoints || 0}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0, width: '100%' }} colSpan={3}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Details
              </Typography>
              <Table aria-label="purchases">
                <TableHead >
                  <TableRow >
                    <TableCell />
                    <TableCell>Date</TableCell>
                    <TableCell>Post/Activity</TableCell>
                    <TableCell align="right">Point</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell />
                    <TableCell component="th" scope="row">
                      2023-01-01
                    </TableCell>
                    <TableCell>Customer A</TableCell>
                    <TableCell align="right">50</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};
const TraningPointTable = (props: TrainingPointProps) => {
  const { data } = props
  console.log(data);
  const rows = [
    { id: 'Category A', name: 'ABC', point: 10 },
    { id: 'Category B', name: 'BDC', point: 20 },
  ];

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible-table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Student ID</TableCell>
              <TableCell>Student Name</TableCell>
              <TableCell >Total Point</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((student) => (
              <React.Fragment key={student?.id}>
                <Row name={student.name} point={student?.trainingPoint} activities={student?.activities} id={student?.id} />
              </React.Fragment>
            ))}


            {/* {rows.map((row) => (
              <React.Fragment key={row.name}>
                <Row name={row.name} point={row.point} id={row.id} />
              </React.Fragment>
            ))} */}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default TraningPointTable