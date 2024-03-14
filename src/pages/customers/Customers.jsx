import React, { useEffect, useState } from 'react';
import LoadingPage from '../../components/loading/LoadingPage';
import { Helmet } from 'react-helmet-async';
import Layout from '../../layout/Layout';
import ProductTable from '../../components/table/ProductTable';

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
            <div className=''>
                {loading ? (
                    <LoadingPage />
                ) : (
                    <div>
                        <div className='text-4xl font-semibold'>Customers</div>
                        <ProductTable />
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default Customers;
