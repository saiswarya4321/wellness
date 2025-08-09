import React from 'react'
import { Outlet } from 'react-router-dom'

import Footer from './Footer'
import Outheader from './Outheader'

function Outerroot() {
  return (
    <div>
      <Outheader/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default Outerroot
