import { Area, AreaChart, XAxis, ResponsiveContainer, Legend } from "recharts";

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

const ChartArea = ({ data, type }: ChartDataProp) => {
  // console.log(data);

  const CustomizedLabel = ({ x, y, stroke, value }: any) => {
    return (
      <text x={x} y={y} dy={-2} dx={2} fill={stroke} fontSize={12} fontWeight="bold" textAnchor="middle">
        {value} {chartLabelUnits[type]}
      </text>
    );
  };

  // @ts-ignore
  const renderLegend = (props) => {
    const { payload } = props;
    const style = {
      width: "fit-content",
      fontWeight: "bold",
      fontSize: "1.5rem",
      margin: "3px auto",
    };
    return (
      <ul>
        {
          // @ts-ignore
          payload.map((entry, index) => (
            <li style={style} key={`item-${index}`}>
              {`${type[0].toUpperCase() + type.slice(1)} ${chartLabelUnits[type]}`}{" "}
            </li>
          ))
        }
      </ul>
    );
  };

  return (
    <ResponsiveContainer maxHeight={150} width={"100%"}>
      <AreaChart
        data={data}
        title={`${type} ${chartLabelUnits[type]}`}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <Legend verticalAlign="top" fill="black" content={renderLegend} />
        <XAxis dataKey="time" fontWeight={900} />
        {type === "temperature" && (
          <Area
            type="monotone"
            dataKey="temperature"
            stroke="#8884d8"
            fillOpacity={0.5}
            fill="#8884d0"
            label={CustomizedLabel}
          />
        )}
        {type === "humidity" && (
          <Area
            type="monotone"
            dataKey="humidity"
            stroke="#82ca9d"
            fillOpacity={0.5}
            fill="#82ca1da0"
            label={CustomizedLabel}
          />
        )}
        {type === "pressure" && (
          <Area
            type="monotone"
            dataKey="pressure"
            stroke="#d45d9b"
            fillOpacity={0.5}
            fill="#d473a5d3"
            label={CustomizedLabel}
          />
        )}
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default ChartArea;
