import React, { useEffect } from "react";
import axios from "../../../api/axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: false,
  plugins: {
    legend: {
      position: "top" as const,
      align: "start" as const,
      labels: {
        usePointStyle: true,
        pointStyle: "line",
      },
    },
    LinearScale: {
      display: true,
      position: "left",
      grid: {
        drawOnChartArea: false,
      },
    },
  },
};

const labels = ["Earnings", "Expense"];

const POST_URL = "/transaction";
export default function EarningsTOExpense() {
  let [ratio, setRatio] = React.useState<number[]>([0, 0]);
  useEffect(() => {
    let controller = new AbortController();
    inner();
    async function inner() {
      try {
        let genderDivideResponse = await axios.get(
          `${POST_URL}/ratio/earnings/expense`,
          {
            signal: controller.signal,
          }
        );
        setRatio(genderDivideResponse?.data?.ratio);
      } catch (error: any) {
        console.error(error);
      } finally {
      }
    }
    return () => {
      controller.abort();
    };
  }, []);

  const data = {
    labels,
    label: "",
    datasets: [
      {
        fill: false,
        label: "",
        data: ratio,
        borderColor: ["rgb(11, 27, 76)", "rgb(186,44,58)"],
        backgroundColor: ["rgba(11,27,76, 0.5)", "rgb(186,44,58,0.5)"],
      },
    ],
  };
  return (
    <Doughnut
      options={options}
      data={data}
      style={{
        width: "100%",
        height: "100%",
      }}
    />
  );
}
