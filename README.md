# 🛒 MyShop - React E-Commerce App

A beginner-friendly e-commerce website built with **React + Vite**. It uses **localStorage** for authentication, cart and orders (no backend), and the **Fake Store API** for products.

## ✨ Features

- 🔐 Signup and Login (localStorage)
- 🛍️ Products listing with search, category filter and sorting
- 📄 Product details page (dynamic route)
- 🛒 Cart with add, remove, quantity update and total price
- 💾 Cart persists after page refresh
- 💳 Checkout with address form and order placing (dummy payment)
- 📦 Order history (per user)
- 📬 Contact Us form
- 🌙 Dark mode (saved in localStorage)
- 📱 Fully responsive design

## 🧰 Tech Stack

- React (Vite)
- React Router DOM
- Context API (Cart and Theme)
- CSS (CSS variables, media queries)
- Fake Store API

## 📁 Folder Structure

```
src/
├── components/
│   ├── Layout/
│   └── Navbar/
├── context/
│   ├── CartContext.jsx
│   └── ThemeContext.jsx
├── pages/
│   ├── Login/
│   ├── Signup/
│   ├── Products/
│   ├── ProductDetails/
│   ├── Cart/
│   ├── Checkout/
│   ├── Orders/
│   └── Contact/
├── App.jsx
└── main.jsx
```

## 🚀 Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/yourname/ecommerce-react.git

# 2. Go to the project folder
cd ecommerce-react

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Open `http://localhost:5173` in your browser.

## 📸 Screenshots

(Add screenshots here later)

## 🔮 Future Improvements

- Per-user cart
- Backend with Node.js, Express and MongoDB
- Real payment integration (Stripe test mode)
- Wishlist

## 👨‍💻 Author

Your Name - https://github.com/Maheshsusarla
