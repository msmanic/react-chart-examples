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
import { useMemo, useState } from "react";

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

function getMaximumValue(data: { date: number; value: number }[]) {
  return data.reduce((res, cur) => {
    return Math.max(res, cur.value);
  }, 0);
}

export function RechartsDemo() {
  const height = 600;
  const maxY = useMemo(() => {
    const maxValue = Math.max(
      getMaximumValue(sampleData.pageVisit),
      getMaximumValue(sampleData.widgetLoad)
    );
    return Math.ceil(maxValue + maxValue / 10);
  }, [sampleData]);

  return (
    <div>
      <h2>Recharts demo</h2>
      <ResponsiveContainer width="100%" height={height}>
        <LineChart
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid vertical={false} />
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
            domain={[0, maxY]}
            tickFormatter={(v) => {
              if (v) return numberFormatter.format(v);
              return "";
            }}
            tick={{ fontSize: "10px", color: "#003760" }}
          />
          <Tooltip
            content={<CustomTooltip maxY={maxY} chartHeight={height} />}
            trigger="hover"
          />
          <Legend />
          <Line
            name="Page Visit"
            type="linear"
            data={sampleData.pageVisit}
            dataKey="value"
            stroke="#8884d8"
            strokeWidth={2}
            legendType="none"
            dot={false}
            tooltipType="none"
            isAnimationActive={false}
          />
          <Line
            name="Widget Load"
            type="linear"
            data={sampleData.widgetLoad}
            dataKey="value"
            stroke="#82ca9d"
            strokeWidth={2}
            legendType="none"
            dot={false}
            tooltipType="none"
            isAnimationActive={false}
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
  coordinate?: any;
  maxY: number;
  chartHeight: number;
};

function CustomTooltip({
  active,
  payload,
  coordinate,
  maxY,
  chartHeight,
}: CustomTooltipProps) {
  if (active && payload && payload.length) {
    const y = ((chartHeight - coordinate.y) / chartHeight) * maxY;
    const activePayload = payload.reduce((res: any, cur: any) => {
      return Math.abs(res.payload.value - y) < Math.abs(cur.payload.value - y)
        ? res
        : cur;
    });

    return (
      <div className="custom-tooltip">
        <div>{activePayload.name}</div>
        <div>
          {format(new Date(activePayload.payload.date), "MMM d")} |{" "}
          {activePayload.payload.value}
        </div>
      </div>
    );
  }
}
