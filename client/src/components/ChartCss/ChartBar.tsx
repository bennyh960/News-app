import { BarChart, XAxis, ResponsiveContainer, Legend, Bar, LabelList } from "recharts";

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

const ChartBar = ({ data, type }: ChartDataProp) => {
  // console.log(data);

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
      <BarChart
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
          <Bar dataKey="temperature" fill="#8884d8">
            <LabelList dataKey="temperature" position="top" />
          </Bar>
        )}
        {type === "humidity" && (
          <Bar dataKey="temperature" fill="#82ca9d">
            <LabelList dataKey="temperature" position="top" />
          </Bar>
        )}
        {type === "pressure" && (
          <Bar dataKey="temperature" fill="#d45d9b">
            <LabelList dataKey="temperature" position="top" />
          </Bar>
        )}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ChartBar;
