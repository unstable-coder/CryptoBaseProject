import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as Chartjs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

Chartjs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Chart = (props) => {
  let prices = [];
  let date = [];
  for (let i = 0; i < props.Data.length; i++) {
    if (props.days === "24h") {
      const time = new Date(props.Data[i][0]);
      const hours = time.getHours().toString().padStart(2, "0");
      const minutes = time.getMinutes().toString().padStart(2, "0");
      date.push(`${hours}:${minutes}`);
     
    } else {
      date.push(new Date(props.Data[i][0]).toLocaleDateString());
      
    }
    prices.push(props.Data[i][1]);
   
  }
  const data = {
    labels: date,
    datasets: [
      {
        label: "Prices",
        data: prices,
        backgroundColor: "black",
        borderColor: "red",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Price Chart",
        font: {
          size: 16,
        },
      },
      legend: {
        display: true,
        position: "bottom",
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 12,
          },
          maxTicksLimit: 10,
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          font: {
            size: 12,
          },
        },
        grid: {
          display: true,
          color: "rgba(0, 0, 0, 0.1)",
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default Chart;
