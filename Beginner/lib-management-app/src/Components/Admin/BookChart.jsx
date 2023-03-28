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
      text: "Top 5 Issued Books",
    },
  },
};

const BookChart = ({ Records }) => {
  const data = {
    labels: (Records ?? []).map((rec) => rec.title),
    datasets: [
      {
        label: "Books",
        data: (Records ?? []).map((rec) => rec.IssuedCounts),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <div style={{ height: "150px" }}>
      <Bar options={options} data={data} />;
    </div>
  );
};

export default BookChart;
