import React from 'react'
import { NavLink } from 'react-router-dom'

const TopBar = ({pageTilte}) => {
  return (
    <div className='flex items-center my-5'>
       <NavLink to={'/'} className='text-lg font-semibold shadow-xl rounded-lg'>
         Dashboard
       </NavLink>
       <div className='ms-3 text-md text-slate font-semibold shadow-xl rounded-lg'>
         {pageTilte}
       </div>
    </div>
  )
}

export default TopBar
