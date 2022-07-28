import React from 'react'
import {
    Card,
    CardHeader,
    CardActions,
    Table,
    TableHead,
    TableRow,
    TableBody,
    TableCell,TablePagination
} from "@mui/material";

/* const rows = [
    { bookingID: 1, mentorName: "ABC", fTime: "13:30:00", tTime: "15:00:00", studentrName: "SMK" },
    { bookingID: 2, mentorName: "ABC", fTime: "13:30:00", tTime: "15:00:00", studentrName: "SMK" },
      { bookingID: 3, mentorName: "ABC", fTime: "13:30:00", tTime: "15:00:00", studentrName: "SMK" }
 ];*/

export const BookingTable = () => {
    const [rows, setRows] = React.useState([]);

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
        fetch('http://localhost:5000/getBookingTable')
            .then(response => response.json())
            .then((data) => setRows(data))
    }, [])
    return (
        <Card className="card-style-mentor">
            <CardHeader title="Bookings Table" style={{ textAlign: 'left', marginLeft: '20px', marginBottom: '-1rem' }} />
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
                    {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item) => {
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
    )
}
