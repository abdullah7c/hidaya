import React, { useState } from 'react'
import Header from './Header'
import ScrollToTop from "react-scroll-to-top";

const ClientLayout = ({children}) => {

  return (
    <div>
        <Header />
        <ScrollToTop smooth />
            {children}          
    </div>
  )
}

export default ClientLayout