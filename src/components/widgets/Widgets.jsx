import React from "react";
import { FaArrowUpLong } from "react-icons/fa6";
import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts";

const Widgets = () => {
  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 3000,
      amt: 2400,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 6800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 4500,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 6000,
      amt: 2181,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4000,
      amt: 2100,
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="h-[200px] rounded-lg bg-neutral shadow-2xl flex justify-center items-center flex-col pt-5">
        <h2 className="text-lg">Total Earnings</h2>
        <p className="font-bold text-4xl pt-3">$2572</p>
        <span className="w-full h-[100%] flex justify-center ustify-between text-green py-4">
          <div className="pr-3">
            <span className="flex justify-start items-center">
              <FaArrowUpLong /> 25
            </span>
            <span className="ms-3">%</span>
          </div>
          <ResponsiveContainer width="50%" height="100%">
            <LineChart width={300} height={100} data={data}>
              <Tooltip
                contentStyle={{ background: "transparent", border: "none" }}
                labelStyle={{ display: "none" }}
                position={{ x: 10, y: 40 }}
              />
              <Line
                type="monotone"
                dataKey="pv"
                dot={false}
                stroke="#4ade80"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </span>
      </div>
      <div className="h-[200px] rounded-lg bg-neutral shadow-2xl flex justify-center items-center flex-col pt-5">
        <h2 className="text-lg">Today's Earnings</h2>
        <p className="font-bold text-4xl pt-3">$2572</p>
        <span className="w-full h-[100%] flex justify-center ustify-between text-red py-4">
          <div className="pr-3">
            <span className="flex justify-start items-center">
              <FaArrowUpLong /> 25
            </span>
            <span className="ms-3">%</span>
          </div>
          <ResponsiveContainer width="50%" height="100%">
            <LineChart width={300} height={100} data={data}>
              <Tooltip
                contentStyle={{ background: "transparent", border: "none" }}
                labelStyle={{ display: "none" }}
                position={{ x: 10, y: 40 }}
              />
              <Line
                type="monotone"
                dataKey="pv"
                dot={false}
                stroke="#f43f5e"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </span>
      </div>

      <div className="h-[200px] rounded-lg bg-neutral shadow-2xl flex justify-center items-center flex-col pt-5">
        <h2 className="text-lg">New Orders</h2>
        <p className="font-bold text-4xl pt-3">2572</p>
        <span className="w-full h-[100%] flex justify-center ustify-between text-cyan py-4">
          <div className="pr-3">
            <span className="flex justify-start items-center">
              <FaArrowUpLong /> 25
            </span>
            <span className="ms-3">%</span>
          </div>
          <ResponsiveContainer width="50%" height="100%">
            <LineChart width={300} height={100} data={data}>
              <Tooltip
                contentStyle={{ background: "transparent", border: "none" }}
                labelStyle={{ display: "none" }}
                position={{ x: 10, y: 40 }}
              />
              <Line
                type="monotone"
                dataKey="pv"
                dot={false}
                stroke="#22d3ee"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </span>
      </div>

      <div className="h-[200px] rounded-lg bg-neutral shadow-2xl flex justify-center items-center flex-col pt-5">
        <h2 className="text-lg">New Users</h2>
        <p className="font-bold text-4xl pt-3">572</p>
        <span className="w-full h-[100%] flex justify-center ustify-between text-orange py-4">
          <div className="pr-3">
            <span className="flex justify-start items-center">
              <FaArrowUpLong /> 25
            </span>
            <span className="ms-3">%</span>
          </div>
          <ResponsiveContainer width="50%" height="100%">
            <LineChart width={300} height={100} data={data}>
              <Tooltip
                contentStyle={{ background: "transparent", border: "none" }}
                labelStyle={{ display: "none" }}
                position={{ x: 10, y: 40 }}
              />
              <Line
                type="monotone"
                dataKey="pv"
                dot={false}
                stroke="#f97316"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </span>
      </div>
    </div>
  );
};

export default Widgets;
