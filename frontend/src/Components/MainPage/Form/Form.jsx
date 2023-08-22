import React, { useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import axios from 'axios'
import './Form.css'
import { useGlobalContext } from "../../../context/Context";

export const Form = () => {
  const formref = useRef();
  const {url} = useGlobalContext();
  const [loading,setLoading] = useState(false)
  
  const getToken = () => {
      const token = localStorage.getItem('greenitsToken'); // Replace 'token' with the actual key you used to store the token
      if(!token){alert('session expired login to continue');return;};
      try {
        const tokenParts = token.split(".");
        const decodedPayload = JSON.parse(atob(tokenParts[1]));
        return decodedPayload.user_id;
      } catch (error) {
        return ''
      }
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const Data = new FormData(e.currentTarget);
    const WasteData = {
       nature:Data.get('nature'),
       weight:Data.get('weight'),
       duration: Data.get('duration'),
       location: Data.get('location'),
       image:Data.get('image').name,
       description:Data.get('description'),
       userId:getToken()
     };


     try {
      setLoading(true)
      const {data} = await axios.post(url+'/waste',WasteData);
      if(data.status==400){alert(data.msg);return;};
      if(data.status==500){alert(data.msg);return;};
      alert('request sent')
      setLoading(false)
       formref.current.reset();
     } catch (error) {
      setLoading(false)
        alert(error.message)      
     }

  };
  return (
    <div id="formwrapper">
      <h1>Waste Management Form</h1>
      <form ref={formref} onSubmit={handleSubmit} id="form">
        <div className="form-left">
            <NatureOfWaste />
            <Duration />
            <UploadImage/>
            <Submit loading={loading}/>
        </div>
        <div className="form-right">
            <Weight />
            <Location />
            <Description/>
        </div>
      </form>
    </div>
  );
};

const NatureOfWaste = () => {
  return (
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Nature</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="nature"
          name="nature"
        >
          <MenuItem value="Plastics">Plastics</MenuItem>
          <MenuItem value="glass">glass</MenuItem>
          <MenuItem value="metal">metal</MenuItem>
          <MenuItem value="stationery">stationery</MenuItem>
          <MenuItem value="sewage">sewage</MenuItem>
          <MenuItem value="E-waste">E-waste</MenuItem>
          <MenuItem value="chemical waste">chemical waste</MenuItem>
          <MenuItem value="metal">metal</MenuItem>
          <MenuItem value="construction waste">construction waste</MenuItem>
          <MenuItem value="domestic waste">domestic waste</MenuItem>
        </Select>
      </FormControl>
  );
};

const Duration = () => {
  return (
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Duration</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="nature"
          name="duration"
        >
          <MenuItem value="less than a week">less than a week</MenuItem>
          <MenuItem value="less than a month">less than a month</MenuItem>
          <MenuItem value="more than 2-3 months">more than 2-3 months</MenuItem>
        </Select>
      </FormControl>
  );
};

const Weight = () => {
  return (
      <TextField
        name="weight"
        type="number"
        id="outlined-basic"
        label="Estimated weight"
        variant="outlined"
      />
  );
};

const Location = () => {
  return (
      <TextField name="location" id="outlined-basic"  label="Location" variant="outlined" />
  );
};

const Description = () => {
    return (
        <TextField name="description" id="outlined-basic" multiline rows={5} label="description" variant="outlined" />
    );
}

const UploadImage = () => {
    return (
        <Button
        variant="contained"
        component="label"
        >
        Upload File
        <input
            type="file"
            name="image"
            hidden
        />
     </Button>
    )
}

const Submit = ({loading}) => {
    return (
        <Button
        variant="contained"
        component="label"
        disabled={loading}
        >
        {loading?"Sending...":"Send"}
        <input
            type="submit"
            hidden
        />
     </Button>
    )
}