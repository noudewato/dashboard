import React, { useEffect, useState } from 'react'
import LoadingPage from '../../components/loading/LoadingPage'
import { Helmet } from 'react-helmet-async'
import Layout from '../../layout/Layout'
import Table from '../../components/table/Table'

const Products = () => {

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
            <title>Products</title>
        </Helmet>
      <div className=''>
         {loading ? <LoadingPage /> 
         : 
         <div className='bg-neutral shadow-xl p-5 rounded-lg'>
           <div className='flex justify-between items-center'>
              <h1 className='text-4xl font-semibold'>
                  Products
              </h1>

              <button className='text-neutral align-middle px-8 py-2 rounded-md bg-primary  transition duration-300 ease-in-out transform hover:scale-105'>
                Add New
              </button>
           </div>
            
            <div className='bg-gray-300'> 
               <Table />
            </div>
         </div>
         }
      </div>
    </Layout>
    
  )
}

export default Products



