import React from "react";
import {
  Card,
  CardHeader,
  CardActions,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell, TablePagination
} from "@mui/material";
import { AddMentorModal } from "./AddMentorModal";
/*const rows = [
  { mentorID: 1, mentorName: "ABC", fTime: "13:30:00", tTime: "15:00:00" },
  { mentorID: 2, mentorName: "ABC", fTime: "13:30:00", tTime: "15:00:00" },
  { mentorID: 3, mentorName: "ABC", fTime: "13:30:00", tTime: "15:00:00" },
];*/
const MentorTable = () => {
  const [rows, setRows] = React.useState([]);
  const [open, setOpen] = React.useState(false);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(3);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  React.useEffect(() => {
    fetch('http://localhost:5000/getMentorTable')
      .then(response => response.json())
      .then((data) => setRows(data))
  }, [])

  return (
    <Card className="card-style-mentor">
      <div className="mentor-table-header">
        <CardHeader title="Mentor Table" style={{ textAlign: 'left', marginLeft: '20px', marginBottom: '-1.5rem' }} />
        <button style={{ marginLeft: '-25rem', marginTop: '1rem' }} onClick={() => setOpen(true)}>Add Mentor</button>
      </div>
      {open && <AddMentorModal open={open} handleClose={() => setOpen(false)} />}
      <Table style={{ maxWidth: '500px' }}>
        <TableHead>
          <TableRow>
            <TableCell>Mentor Name</TableCell>
            <TableCell>From Time</TableCell>
            <TableCell>To Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((item) => {
              return (
                <TableRow key={item.mentorID}>
                  <TableCell>{item.mentorName}</TableCell>
                  <TableCell>{item.fTime}</TableCell>
                  <TableCell>{item.tTime}</TableCell>
                </TableRow>
              );
            })}
        </TableBody>
        <TablePagination
          rowsPerPageOptions={[3]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Table>
    </Card>
  );
};

export default MentorTable;
