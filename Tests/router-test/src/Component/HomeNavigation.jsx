import React from 'react'
import { Link, NavLink } from 'react-router-dom'


const HomeNavigation = () => {
    return (
        <aside className='nav-aside bg-secondary-subtle p-1'>
            <ul className='list-group list-group-flush'>
                <li className='list-group-item'><Link to='/'>Dashboard</Link></li>
                <li className='list-group-item'><Link to="Books">Books</Link></li>
                <li className='list-group-item'><Link to="Students">Students</Link></li>
            </ul>
        </aside>
    )
}

export default HomeNavigation
