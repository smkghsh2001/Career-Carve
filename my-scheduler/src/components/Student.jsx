import React from "react";
import {
  Card,
  TextField,
  CardHeader,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";

const Student = () => {
  return (
    <Card className="Student">
      <CardHeader title="Student" style={{textAlign:'left',marginLeft:'20px'}}/>
      <form className="form-student">
        <div>
          <TextField
            name="mentor_name"
            label="Select Preferred Mentor"
            required={true}
            autoComplete="off"
            variant="outlined"
            color="primary"
            style={{marginTop:'1rem'}}
          />
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
    </Card>
  );
};

export default Student;
