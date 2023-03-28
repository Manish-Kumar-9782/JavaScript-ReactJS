import React from "react";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const options = {
  indexAxis: "y",
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "right",
      display: false,
    },
    title: {
      display: true,
      text: "Top 5 Issued Students",
    },
  },
};

const StudentBarChart = ({ Records }) => {
  const data = {
    labels: (Records ?? []).map((rec) => rec.name),
    datasets: [
      {
        label: "Book Issued",
        data: (Records ?? []).map((rec) => rec.totalBookIssued),
        borderColor: "white",
        backgroundColor: [
          "#A1B57D",
          "#FF8FB1",
          "#B270A2",
          "#7A4495",
          "#96CEB4",
        ],
      },
    ],
  };

  return (
    <div style={{ height: "150px" }}>
      <Bar options={options} data={data} />;
    </div>
  );
};

export default StudentBarChart;
