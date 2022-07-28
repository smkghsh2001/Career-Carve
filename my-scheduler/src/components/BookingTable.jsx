import React from 'react'
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

// const rows = [
//     { bookingID: 1, mentorName: "ABC", fTime: "13:30:00", tTime: "15:00:00", studentrName: "SMK" },
//     { bookingID: 2, mentorName: "ABC", fTime: "13:30:00", tTime: "15:00:00", studentrName: "SMK" },
//     { bookingID: 3, mentorName: "ABC", fTime: "13:30:00", tTime: "15:00:00", studentrName: "SMK" }
// ];

export const BookingTable = () => {
    const [rows, setRows] = React.useState([]);

    React.useEffect(() => {
        fetch('http://localhost:5000/getBookingTable')
            .then(response => response.json())
            .then((data) => setRows(data))
    }, [])
    console.log('Soumik');
    return (
        <Card className="card-style-mentor">
            <CardHeader title="Bookings Table" style={{ textAlign: 'left', marginLeft: '20px', marginBottom: '-1.5rem' }} />
            <Table style={{ maxWidth: '500px' }}>
                <TableHead>
                    <TableRow>
                        <TableCell>Mentor Name</TableCell>
                        <TableCell>Student Name</TableCell>
                        <TableCell>From Time</TableCell>
                        <TableCell>To Time</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((item) => {
                        return (
                            <TableRow key={item.bookingID}>
                                <TableCell>{item.mentorName}</TableCell>
                                <TableCell>{item.studentrName}</TableCell>
                                <TableCell>{item.fTime}</TableCell>
                                <TableCell>{item.tTime}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </Card>
    )
}
