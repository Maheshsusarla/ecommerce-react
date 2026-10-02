import React, { useState, useEffect, createContext, useContext } from 'react'

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // first time open cart then getting the data from localstorage
  const [cart, setCart] = useState(
    () => JSON.parse(localStorage.getItem("user")) || []
  );

  // when tha cart change then store the data in localstorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);

      // if product already in cart then quantity +1
      if (exists) {
        return prev.map((item) =>
          item.id === product.id ?
            { ...item, quantity: item.quantity + 1 } : item);
      }

      // if not item then add it new item
      return [...prev, { ...product, quantity: 1 }];
    });
  };


  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };



  const decreaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }: item
      )
    );
  };

  // remove the item from cart
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

  // in cart icon show count,price
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );


  return (
    <div>
      <CartContext.Provider
        value={{
          cart,
          addToCart,
          increaseQty,
          decreaseQty,
          removeFromCart,
          clearCart,
          totalItems,
          totalPrice
        }}
      >
        {children}
      </CartContext.Provider>
    </div>
  )
}

export const useCart = () => useContext(CartContext)