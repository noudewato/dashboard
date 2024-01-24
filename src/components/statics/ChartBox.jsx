import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Jan",
    perc: 20,
  },
  {
    name: "Feb",
    thisYear: 3000,
    lastYear: 3000,
    perc: 20,
  },
  {
    name: "Mar",
    thisYear: 2000,
    lastYear: 3500,
    perc: 20,
  },
  {
    name: "Apr",
    thisYear: 2780,
    lastYear: 4000,
    perc: 40,
  },
  {
    name: "May",
    thisYear: 1890,
    lastYear: 3000,
    perc: 40,
  },
  {
    name: "Jun",
    thisYear: 2390,
    lastYear: 4000,
    perc: 60,
  },
  {
    name: "Jul",
    thisYear: 3490,
    lastYear: 4300,
    perc: 80,
  },
  {
    name: "Aug",
    thisYear: 2090,
    lastYear: 6400,
    perc: 0,
  },
  {
    name: "Sep",
    thisYear: 5090,
    lastYear: 1900,
  },
  {
    name: "Oct",
    thisYear: 5090,
    lastYear: 1900,
    perc: 10,
  },
  {
    name: "Nov",
    thisYear: 5709,
    lastYear: 4000,
    perc: 10,
  },
  {
    name: "Dec",
    thisYear: 5709,
    lastYear: 4000,
    perc: 10,
  },
];

const ChartBox = () => {
  return (
    <ResponsiveContainer width="100%" height="85%">
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          bottom: 5,
        }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="lastYear"
          stroke="#c084fc"
          strokeWidth={3}
        />
        <Line
          type="monotone"
          dataKey="thisYear"
          stroke="#3b82f6"
          strokeWidth={3}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ChartBox;
