import React from "react";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

Chart.register(ArcElement, Tooltip, Legend);
const StudentDoughnutChart = ({ Records }) => {
  const data = {
    labels: (Records ?? []).map((rec) => rec.name),
    datasets: [
      {
        label: "Students",
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

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    layout: {
      padding: 0,
    },

    plugins: {
      legend: {
        display: false,
      },
    },
  };
  return (
    <div
      className="doughnut-chart d-flex align-items-center"
      style={{ height: "100px", width: "100px" }}
    >
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default StudentDoughnutChart;
