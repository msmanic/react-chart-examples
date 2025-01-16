import Highcharts, { AxisLabelsFormatterContextObject } from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { format } from "date-fns";
import { sampleData } from "../data";
import { numberFormatter } from "../constants";

export function HighchartsDemo() {
  const options = {
    title: "none",
    credits: {
      enabled: false,
    },
    xAxis: {
      type: "datetime",
      labels: {
        style: {
          fontSize: "8px",
        },
      },
      tickInterval: 24 * 3600 * 1000,
    },
    yAxis: {
      title: "none",
      labels: {
        formatter: (payload: AxisLabelsFormatterContextObject) => {
          return numberFormatter.format(payload.value as number);
        },
        style: {
          fontSize: "10px",
        },
      },
    },
    legend: "none",
    tooltip: {
      className: "custom-tooltip",
      formatter: function () {
        const point = this as any as Highcharts.Point;
        return `<span>${point.series.name}<br />${format(
          new Date(point.x),
          "MMM d"
        )} | ${numberFormatter.format(point.y as number)}</span>`;
      },
      style: {
        fontSize: "12px",
      },
    },
    plotOptions: {
      series: {
        marker: {
          enabled: false,
        },
      },
    },
    series: [
      {
        type: "line",
        name: "Page Visit",
        data: sampleData.pageVisit.map((item) => [item.date, item.value]),
      },
      {
        type: "line",
        name: "Widget Load",
        data: sampleData.widgetLoad.map((item) => [item.date, item.value]),
      },
    ],
  };

  return (
    <div>
      <h2>Highcharts Demo</h2>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}
