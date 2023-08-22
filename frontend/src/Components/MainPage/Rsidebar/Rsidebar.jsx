import React, { useEffect, useState } from "react";
import {IoIosSend} from 'react-icons/io'
import {PiHandshakeFill} from 'react-icons/pi'
import { Link, useNavigate } from "react-router-dom";
import './Rsidebar.css';

export const Rsidebar = () => {
  const [active,setActive] = useState(localStorage.getItem('active')?localStorage.getItem('active'):'request');
  const navigate = useNavigate();
  useEffect(()=>{
    const a = localStorage.getItem('active')
    setActive(JSON.parse(localStorage.getItem('active')))
  })
  return (
    <div className="rightSidebar">
       <ul>
        <li className={`${active=='request'?'active':''}`} onClick={()=>{
            setActive('request');
            localStorage.setItem('active',JSON.stringify('request'))
            navigate('request')
          }}> <span>Request</span> <span><IoIosSend/></span></li>
          <li className={`${active=='contribution'?'active':''}`}  onClick={()=>{
            setActive('contribution');
            localStorage.setItem('active',JSON.stringify('contribution'))
            navigate('contribution')
          }}> <span>Contribution</span> <span><PiHandshakeFill/></span> </li>
       </ul>
    </div>
  );
};
