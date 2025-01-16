import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { add, differenceInCalendarDays, format } from "date-fns";
import { numberFormatter } from "../constants";
import { sampleData } from "../data";

const getTicks = (startDate: Date, endDate: Date) => {
  const diffDays = differenceInCalendarDays(endDate, startDate);

  let current = startDate;

  const ticks = [startDate.getTime()];

  for (let i = 1; i < diffDays; i++) {
    current = add(current, { days: 1 });
    ticks.push(current.getTime());
  }

  ticks.push(endDate.getTime());
  return ticks;
};

const startDate = new Date(2024, 9, 31);
const endDate = new Date(2024, 11, 1);
const ticks = getTicks(startDate, endDate);

export function RechartsDemo() {
  return (
    <div>
      <h2>Recharts demo</h2>
      <ResponsiveContainer width="100%" height={600}>
        <LineChart
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis
            dataKey="date"
            scale="time"
            type="number"
            domain={[startDate.getTime(), endDate.getTime()]}
            tickFormatter={(v) => {
              if (v === startDate.getTime()) return "";
              return format(new Date(v), "MMM d");
            }}
            ticks={ticks}
            tick={{ fontSize: "8px", color: "#003760" }}
            allowDuplicatedCategory={false}
          />
          <YAxis
            tickFormatter={(v) => {
              if (v) return numberFormatter.format(v);
              return "";
            }}
            tick={{ fontSize: "10px", color: "#003760" }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line
            name="Page Visit"
            type="linear"
            data={sampleData.pageVisit}
            dataKey="value"
            stroke="#8884d8"
            strokeWidth={2}
            legendType="none"
          />
          <Line
            name="Widget Load"
            type="linear"
            data={sampleData.widgetLoad}
            dataKey="value"
            stroke="#82ca9d"
            strokeWidth={2}
            legendType="none"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

type CustomTooltipProps = {
  active?: boolean;
  payload?: any;
  label?: any;
};

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <div>{payload[0].name}</div>
        <div>
          {format(new Date(parseInt(payload[0].payload.date)), "MMM d")} |{" "}
          {payload[0].payload.value}
        </div>
      </div>
    );
  }
}
