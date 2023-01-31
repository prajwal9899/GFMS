import React from "react";
import { useEffect } from "react";
import fireDB from "./../../../firebase/Firebase";
import { useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const Homepage = () => {
  const [data, setData] = useState({});
  const [male, setMale] = useState({});
  const [female, setFemale] = useState(0);
  useEffect(() => {
    fireDB.child("goat-test").on("value", (snapshot) => {
      console.log(snapshot,'sna');
      
      if (snapshot.val() !== null) {
        setData({ ...snapshot.val() });
        const Male = Object.keys(snapshot.val()).filter((item) => {
          return snapshot.val()[item].gender === "Male";
        });
        setMale(Male.length);

        const Female = Object.keys(snapshot.val()).filter((item) => {
          return snapshot.val()[item].gender === "Female";
        });
        setFemale(Female.length);
      } else {
        setData({});
      }
    });
  }, []);
 

  const chartData = {
    labels: ["Male", "Female"],
    datasets: [
      {
        data: [male, female],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  console.log(data,'val');

  return (
    <div style={{ width: "300px" }}>
      <Doughnut data={chartData} />
    </div>
  );
};

export default Homepage;
