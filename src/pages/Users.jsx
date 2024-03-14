import React, { useEffect, useState } from 'react'
import Layout from '../layout/Layout'
import LoadingPage from '../components/loading/LoadingPage'
import { Helmet } from 'react-helmet-async'

const Users = () => {

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }, []);

  return (
    <Layout>
       <Helmet>
          <title>Users</title>
        </Helmet>
        <div>
        {loading ? LoadingPage : 
        <div>
             Hello Am your new user page
        </div>
        }
        </div>
        
        
    </Layout>
  )
}

export default Users
