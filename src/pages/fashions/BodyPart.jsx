import { useEffect, useState } from "react";
import LoadingPage from "../../components/loading/LoadingPage";
import { Helmet } from "react-helmet-async";
import Layout from "../../layout/Layout";
import TopBar from "../../components/topbar/TopBar";
import BodyPartTable from "../../components/table/BodyPartTable";

const BodyParts = () => {
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
        <title>Body Parts</title>
      </Helmet>
      <div className="">
        {loading ? (
          <LoadingPage />
        ) : (
          <div className="overflow-hidden">
            <TopBar pageTilte="Body Parts" />
            <BodyPartTable />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BodyParts;
