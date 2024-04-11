import { useEffect, useState } from 'react'
import LoadingPage from '../../components/loading/LoadingPage'
import { Helmet } from 'react-helmet-async'
import Layout from '../../layout/Layout'
// import Table from '../../components/table/Table'
import TopBar from '../../components/topbar/TopBar'

const Inventory = () => {

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

        <TopBar pageTilte='Inventory' />
      <div className=''>
         {loading ? <LoadingPage /> 
         : 
         <div className='bg-neutral shadow-xl p-5 rounded-lg'>
           <div className='flex justify-between items-center'>
              <h1 className='text-4xl font-semibold'>
                  Inventory
              </h1>
            </div>  
         </div>
         }
      </div>
    </Layout>
    
  )
}

export default Inventory



