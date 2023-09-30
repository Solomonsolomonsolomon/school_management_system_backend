
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

const labels = ['Jan', 'Feb', 'Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

export const data = {
  labels,
  datasets: [
   
      {
        fill: true,
        label: 'Earnings',
        data: [0,0,0,0,0,0,0,0,0,0,0,0,],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderWidth:1
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
