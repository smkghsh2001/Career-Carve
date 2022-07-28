import React from "react";
import {
  Card,
  TextField,
  CardHeader,
  Select,
  MenuItem,
  InputLabel,
  CardActions,
  Dialog,
  Alert,
} from "@mui/material";

//const mentor_name=["ABC","XYZ","QWERTY"];
const Student = () => {
  const [mentorNames, setMentorNames] = React.useState([]);

  const [student_name, setStudentName] = React.useState("");
  const [mentor_name, setMentorName] = React.useState("");
  const [duration, setDuration] = React.useState("");
  const [response, setResponse] = React.useState([]);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalVisible1, setModalVisible1] = React.useState(false);
  const [response1, setResponse1] = React.useState([]);

  const showModal = () => {
    setModalVisible(true);
  };

  const showModal1 = () => {
    setModalVisible(false);
    setModalVisible1(true);
    setTimeout(() => {
      setModalVisible1(false);
    }, 3000);
  };

  React.useEffect(() => {
    fetch("http://localhost:5000/getMentorNames")
      .then((response) => response.json())
      .then((data) => setMentorNames(data));
  }, []);

  const handleClear = () => {
    setStudentName("");
    setMentorName("");
    setDuration("");
  };
  const data = {
    name: student_name,
    mname: mentor_name,
    duration: duration.toString(),
  };
  const handleBook = () => {
    console.log(JSON.stringify(data));
    fetch("http://localhost:5000/tryBooking", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((res) => setResponse(res));

    showModal();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(JSON.stringify(data));
    fetch("http://localhost:5000/paymentClick", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((res) => setResponse1(res));

      showModal1();
  };
  return (
    <>
      <Card className="card-style-student">
        <CardHeader
          title="Mentor Booking"
          style={{ textAlign: "left", marginLeft: "20px" }}
        />
        <form className="form-student">
          <div>
            <InputLabel id="demo-simple-select-label-student">
              Student Name
            </InputLabel>
            <TextField
              name="student_name"
              labelId="demo-simple-select-label-student"
              label=""
              required={true}
              autoComplete="off"
              variant="outlined"
              color="primary"
              value={student_name}
              onChange={(e) => setStudentName(e.target.value)}
            />
          </div>
          <div>
            <InputLabel id="demo-simple-select-label-mentor">
              Mentor Name
            </InputLabel>
            <Select
              labelId="demo-simple-select-label-mentor"
              label="Mentor Name"
              value={mentor_name}
              onChange={(e) => setMentorName(e.target.value)}
              style={{ minWidth: "200px", marginBottom: "20px" }}
            >
              <MenuItem value={""}>None</MenuItem>
              {mentorNames.map((item) => {
                return <MenuItem value={item}>{item}</MenuItem>;
              })}
            </Select>
          </div>
          <div>
            <InputLabel id="demo-simple-select-label">Duration</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              label="Duration"
              style={{ minWidth: "120px", marginBottom: "20px" }}
            >
              <MenuItem value={30}>30</MenuItem>
              <MenuItem value={45}>45</MenuItem>
              <MenuItem value={60}>60</MenuItem>
            </Select>
          </div>
        </form>
        <CardActions>
          <button onClick={handleBook}>Book</button>
          <button onClick={handleClear}>Clear</button>
        </CardActions>
      </Card>
      <Dialog open={modalVisible} maxWidth="xs">
        <div>
          {response.status && (
            <>
              <h5>
                You will have to pay {response.payCost} for your slot booking
              </h5>
              <button onClick={handleSubmit}>Proceed</button>
              <Dialog open={modalVisible1} maxWidth="xs">
                <div>
                  {response1.status ? (
                    <Alert severity="success">{response1.msg}</Alert>
                  ) : (
                    <Alert severity="error">{response1.msg}</Alert>
                  )}
                </div>
              </Dialog>
              <button onClick={() => setModalVisible(false)}>Cancel</button>
            </>
          )}
        </div>
      </Dialog>
    </>
  );
};

export default Student;
