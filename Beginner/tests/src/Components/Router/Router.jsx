import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Navigation from './Navigation'
import Routing from './Routing'
const Router = () => {
    return (
        <BrowserRouter>
            <div className='flex-row'>
                <Navigation />
                <Routing />
            </div>
        </BrowserRouter>
    )
}

export default Router
