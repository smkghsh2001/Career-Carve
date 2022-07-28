import React from "react";
import {
  Card,
  CardHeader,
  CardActions,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@mui/material";
import { AddMentorModal } from "./AddMentorModal";
// const rows = [
//   { mentorID: 1, mentorName: "ABC", fTime: "13:30:00", tTime: "15:00:00" },
//   { mentorID: 2, mentorName: "ABC", fTime: "13:30:00", tTime: "15:00:00" },
//   { mentorID: 3, mentorName: "ABC", fTime: "13:30:00", tTime: "15:00:00" },
// ];
const MentorTable = () => {
  const [rows, setRows] = React.useState([]);
  const [open,setOpen]=React.useState(false);

  React.useEffect(() => {
    fetch('http://localhost:5000/getMentorTable')
    .then(response=>response.json())
    .then((data)=>setRows(data))
  },[])

  return (
    <Card className="card-style-mentor">
      <CardHeader title="Mentor Table" style={{ textAlign: 'left', marginLeft: '20px', marginBottom: '-1.5rem' }} />
      <button style={{ marginLeft: '-25rem',marginTop:'1rem' }} onClick={()=>setOpen(true)}>Add Mentor</button>
      {open && <AddMentorModal open={open} handleClose={()=>setOpen(false)}/>}
      <Table style={{ maxWidth: '500px' }}>
        <TableHead>
          <TableRow>
            <TableCell>Mentor Name</TableCell>
            <TableCell>From Time</TableCell>
            <TableCell>To Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((item) => {
            return (
              <TableRow key={item.mentorID}>
                <TableCell>{item.mentorName}</TableCell>
                <TableCell>{item.fTime}</TableCell>
                <TableCell>{item.tTime}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Card>
  );
};

export default MentorTable;
