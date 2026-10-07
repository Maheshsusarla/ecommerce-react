import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "./Checkout.css";

function Checkout() {
  const { cart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const [form, setForm] = useState({
    name: currentUser?.name || "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });
  const [error, setError] = useState("");

  // all i/p only one function
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (!form.name || !form.phone || !form.address || !form.city || !form.pincode) {
      setError("All fields are required");
      return;
    }

    if (form.phone.length !== 10) {
      setError("The phone number must be 10 digits long.");
      return;
    }

    const newOrder = {
      id: Date.now(),
      userEmail: currentUser.email,
      date: new Date().toLocaleString(),
      items: cart,
      total: totalPrice,
      address: form,
    };

    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(orders));

    navigate("/orders");
    clearCart();
  };


//   if cart is empty then no need to from
  if (cart.length === 0) {
    return (
      <div className="checkout-page">
        <p className="empty">The cart is empty, brother</p>
        <Link to="/products" className="back-link">Go to Products</Link>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-wrapper">
        <form className="checkout-form" onSubmit={handlePlaceOrder}>
          <h2>Delivery Address</h2>

          {error && <p className="error">{error}</p>}

          <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} />
          <input name="phone" type="number" placeholder="Phone Number" value={form.phone} onChange={handleChange} />
          <textarea name="address" rows="3" placeholder="Address" value={form.address} onChange={handleChange} />
          <input name="city" placeholder="City" value={form.city} onChange={handleChange} />
          <input name="pincode" placeholder="Pincode" value={form.pincode} onChange={handleChange} />

          <p className="payment">💵 Payment: Cash on Delivery (dummy)</p>

          <button type="submit">Place Order</button>
        </form>

        <div className="order-summary">
          <h2>Order Summary</h2>
          {cart.map((item) => (
            <div className="summary-item" key={item.id}>
              <span>{item.title.slice(0, 25)}... x {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <hr />
          <h3>Total: ${totalPrice.toFixed(2)}</h3>
        </div>
      </div>
    </div>
  );
}

export default Checkout;