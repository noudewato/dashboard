import React from "react";
import ChartBox from "./ChartBox";
import Admin from "../admin/Admin";

const Statics = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10 w-full">
      <div className="md:col-span-2 bg-neutral shadow-2xl rounded-lg">
        <h2 className="text-2xl font-semibold p-5">Sales Report</h2>
        <ChartBox />
      </div>
      <div className="col-span-1 bg-neutral shadow-2xl rounded-lg">
        <Admin />
      </div>
    </div>
  );
};

export default Statics;
