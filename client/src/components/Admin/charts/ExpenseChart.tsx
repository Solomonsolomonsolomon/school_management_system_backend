
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: false,
  plugins: {
    legend: {
      position: 'top' as const,
      align: 'start' as const,
      labels: {
        usePointStyle: true,
        pointStyle: 'line',
      }
    },
    LinearScale: {
        display: true,
        position: 'left',
        grid: {
            drawOnChartArea: false,

        },
        }
  },
};

const labels = ['January', 'February', 'March',];

export const data = {
  labels,
  datasets: [
    {
        fill: true,
        label: 'Dataset 2',
        data: [25, 59, 80, 81, 56, 55, 40],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        tension: 0.4,
      },
      {
        fill: true,
        label: 'Dataset 1',
        data: [10, 20, 30, 20, 50, 60, 70],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        tension: 0.4,
      }
  ],
};

export default function ExpenseChart() {
  return <Bar options={options}   
    data={data} 
    style={{ 
        width: "100%",
        height: "100%",
     }} />;
}
