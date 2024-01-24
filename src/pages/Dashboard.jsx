import React from "react";
import Layout from "../layout/Layout";
import Widgets from "../components/widgets/Widgets";
import Statics from "../components/statics/Statics";
import Admin from "../components/admin/Admin";
import ChartBox from "../components/statics/ChartBox";

const Dashboard = () => {
  return (
    <Layout>
      <div className="py-3 flex justify-start items-center">
        <img
          className="h-[40px] w-[40px] object-cover rounded-full"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROw1J1J-0k8K8SKYPjPs8VRRoRK700uI_0kg&usqp=CAU"
          alt="user"
        />
        <h1 className="text-xl text-slate  font-bold ms-2">
          Good Evening Jason Smith
        </h1>
      </div>
      <Widgets />
      <div className="grid "></div>
      <Statics />
    </Layout>
  );
};

export default Dashboard;
