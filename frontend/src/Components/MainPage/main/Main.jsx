import {React,useEffect, useState} from "react";
import { Outlet } from 'react-router-dom'
import { Rsidebar } from "../Rsidebar/Rsidebar";
import {Navbar} from "../navbar/Navbar";
import './main.css'

const Main = () => {
  
  return (
    <section id="mainpage">
      <Navbar />
      <div id="main-wrapper">
       <Rsidebar/>
        <div className="main-cont">
          <Outlet/>
        </div>
      </div>
    </section>
  );
};

export default Main;
