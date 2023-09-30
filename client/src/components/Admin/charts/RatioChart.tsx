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

const labels = ["Boys", "Girls"];

const POST_URL = "/admin";
export default function DoughnutChart() {
  let [ratio, setRatio] = React.useState<number[]>([0, 0]);
  useEffect(() => {
    let controller = new AbortController();
    inner();
    async function inner() {
      try {
        let genderDivideResponse = await axios.get(
          `${POST_URL}/gender/divide`,
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
        fill: true,
        label: "",
        data: ratio,
        borderColor: ["rgb(53, 162, 235)", "rgb(255, 99, 132)"],
        backgroundColor: ["rgba(53, 162, 235, 0.5)", "rgb(255, 99, 132)"],
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
