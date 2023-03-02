import React from 'react'
import { BrowserRouter } from "react-router-dom"
import Routing from './Routing'
import Navigation from './Navigation'
import Header from './Header'
const Application = () => {
  return (
    <BrowserRouter>
      <Header />
      <div className='row'>
        <Navigation />
        <Routing />
      </div>
    </BrowserRouter>
  )
}

export default Application
