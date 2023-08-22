import React, { useEffect, useState } from 'react'
import { getToken } from '../../../utilities/getToken';
import {AiFillEye} from 'react-icons/ai'
import {Loader} from '../../loader/Loader'
import {Button} from '@mui/material'
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import trash from '../../../assets/trash.png'
import NoContro from '../../../assets/NoContro.gif'
import './Contribution.css'
import axios from 'axios'
import { useGlobalContext } from '../../../context/Context';

export const Contribution = () => {
  const {url} = useGlobalContext();
  const [contribution,setContribution] = useState([]);
  const [loading,setLoading] = useState(false);
  const [singleContribution,setSingleContribution] = useState({});

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

  const fetchContribution = async () => {
    const userId = getToken();
    try {
      setLoading(true);
      const {data} = await axios.get(`${url}/waste/${userId}`)
      if(data.status==500){alert(data.status);return;}
      setContribution(data.data);
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    } catch (error) {alert(error.message);setLoading(false);return;}
  }

  useEffect(()=>{
    fetchContribution();
  },[])


  return (
    <div id='contribution-wrapper'>
        <h1>Your contributions</h1>
        <div className="contribution-cont">
          {loading?<SkeletonComponent/>
          :!loading && contribution.length==0
          ?<div style={{diaplay:"flex"}}>
            <img src={NoContro} alt="no contribution gif"/>
            <h3 style={{color:"#555"}}>No contribution Yet ☹️</h3>
          </div>
          :contribution.map((item,index)=>{
            const dateTimeString = item.createdAt
            const dateTime = new Date(dateTimeString);
            const date = dateTime.toLocaleDateString(); // Extract the date
            return (
              <div key={index} className="cont-items">
                <img src={trash} alt="trash" />
                <div className="date-view">
                  <span style={{fontSize:"0.9rem"}} >{date}</span>
                  <span style={{fontSize:"1.5rem",cursor:"pointer"}}
                  onClick={()=>{
                    setSingleContribution(contribution[index]);
                    document.querySelector('.single-cont-item').style.display = 'flex'
                    document.querySelector('body').style.backgroundColor = 'rgba(0,0,0,0.3)'
                  }}
                  ><AiFillEye/></span>
                </div>
              </div> 
            )
          })}
        </div>
        <div className="single-cont-item">
            <img className='single-cont-img' src="https://images.unsplash.com/photo-1562077981-4d7eafd44932?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2FzdGV8ZW58MHx8MHx8fDA%3D&w=1000&q=80" alt="image" /> 
            <div> <b> <span>Nature : </span></b> <span>{singleContribution?.nature}</span> </div>
            <div> <b> <span>Duration : </span></b> <span>{singleContribution?.duration}</span> </div>
            <div> <b> <span>Weight : </span> </b><span>{singleContribution?.weight}</span> </div>
            <div> <b> <span>location : </span> </b><span>{singleContribution?.location}</span> </div>
            <div> <b> <span>description : </span> </b><span>{singleContribution?.description}</span> </div>
            <div> <b> <span>biodegradable : </span> </b><span>{singleContribution?.biodegradable?"yes":"no"}</span> </div>
            <div> <b> <span>non_biodegradable : </span> </b><span>{singleContribution?.non_biodegradable?"yes":"no"}</span> </div>
            <div> <b> <span>recyclable : </span> </b><span>{singleContribution?.recyclable?"yes":"no"}</span> </div>
            <Close/>
        </div>
    </div>
  )
}

const SkeletonComponent = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row',gap:'1rem',flexWrap:'wrap' }}>
      <Skeleton variant="rounded" width={150} height={200} />
      <Skeleton variant="rounded" width={150} height={200} />
      <Skeleton variant="rounded" width={150} height={200} />
      <Skeleton variant="rounded" width={150} height={200} />
      <Skeleton variant="rounded" width={150} height={200} />
      <Skeleton variant="rounded" width={150} height={200} />
    </div>
  )
}

const Close = () => {
  return (
      <Button
      variant="contained"
      component="label"
      onClick={()=>{
        document.querySelector('.single-cont-item').style.display = 'none'
        document.querySelector('body').style.backgroundColor = ''
      }}
      >
      close
      <input
          type="submit"
          hidden
      />
   </Button>
  )
}