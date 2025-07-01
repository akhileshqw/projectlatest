import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import Chatbot from './Chatbot'

const Layout = () => {
  return (
    <div >
  
      <Navbar />
      <div style={{paddingTop:"80px"}}>
        <Outlet /> 
      </div>
      
      {/* Chatbot component added here */}
      <Chatbot />
    </div>
  )
}

export default Layout
