import React from "react";
import { useEffect } from "react";
import fireDB from "./../../../firebase/Firebase";
import { useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const Homepage = () => {
  const [data, setData] = useState({});
  useEffect(() => {
    fireDB.child("goat-test").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setData({ ...snapshot.val() });
      } else {
        setData({});
      }
    });
  }, []);

  const filterData = () => {
    const res = Object.keys(data).filter((item) => {
      return data[item].gender === "Female";
    });
    console.log(res, "res");
  };

  filterData();
  const chartData = {
    labels: ['Red', 'Green', 'Yellow'],
    datasets : [{
      data :[30,34,90,76],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
    
      hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
    }]
  }
 


  return (
    <div style={{width:'300px'}}>
      <Doughnut data={chartData}/>
    </div>
  );
};

export default Homepage;
