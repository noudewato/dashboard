import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import Widgets from "../components/widgets/Widgets";
import Statics from "../components/statics/Statics";
import { Helmet } from "react-helmet-async";
import LoadingPage from "../components/loading/LoadingPage";

const Dashboard = () => {

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const setTimer = setTimeout(() => {
       if(loading){
         setLoading(false)
       }
    }, 3000)

    return () => clearTimeout(setTimer)
  },[])

  return (
    <Layout>
       <Helmet>
          <title>Dashboard</title>
        </Helmet>
        {loading ? <LoadingPage /> 
        : 
        <div>
            <div className="py-3 flex justify-start items-center">
        <img
          className="h-[40px] w-[40px] object-cover rounded-full"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROw1J1J-0k8K8SKYPjPs8VRRoRK700uI_0kg&usqp=CAU"
          alt="user"
        />
        <h1 className="text-xl text-slate  font-bold ms-2">
          Good Morning Fawaz Noudewato
        </h1>
      </div>
      <Widgets />
      <div className="grid "></div>
      <Statics />
        </div>}
     
    </Layout>
  );
};

export default Dashboard;
