import { useEffect, useState } from "react";
import LoadingPage from "../../components/loading/LoadingPage";
import { Helmet } from "react-helmet-async";
import Layout from "../../layout/Layout";
import CustomerTable from "../../components/table/CustomerTable";
import TopBar from "../../components/topbar/TopBar";

const Customers = () => {
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
        <title>Customers</title>
      </Helmet>
      <div className="">
        {loading ? (
          <LoadingPage />
        ) : (
          <div className="overflow-hidden">
            <TopBar pageTilte="Customers" />
            <CustomerTable />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Customers;
