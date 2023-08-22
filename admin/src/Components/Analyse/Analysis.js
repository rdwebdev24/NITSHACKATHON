import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import './Analysis.css'
// import { PieChart } from 'react-minimal-pie-chart';
import PieChart from 'react-pie-graph-chart';

const Analysis = () => {
     const [total,setTotal] = useState(0)
     const [bioTotal,setbioTotal] = useState(4)
     const [nonBioTotal,setnonBioTotal] = useState(8)
     const [recycle,setrecycle] = useState(7)
     const [nonRecycle,setnonRecycle] = useState(5)
     useEffect(()=>{
          const url = "http://localhost:5000/data";
          fetch(url, {
            method: "GET",
            headers: {
              "Access-Control-Allow-Origin": "*",
            },
         })
         .then((res) => res.json())
         .then((data) => {
          const weightArr = data.data
          let total=0;
          let bio=0;
          let non_bio=0;
          let re=0;
          let no_re=0;
          for(let i=0; i<weightArr.length;i++){
               total+=Number(weightArr[i].weight)
               if(weightArr[i].biodegradable=="yes"){
                    bio++;
               }
               if(weightArr[i].non_biodegradable=="yes"){
                    non_bio++;
               }
               if(weightArr[i].recyclable=="yes"){
                    re++;
               }
               if(weightArr[i].non_recyclable=="yes"){
                    no_re++;
               }
          }
          setTotal(total)
          setbioTotal(bio)
          setnonBioTotal(non_bio)
          setrecycle(re)
          setnonRecycle(no_re)
          console.log(re,no_re,bioTotal,nonBioTotal);
          })
          .catch((err) => console.log(err));
     })
  return (
    <div className='analysisWrapper'>
          <div className="analysisInfo">
               <h3>Total weight of waste : {total}kg</h3>
          </div>
          <div className="chartInfo">
          <PieChart data={[
                    {
                         type: "biodegradable",
                         value: bioTotal,
                         color: "#E97D30"
                    },
                    {
                         type: "non-biodegradable",
                         value: nonBioTotal,
                         color: "#62B170"
                    },
                    ]} />
          <PieChart data={[
                    {
                         type: "recyclable",
                         value: recycle,
                         color: "#0ab4a9"
                    },
                    {
                         type: "non-recyclable",
                         value: nonRecycle,
                         color: "#dc3545"
                    },
                    ]} />
          </div>
    </div>
  )
}

export default Analysis
