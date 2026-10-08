import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import './Cart.css'


const Cart = () => {
    const { cart, increaseQty, decreaseQty, removeFromCart, clearCart, totalPrice } = useCart();

    const navigate = useNavigate();

    // if user not login then goto thr login page
    useEffect(() => {
        if (!localStorage.getItem("currentUser")) {
            navigate("/login")
        }
    }, []);
    return (
        <div className="cart-page">
            <div className="cart-top">
                <h2>Your Cart 🛒</h2>
                <Link to="/products" className="back-link"> ← Continue Shopping</Link>

            </div>
            {cart.length === 0 ? (
                <p className="empty">The cart is empty, brother</p>) : (
                <>
                    {cart.map((item) => (
                        <div className="cart-item" key={item.id}>
                            <img src={item.thumbnail} alt={item.title} />

                            <div className="cart-info">
                                <h4>{item.title}</h4>
                                <p className="price">${item.price}</p>
                            </div>

                            <div className="qty-box">
                                <button onClick={() => decreaseQty(item.id)}>-</button>
                                <span>{item.quantity}</span>
                                <button onClick={() => increaseQty(item.id)}>+</button>
                            </div>

                            <p className="item-total">
                                ${(item.price * item.quantity).toFixed(2)}
                            </p>

                            <button
                                className="remove-btn"
                                onClick={() => removeFromCart(item.id)}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <div className="cart-summary">
                        <h3>Total: ${totalPrice.toFixed(2)}</h3>
                        <div>
                            <button className="clear-btn" onClick={clearCart}>
                                Clear Cart
                            </button>
                            <button className="checkout-btn" onClick={()=>navigate("/checkout")}>Checkout</button>
                        </div>
                    </div>

                </>
            )}

        </div>
    )
}

export default Cart