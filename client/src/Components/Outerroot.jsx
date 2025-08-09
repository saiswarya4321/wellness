import React from 'react'
import { Outlet } from 'react-router-dom'
import OuterHeader from './OuterHeader'
import Footer from './Footer'

function Outerroot() {
  return (
    <div>
      <OuterHeader/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default Outerroot
