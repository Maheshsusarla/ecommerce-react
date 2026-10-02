import React from 'react'
import {NavLink,useNavigate} from 'react-router-dom';
import {useCart} from "../../context/CartContext";
import "./Navbar.css"

const Navbar = () => {
    const {totalItems}=useCart();

    const navigate=useNavigate();

    const currentUser=JSON.parse(localStorage.getItem("currentUser"));

    const handleLogout=()=>{
        localStorage.removeItem("currentUser");
        navigate("/login")
    }

  return (
    <div className="navbar">
        <h3 className='logo'>MyShop</h3>
        <div className="nav-links">
            <NavLink to="/products" >Products</NavLink>
            <NavLink to="/cart" >🛒 Cart ({totalItems})</NavLink>
            <NavLink to="/contact" >Contact Us</NavLink>
        </div>

        <div className='nav-user'>
            <span>Hi , {currentUser?.name} 👋</span>
            <button onClick={handleLogout}>Logout</button>

        </div>
        
    </div>
  )
}

export default Navbar