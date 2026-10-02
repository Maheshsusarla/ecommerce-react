// import React, { useState, useEffect } from 'react'
// import { useNavigate, Link } from 'react-router-dom'
// import './Products.css'
// import { useCart } from '../../context/CartContext'
// const Products = () => {
//     const [products, setProducts] = useState([]);
//     const [search, setSearch] = useState("");
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState("");

//     // const navigate = useNavigate();

//     const { addToCart, totalItems } = useCart();

//     // get the data from localstorage
//     const currentUser = JSON.parse(localStorage.getItem("currentUser"));

//     // check the user login or not
//     // useEffect(() => {
//     //     if (!currentUser) {
//     //         navigate("/login")
//     //     }
//     // }, []);

//     // fetch tha data from api
//     useEffect(() => {
//         fetch("https://fakestoreapi.com/products")
//             .then((res) => res.json())
//             .then((data) => {
//                 setProducts(data)
//                 setLoading(false)
//             })
//             .catch(() => {
//                 setError("The products failed to load. Please try again.")
//                 setLoading(false);
//             })
//     }, []);


//     // logout functionality
//     // const handleLogout = () => {
//     //     localStorage.removeItem("currentUser");
//     //     navigate("/login")
//     // };


//     // search matched data fetching
//     const filteredProducts = products.filter((p) =>
//         p.title.toLowerCase().includes(search.toLowerCase())
//     );


//     if (loading) return <h2 className="status">Loading...</h2>;
//     if (error) return <h2 className="status">{error}</h2>;

//     return (
//         <div className="products-page">
//             {/* <div className="top-bar">
//                 <h2>Hi,{currentUser ?.name} 👋</h2>
//                 <button className="logout-btn" onClick={handleLogout}>Logout</button>
//             </div> */}
//             {/* <div className="top-bar">
//                 <h2>Hi, {currentUser?.name} 👋</h2>
//                 <div className="top-right">
//                     <Link to="/cart" className="cart-link">
//                         🛒 Cart ({totalItems})
//                     </Link>
//                     <button className="logout-btn" onClick={handleLogout}>
//                         Logout
//                     </button>
//                 </div>
//             </div> */}
//             <input className="search-box" type="text" placeholder='Search products...' value={search} onChange={(e) => setSearch(e.target.value)} />
//             <div className="products-grid">
//                 {filteredProducts.map((product) => (
//                     <div className="product-card" key={product.id} >
//                         <img src={product.image} alt={product.title} />
//                         <h4>{product.title}</h4>
//                         <p className="price">${product.price}</p>
//                         <button onClick={() => addToCart(product)}>Add to Cart</button>
//                     </div>
//                 ))}
//             </div>
//             {filteredProducts.length === 0 && (
//                 <p className="status">No Products found</p>
//             )}
//         </div>
//     )
// }

// export default Products



import React, { useState, useEffect } from 'react'
import './Products.css'
import { useCart } from '../../context/CartContext'

const Products = () => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const { addToCart } = useCart();

    // fetch the data from api
    useEffect(() => {
        fetch("https://fakestoreapi.com/products")
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);
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
                        <img src={product.image} alt={product.title} />
                        <h4>{product.title}</h4>
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