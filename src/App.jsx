import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import Products from './pages/Products/Products'
import Cart from './pages/Cart/Cart'
import Contact from './pages/Contact/Contact'
import Layout from './components/Layout/Layout'
import ProductDetails from './pages/ProductDetails/ProductDetails'
import Checkout from './pages/Checkout/Checkout'
import Orders from './pages/Orders/Orders'
const App = () => {
  return (
    <div>
      <Routes >

        <Route path="/" element={<Navigate to="/login" />} />
        {/* with out navbar  */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* with navbar */}
        <Route element={<Layout />}>
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App