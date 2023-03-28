import React from "react";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
// import faker from "faker";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const StudentLineChart = ({ Records }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,

    layout: {
      padding: 0,
    },

    scales: {
      x: {
        // for x-Axes only
        display: false, // hiding the x axis ticks.
      },
      y: {
        // for y-Axes only
        display: false, // hiding the y axis ticks.
      },
    },

    plugins: {
      legend: {
        display: false,
        position: "top",
      },
      title: {
        display: false,
        text: "Student Registration Record",
      },
    },
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: "Registered Students",
        data: Records,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        tension: 0.5, // for smooth corners.,
      },
    ],
  };

  return (
    <div
      style={{
        height: "50px",
      }}
    >
      <Line options={options} data={data} />;
    </div>
  );
};

export default StudentLineChart;
