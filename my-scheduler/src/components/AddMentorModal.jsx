import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  TextField,
  InputLabel,
  Alert,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
export const AddMentorModal = ({ open, handleClose,modalVisible,responseAdd,handleResponseAdd }) => {
  const [name, setName] = React.useState("");
  const [fTime, setFtime] = React.useState(new Date());
  const [tTime, settTime] = React.useState(new Date());

  // const [responseAdd, setResponseAdd] = React.useState([]);
  // const [modalVisible, setModalVisible] = React.useState(false);

  // const showModal = () => {
  //   setModalVisible(true);
  //   setTimeout(() => {
  //     setModalVisible(false);
  //   }, 3000);
  // };

  const handleChange = (newValue) => {
    setFtime(newValue);
  };
  const handleChange1 = (newValue) => {
    settTime(newValue);
  };
  //console.log((fTime.getHours()+':'+fTime.getMinutes()+':'+'00').toString());

  const data = {
    "name": name,
    "tfrom": (
      (fTime.getHours() < 10 ? `0${fTime.getHours()}` : fTime.getHours()) +
      ":" +
      (fTime.getMinutes() < 10
        ? `0${fTime.getMinutes()}`
        : fTime.getMinutes()) +
      ":" +
      "00"
    ).toString(),
    "tto": (
      (tTime.getHours() < 10 ? `0${tTime.getHours()}` : tTime.getHours()) +
      ":" +
      (tTime.getMinutes() < 10
        ? `0${tTime.getMinutes()}`
        : tTime.getMinutes()) +
      ":" +
      "00"
    ).toString(),
  };
  const handleMentorAdd = (e) => {
    e.preventDefault();
    //console.log(JSON.stringify(body));
    fetch("http://localhost:5000/addMentorSlot", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => handleResponseAdd(data));
      console.log(responseAdd)
    //showModal();
    handleClose();
  };
  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth="xl">
        <DialogTitle>Add Mentor</DialogTitle>
        <div className="addMentorForm">
          <form style={{ marginLeft: "5rem" }}>
            <InputLabel id="demo-simple-select-label-mentor">Name</InputLabel>
            <TextField
              name="mentor_name"
              labelId="demo-simple-select-label-mentor"
              label=""
              required={true}
              autoComplete="off"
              variant="outlined"
              color="primary"
              style={{ paddingTop: "10px" }}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <InputLabel id="select-from-time">From Time</InputLabel>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <TimePicker
                labelId="select-from-time"
                label=""
                value={fTime}
                onChange={handleChange}
                renderInput={(params) => (
                  <TextField {...params} style={{ paddingTop: "10px" }} />
                )}
              />
            </LocalizationProvider>
            <InputLabel id="select-to-time">To Time</InputLabel>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <TimePicker
                labelId="select-to-time"
                label=""
                value={tTime}
                onChange={handleChange1}
                style={{ paddingTop: "10px" }}
                renderInput={(params) => (
                  <TextField {...params} style={{ paddingTop: "10px" }} />
                )}
              />
            </LocalizationProvider>
          </form>
          <DialogActions style={{ marginTop: "1rem" }}>
            <button onClick={handleMentorAdd}>Add</button>
            {/* {modalVisible && (
              <Dialog open={modalVisible} maxWidth="xs">
                <div>
                  {response.status ? (
                    <Alert severity="success">{response.msg}</Alert>
                  ) : (
                    <Alert severity="error">{response.msg}</Alert>
                  )}
                </div>
              </Dialog>
            )} */}
            <button onClick={handleClose}>Cancel</button>
          </DialogActions>
        </div>
      </Dialog>
    </>
  );
};
