# 🛒 ShopSmart – Your Digital Grocery Store Experience

ShopSmart is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) e-commerce web application designed to provide a convenient and efficient online grocery shopping experience. It allows users to browse products, manage their cart, place orders, and enables administrators to manage products, users, and orders.

---

# 📌 Project Overview

## 🎯 Purpose
ShopSmart provides an easy-to-use online grocery platform where users can:

- Browse grocery products
- Add items to cart
- Place and track orders
- Manage their profile

It also includes an admin panel for managing store operations efficiently.

---

# 🚀 Features

## 👤 User Features
- Secure user registration and login (JWT authentication)
- Password encryption using hashing
- Browse and search grocery products
- Add, remove, and update cart items
- Place orders and view order history
- Protected routes for secure access

## 🛍️ Product Features
- Product listing with categories
- Product search functionality
- Product details view

## 📦 Order Features
- Place new orders
- Track order status
- View previous orders

## 🛠️ Admin Features
- Admin login and authentication
- Product Management (Create, Read, Update, Delete)
- User Management
- Order Management dashboard

---

# 🏗️ Tech Stack

## Frontend
- React.js
- React Router
- Context API
- HTML, CSS, JavaScript

## Backend
- Node.js
- Express.js
- REST API
- JWT Authentication

## Database
- MongoDB Atlas
- Mongoose ODM

---

# 🧱 Architecture Overview

ShopSmart follows a client-server architecture:

- Frontend (React): User Interface and interaction
- Backend (Node.js + Express): Business logic and API handling
- Database (MongoDB Atlas): Stores users, products, and orders
- Communication via REST APIs

---

# 🗄️ Database Collections

- users – User details and authentication
- products – Product information
- categories – Product categories
- orders – User order details

---

# 📁 Folder Structure

```
ShopSmart/
│
├── Project files/
│   ├── Backend/
│   │   ├── src/
│   │   │   ├── controllers/
│   │   │   ├── models/
│   │   │   ├── routes/
│   │   │   └── middleware/
│   │   └── index.js
│   │
│   └── Frontend/
│       ├── src/
│       │   ├── components/
│       │   ├── admin_components/
│       │   ├── context/
│       │   └── App.js
│
└── README.md
```

---

# ⚙️ Installation and Setup

## Prerequisites

- Node.js
- MongoDB Atlas Account
- Git

---

## Step 1: Clone Repository

```bash
git clone https://github.com/SaiDivakar-Navara/ShopSmart-Your-Digital-Grocery-Store-Experience.git

cd ShopSmart-Your-Digital-Grocery-Store-Experience/Project files
```

---

## Step 2: Backend Setup

```bash
cd Backend
npm install
```

Create `.env` file in Backend folder:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5100
```

Run backend:

```bash
npm start
```

Backend runs on:
```
http://localhost:5100
```

---

## Step 3: Frontend Setup

```bash
cd ../Frontend
npm install
```

Add proxy in `package.json`:

```
"proxy": "http://localhost:5100"
```

Run frontend:

```bash
npm start
```

Frontend runs on:
```
http://localhost:3000
```

---

# 🔐 Authentication

ShopSmart uses JWT (JSON Web Tokens) for authentication.

Workflow:

1. User logs in or registers
2. Backend generates JWT token
3. Token stored in browser (localStorage)
4. Token used for accessing protected routes
5. Middleware verifies token for secure access

---

# 📡 API Base URL

```
http://localhost:5100/api
```

Protected routes require header:

```
Authorization: Bearer <JWT_TOKEN>
```

---

# 🧪 Testing

Manual testing was performed for:

- User registration and login
- Product browsing
- Cart functionality
- Order placement
- Admin dashboard operations

Future testing improvements:

- Unit testing (Jest)
- Integration testing
- End-to-End testing (Cypress)

---

# 🎥 Demo

Video Demo:

---

# ⚠️ Known Issues

- Image upload service not integrated (uses image URLs)
- No password reset functionality
- Basic search and filtering
- Limited input validation

---

# 🚀 Future Enhancements

- Payment gateway integration (Stripe, Razorpay)
- Wishlist feature
- Product reviews and ratings
- Email notifications
- Admin analytics dashboard
- Cloud image upload (AWS S3 / Cloudinary)
- CI/CD deployment
- Real-time updates using WebSockets

---

# 👨‍💻 Author

Developed as a full-stack MERN project to demonstrate modern e-commerce application development skills.

---

# 📄 License

This project is for educational purposes.

