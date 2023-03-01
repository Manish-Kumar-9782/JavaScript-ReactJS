import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Books from './Books'
import Teacher from './Teacher'
import Student from './Student'
import RegisterBook from './RegisterBook'
import Register from './Register'
import Admin from './Admin'
const Routing = () => {
    return (
        <Routes>
            <Route path='/' element={<Admin />} />
            <Route path='/Books' element={<Books />} />
            <Route path='/Student' element={<Student />} />
            <Route path='/Teacher' element={<Teacher />} />
            <Route path='/RegisterBook' element={<RegisterBook />} />
            <Route path='/Register' element={<Register />} />
        </Routes>
    )
}

export default Routing
