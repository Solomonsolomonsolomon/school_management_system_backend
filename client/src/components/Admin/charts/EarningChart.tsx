import {
  Chart as ChartJS,
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const options = {
  responsive: true,

  plugins: {
    legend: {
      position: "top" as const,
      align: "start" as const,
      labels: {
        usePointStyle: true,
        pointStyle: "circle",
      },
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
let arr=[0,0,0,0,0,0,0,0,0,0,0,0,]
arr[8]=2000000
export const data = {
  labels,
  datasets: [
    {
      fill: false,
      label: "Dataset 2",
      data: arr,
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgb(53, 162, 235)",
      tension: 0.4,
    },
    {
      fill: false,
      label: "Dataset 1",
      data: [0,0,0,0,0,0,0,0,0,0,0],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgb(255, 99, 132)",
      tension: 0.4,
    },
  ],
};

export default function EarningChart() {
  return (
    <Line
      options={options}
      data={data}
      style={{
        width: window.innerWidth / 1.5,
        height: window.innerWidth / 1.6,
      }}
    />
  );
}
