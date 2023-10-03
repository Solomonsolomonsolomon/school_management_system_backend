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

import React from "react";
import axios from "../../../api/axios";
import Loading from "../../Loading";

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

 const options = {
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

const transactionUrl = "/transaction";
export default function EarningChart() {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [label, setLabel] = React.useState<number[]>([]);
  
  React.useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        let res = await axios.get(`${transactionUrl}/monthly`);
        setLabel(res?.data?.label);
      } catch (error) {
        setLabel([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  if (loading) return <Loading />;
  
const data = {
  labels,
  datasets: [
    {
      fill: false,
      label: "Earnings",
      data: label,
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgb(53, 162, 235)",
      tension: 0.4,
    },
    {
      fill: false,
      label: "Expenses",
      data: [0,0,0,0,0,0,0,0,0,0,0,0,],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgb(255, 99, 132)",
      tension: 0.4,
    },
  ],
};
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
