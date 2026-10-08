

import React, { useState, useEffect } from 'react'
import './Products.css'
import { useCart } from '../../context/CartContext'
import { Link } from 'react-router-dom';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [sortBy, setSortBy] = useState("default");

    const { addToCart } = useCart();


    // filter use
    useEffect(() => {
        fetch("https://dummyjson.com/products/categories")
            .then((res) => res.json())
            .then((data) => setCategories(data));
    }, []);

    useEffect(() => {
        setLoading(true);
        const url =
            selectedCategory === "all"
                ? "https://dummyjson.com/products"
                : `https://dummyjson.com/products/category/${selectedCategory}`;

        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                setProducts(data.products);
                setLoading(false);
            })
            .catch(() => {
                setError("The products failed to load. Please try again.");
                setLoading(false);
            });
    }, [selectedCategory]);




    // fetch the data from api
    useEffect(() => {
        fetch("https://dummyjson.com/products")
            .then((res) => res.json())
            .then((data) => {
                setProducts(data.products);
                setLoading(false);
            })
            .catch(() => {
                setError("The products failed to load. Please try again.");
                setLoading(false);
            });
    }, []);



    // search matched products
    // const filteredProducts = products.filter((p) =>
    //     p.title.toLowerCase().includes(search.toLowerCase())
    // );
    // 1. search + category filter
    let filteredProducts = products.filter(
        (p) =>
            p.title.toLowerCase().includes(search.toLowerCase()) &&
            (selectedCategory === "all" || p.category === selectedCategory)
    );

    // sorting
    if (sortBy === "low") {
        filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
    } else if (sortBy === "high") {
        filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
        filteredProducts = [...filteredProducts].sort((a, b) => b.rating - a.rating);
    }

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

            <div className="filter-bar">
                <div className="category-buttons">

                    <button
                        className={selectedCategory === "all" ? "cat-btn active" : "cat-btn"}
                        onClick={() => setSelectedCategory("all")}
                    >
                        All
                    </button>

                    {categories.map((cat) => (
                        <button
                            key={cat.slug}
                            className={selectedCategory === cat ? "active" : ""}
                            onClick={() => setSelectedCategory(cat.slug)}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>

                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="default">Sort by</option>
                    <option value="low">Price: Low to High</option>
                    <option value="high">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                </select>
            </div>

            <p className="result-count">{filteredProducts.length} products found</p>
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