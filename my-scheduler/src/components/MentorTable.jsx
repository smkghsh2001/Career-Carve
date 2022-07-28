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

const rows = [
  { mentorID: 1, mentorName: "ABC", fTime: "13:30:00", tTime: "15:00:00" },
  { mentorID: 2, mentorName: "ABC", fTime: "13:30:00", tTime: "15:00:00" },
  { mentorID: 3, mentorName: "ABC", fTime: "13:30:00", tTime: "15:00:00" },
];
const MentorTable = () => {
  return (
    <Card className="card-style-mentor">
        <CardHeader title="Mentor Table" style={{textAlign:'left',marginLeft:'20px',marginBottom:'-1.5rem'}}/>
      <button style={{marginLeft:'-88rem'}}>Add Mentor</button>
      <Table style={{maxWidth:'500px'}}>
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
