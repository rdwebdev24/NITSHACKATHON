import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {RiTaskFill} from 'react-icons/ri'
import { Button } from '@mui/material'
import './Landing.css'
import { Vission } from './Vission'
import { Footer } from './Footer'
import logo from './logo.jpeg'
const src = "https://upload.wikimedia.org/wikipedia/en/thumb/7/71/National_Institute_Of_Technology_Silchar_Logo.svg/1200px-National_Institute_Of_Technology_Silchar_Logo.svg.png"

const Landing = () => {
     const navigate = useNavigate();
  return (
  <>
     <div className="logo">
          <img src={logo}/>
     </div>
    <div className='LandingWrapper'>
     <div className='nitImage'>
          <img className='nitsImg' src={src} alt="image"/>
     </div>
     <div className="landingInfo">
          <h1>Welcome to</h1>
          <h5>GreenNITS </h5>
          <div className="signIn_signUp">
               <Button onClick={()=>navigate('/login')} variant="contained">sign In</Button>
               <Button onClick={()=>navigate('/register')} variant="contained">sign Up</Button>
          </div>
     </div>
    </div>
    <Vission/>
    <hr/>
    <Footer/>
  </>
  )
}

export default Landing
