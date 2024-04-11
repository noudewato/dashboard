import { useEffect, useState } from "react";
import LoadingPage from "../../components/loading/LoadingPage";
import { Helmet } from "react-helmet-async";
import Layout from "../../layout/Layout";
import EmployeeTable from "../../components/table/EmployeeTable";
import TopBar from "../../components/topbar/TopBar";

const Stores = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const setTimer = setTimeout(() => {
      if (loading) {
        setLoading(false);
      }
    }, 3000);

    return () => clearTimeout(setTimer);
  }, []);

  return (
    <Layout>
      <Helmet>
        <title>Dashboard | Stores</title>
      </Helmet>

      <TopBar pageTilte="Stores" />
      <div className="w-full">
        {loading ? (
          <LoadingPage />
        ) : (
          <div className="overflow-hidden">
            <div className="flex justify-between items-center">
              <h1 className="text-4xl font-semibold">Stores</h1>
            </div>
            <div>
              <EmployeeTable />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Stores;
