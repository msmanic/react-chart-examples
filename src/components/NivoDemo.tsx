import { ResponsiveLine } from "@nivo/line";
import { format } from "date-fns";
import { sampleData } from "../data";
import { convertToTitleCase, numberFormatter } from "../constants";

export function NivoDemo() {
  return (
    <div>
      <h2>Nivo Demo</h2>
      <div style={{ width: "100%", height: "400px" }}>
        <ResponsiveLine
          margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
          axisBottom={{
            format: (value) => {
              return format(value, "MMM d");
            },
            tickValues: "every 1 day",
          }}
          axisLeft={{
            format: (value) => {
              return numberFormatter.format(value);
            },
          }}
          curve="linear"
          data={[
            {
              id: "pageVisit",
              color: "#8884d8",
              data: sampleData.pageVisit.map((datum) => ({
                x: new Date(datum.date),
                y: datum.value,
              })),
            },
            {
              id: "widgetLoad",
              color: "#82ca9d",
              data: sampleData.widgetLoad.map((datum) => ({
                x: new Date(datum.date),
                y: datum.value,
              })),
            },
          ]}
          theme={{
            axis: {
              ticks: {
                text: {
                  fontSize: "8px",
                },
              },
            },
          }}
          xScale={{
            precision: "millisecond",
            type: "time",
            useUTC: false,
          }}
          yFormat=" >-$d"
          yScale={{
            type: "linear",
          }}
          tooltip={({ point }) => {
            return (
              <div className="custom-tooltip">
                <div>{convertToTitleCase(point.serieId.toString())}</div>
                <div>
                  {format(point.data.x, "MMM d")} | {point.data.y.toString()}
                </div>
              </div>
            );
          }}
          useMesh
          pointColor={{ from: "color" }}
        />
      </div>
    </div>
  );
}
