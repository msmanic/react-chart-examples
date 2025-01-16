import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TooltipItem,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-date-fns";
import { format } from "date-fns";
import { sampleData } from "../data";
import { numberFormatter } from "../constants";

ChartJS.register(
  CategoryScale,
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function Chartjs2Demo() {
  return (
    <div>
      <h2>React chartjs 2 Demo</h2>
      <Line
        options={{
          scales: {
            x: {
              type: "time",
              time: {
                tooltipFormat: "dd T",
              },
              ticks: {
                font: {
                  size: 8,
                },
              },
              grid: {
                display: false,
              },
            },
            y: {
              ticks: {
                font: {
                  size: 10,
                },
              },
            },
          },
          responsive: true,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              displayColors: false,
              titleColor: "#2d3748",
              bodyColor: "#2d3748",
              padding: 10,
              backgroundColor: "white",
              cornerRadius: 10,
              callbacks: {
                title: (context) => {
                  return context[0].dataset.label;
                },
                label: (context) => {
                  return `${format(
                    new Date(context.parsed.x),
                    "MMM d"
                  )} | ${numberFormatter.format(context.parsed.y)}`;
                },
              },
            },
          },
        }}
        data={{
          datasets: [
            {
              label: "Page Visit",
              backgroundColor: "#8884d8",
              borderColor: "#8884d8",
              data: sampleData.pageVisit.map((item) => ({
                x: item.date,
                y: item.value,
              })),
            },
            {
              label: "Widget Load",
              backgroundColor: "#82ca9d",
              borderColor: "#82ca9d",
              data: sampleData.widgetLoad.map((item) => ({
                x: item.date,
                y: item.value,
              })),
            },
          ],
        }}
      />
    </div>
  );
}
