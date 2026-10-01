import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
const App = () => {
  return (
    <div>
      <Routes >
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        
        <Route path="/products" element={<h1>Products page coming soon...</h1>} />
      </Routes>
    </div>
  )
}

export default App