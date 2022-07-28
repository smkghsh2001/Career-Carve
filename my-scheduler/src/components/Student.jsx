import React from "react";
import {
  Card,
  TextField,
  CardHeader,
  Select,
  MenuItem,
  InputLabel,
  CardActions
} from "@mui/material";

const mentor_name=["ABC","XYZ","QWERTY"];
const Student = () => {
  return (
    <Card className="card-style-student">
      <CardHeader title="Mentor Booking" style={{textAlign:'left',marginLeft:'20px'}}/>
      <form className="form-student">
        <div>
        <InputLabel id="demo-simple-select-label-student">Student Name</InputLabel>
          <TextField
            name="student_name"
            labelId="demo-simple-select-label-student"
            label=""
            required={true}
            autoComplete="off"
            variant="outlined"
            color="primary"
          />
        </div>
        <div>
          <InputLabel id="demo-simple-select-label-mentor">Mentor Name</InputLabel>
          <Select labelId="demo-simple-select-label-mentor" label="Mentor Name" style={{minWidth:'200px',marginBottom:'20px'}}>
            <MenuItem value={""}>None</MenuItem>
            {mentor_name.map((item)=>{
              return <MenuItem value={item}>{item}</MenuItem>
            })}
          </Select>
        </div>
        <div>
          <InputLabel id="demo-simple-select-label">Duration</InputLabel>
          <Select labelId="demo-simple-select-label" label="Duration" style={{minWidth:'120px',marginBottom:'20px'}}>
            <MenuItem value={30}>30</MenuItem>
            <MenuItem value={45}>45</MenuItem>
            <MenuItem value={60}>60</MenuItem>
          </Select>
        </div>
      </form>
      <CardActions>
        <button>
          Book
        </button>
        <button>
          Clear
        </button>
      </CardActions>
    </Card>
  );
};

export default Student;
