import React from 'react'
import { Outlet } from 'react-router-dom'
import HomeNavigation from './HomeNavigation'

const Layout = () => {
    return (
        <div className="d-flex gap-5 p-3 align-items-stretch vh-100">
            <HomeNavigation />
            <div className='content'>
                <Outlet />
            </div>
        </div>
    )
}

export default Layout
