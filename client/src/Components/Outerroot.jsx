import React from 'react'
import { Outlet } from 'react-router-dom'
import Outerheader from './OuterHeader'
import Footer from './Footer'

function Outerroot() {
  return (
    <div>
      <Outerheader/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default Outerroot
