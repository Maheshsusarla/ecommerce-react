

import React, { useState, useEffect } from 'react'
import './Products.css'
import { useCart } from '../../context/CartContext'
import { Link } from 'react-router-dom';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const { addToCart } = useCart();

    // fetch the data from api
    useEffect(() => {
        fetch("https://dummyjson.com/products")
            .then((res) => res.json())
            .then((data) => {
                setProducts(data.products);
                console.log(products);
                setLoading(false);
            })
            .catch(() => {
                setError("The products failed to load. Please try again.");
                setLoading(false);
            });
    }, []);



    // search matched products
    const filteredProducts = products.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) return <h2 className="status">Loading...</h2>;
    if (error) return <h2 className="status">{error}</h2>;

    return (
        <div className="products-page">
            <input
                className="search-box"
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <div className="products-grid">
                {filteredProducts.map((product) => (
                    <div className="product-card" key={product.id}>
                        <Link to={`/products/${product.id}`} className="card-link">
                            <img src={product.thumbnail} alt={product.title} />
                            <h4>{product.title}</h4>
                        </Link>
                        <Link to={`/products/${product.id}`} className="view-btn">
                            View Details
                        </Link>
                        <p className="price">${product.price}</p>
                        <button onClick={() => addToCart(product)}>Add to Cart</button>
                    </div>
                ))}
            </div>

            {filteredProducts.length === 0 && (
                <p className="status">No Products found</p>
            )}
        </div>
    );
};

export default Products;