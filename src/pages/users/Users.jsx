import { useEffect, useState } from "react";
import LoadingPage from "../../components/loading/LoadingPage";
import { Helmet } from "react-helmet-async";
import Layout from "../../layout/Layout";
import EmployeeTable from "../../components/table/EmployeeTable";
import TopBar from "../../components/topbar/TopBar";

const Users = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const setTimer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(setTimer);
  }, []);

  return (
    <Layout>
      <Helmet>
        <title>Users</title>
      </Helmet>
      <div className="">
        {loading ? (
          <LoadingPage />
        ) : (
          <div className="overflow-hidden">
            <TopBar pageTilte="Users" />
            <EmployeeTable />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Users;
