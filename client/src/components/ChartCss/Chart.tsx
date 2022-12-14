import { LineChart, XAxis, YAxis, CartesianGrid, Line, ResponsiveContainer } from "recharts";
import React from "react";

export interface ChartAxesValues {
  time?: string;
  temperature?: number | string;
  humidity?: number | string;
  pressure?: number | string;
}

export interface ChartDataProp {
  data: ChartAxesValues[];
  type: "humidity" | "temperature" | "pressure";
}
export const chartLabelUnits: ChartAxesValues = {
  temperature: "\u00B0C",
  humidity: "%",
  pressure: "Pa",
};

const Chart = ({ data, type }: ChartDataProp) => {
  // console.log(data);

  const CustomizedLabel = ({ x, y, stroke, value }: any) => {
    return (
      <text x={x} y={y} dy={-4} fill={stroke} fontSize={12} textAnchor="middle">
        {value} {chartLabelUnits[type]}
      </text>
    );
  };

  return (
    <ResponsiveContainer maxHeight={150} width={"100%"}>
      <LineChart style={{ background: "#cdcdcd9a" }} data={data} title={`${type} ${chartLabelUnits[type]}`}>
        <XAxis dataKey="time" />
        <YAxis domain={["dataMin -1", "dataMax+1"]} type="number" />

        <CartesianGrid stroke="#eee" />
        {type === "temperature" && (
          <Line
            type="monotone"
            dataKey="temperature"
            stroke="#8884d8"
            // @ts-ignore
            label={CustomizedLabel}
          />
        )}
        {type === "humidity" && (
          <Line
            type="monotone"
            dataKey="humidity"
            stroke="#d88484"
            // @ts-ignore
            label={CustomizedLabel}
          />
        )}
        {type === "pressure" && (
          <Line
            type="monotone"
            dataKey="pressure"
            stroke="#d45d9b"
            // @ts-ignore
            label={CustomizedLabel}
          />
        )}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;
