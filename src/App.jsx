import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import Products from './pages/Products/Products'
const App = () => {
  return (
    <div>
      <Routes >
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </div>
  )
}

export default App