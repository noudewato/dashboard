import React, { useEffect, useState } from 'react'
import LoadingPage from '../../components/loading/LoadingPage'
import { Helmet } from 'react-helmet-async'
import Layout from '../../layout/Layout'

const Orders = () => {

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
            <title>Orders</title>
        </Helmet>
      <div className=''>
         {loading ? <LoadingPage /> 
         : 
         <div className='text-4xl font-semibold'>
            Orders
         </div>
         }
      </div>
    </Layout>
    
  )
}

export default Orders
