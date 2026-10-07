import { Link } from "react-router-dom";
import "./Orders.css";

function Orders() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const allOrders = JSON.parse(localStorage.getItem("orders")) || [];

  // use only orders and new orders get before
  const myOrders = allOrders
    .filter((o) => o.userEmail === currentUser.email)
    .reverse();

  return (
    <div className="orders-page">
      <h2>My Orders 📦</h2>

      {myOrders.length === 0 ? (
        <div>
          <p className="empty">No more orders yet, brother</p>
          <Link to="/products" className="back-link">Start Shopping</Link>
        </div>
      ) : (
        myOrders.map((order) => (
          <div className="order-card" key={order.id}>
            <div className="order-head">
              <span>Order #{order.id}</span>
              <span>{order.date}</span>
            </div>

            {order.items.map((item) => (
              <div className="order-item" key={item.id}>
                <img src={item.thumbnail} alt={item.title} />
                <p>{item.title}</p>
                <span>x {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}

            <p className="order-address">
              📍 {order.address.name}, {order.address.address}, {order.address.city} - {order.address.pincode}
            </p>
            <h4>Total: ${order.total.toFixed(2)}</h4>
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;