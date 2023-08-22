import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { BiLogOutCircle } from "react-icons/bi";
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import './navbar.css'
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav id="navbar">
      <a className="navbar-brand ms-3 text-white" href="#">Greenits</a>
      <div className="profile-cont">
          <Profile/>
      </div>
    </nav>
  );
};



const Profile = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {setAnchorEl(event.currentTarget)};
  const handleClose = () => {setAnchorEl(null)};

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div style={{cursor:"pointer",fontSize:"1.3rem",color:"#fff"}}>
      <FaUserCircle onClick={handleClick}/>
      <Popover
        style={{cursor:"pointer"}}
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
       
      >
        <Typography
         onClick={()=>{
          localStorage.setItem('active',JSON.stringify('request'));
          localStorage.removeItem('greenitsToken');
          navigate('/login')
        }} sx={{ p: 2 }}> <BiLogOutCircle/> Logout</Typography>
      </Popover>
    </div>
  );
}