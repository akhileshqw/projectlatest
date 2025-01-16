import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div >
  
  <Navbar />
     <div style={{paddingTop:"80px"}}>

     <Outlet /> 

     </div>

    


    </div>
  )
}

export default Layout
