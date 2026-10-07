
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "./ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => {
        setError("The product did not load. Try again.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <h2 className="status">Loading...</h2>;
  if (error) return <h2 className="status">{error}</h2>;

  return (
   <div className="details-page">
    <Link to="/products" className="back-link">
      ← Back to Products
    </Link>

    <div className="details-card">
      <img src={product.thumbnail} alt={product.title} />

      <div className="details-info">
        <p className="category">{product.category}</p>
        <h2>{product.title}</h2>
        <p className="brand">Brand: {product.brand}</p>
        <p className="rating">⭐ {product.rating}</p>
        <p className="description">{product.description}</p>

        <div className="price-row">
          <span className="details-price">${product.price}</span>
          <span className="discount-badge">{product.discountPercentage}% OFF</span>
        </div>

        <p className={product.stock > 0 ? "in-stock" : "out-stock"}>
          {product.availabilityStatus} ({product.stock} left)
        </p>

        <div className="extra-info">
          <p>🚚 {product.shippingInformation}</p>
          <p>🛡️ {product.warrantyInformation}</p>
          <p>↩️ {product.returnPolicy}</p>
        </div>

        <button className="add-btn" onClick={() => addToCart(product)}>
          Add to Cart
        </button>
      </div>
    </div>
  </div>
  );
}

export default ProductDetails;