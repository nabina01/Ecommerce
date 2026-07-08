# E-Commerce Platform

A clean, beginner-friendly e-commerce platform built with **NestJS**, **React**, and **Prisma**.

## Features

- ✅ **JWT Authentication** - Secure login and registration
- ✅ **Product CRUD** - Create, read, update, delete products (Admin)
- ✅ **Cart System** - Add/remove items from cart
- ✅ **Order Placement** - Place orders from cart
- ✅ **eSewa Payment** - Integrate eSewa payment gateway
- ✅ **Admin Dashboard** - Manage products, orders, users, inventory
- ✅ **User Orders** - View your orders and status

## Tech Stack

**Backend:**
- NestJS
- Prisma ORM
- PostgreSQL
- JWT Authentication

**Frontend:**
- React
- Tailwind CSS
- Axios
- React Router

## Project Structure

```
/Ecommerce
├── Backend/          # NestJS backend
│   ├── src/
│   ├── prisma/       # Database schema
│   └── package.json
├── frontend/         # React frontend
│   ├── src/
│   └── package.json
└── README.md
```

## Quick Start

### Backend Setup

```bash
cd Backend
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run start:dev
```

Backend runs on: `http://localhost:2004`

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

Frontend runs on: `http://localhost:3000`

## Environment Variables

**Backend** (`.env`):
```
DATABASE_URL=postgresql://user:password@localhost:5432/ecommerce
JWT_SECRET=your_secret_key
PORT=2004
```

**Frontend** (`.env`):
```
REACT_APP_API_URL=http://localhost:2004
```

## Key Features

### Authentication
- User signup and login with JWT
- Password hashing with bcrypt
- Protected routes with JWT middleware

### Products
- Admin can add, update, delete products
- Users can view products and search
- Product filtering and pagination

### Shopping Cart
- Add/remove items from cart
- Update quantities
- Persistent cart storage

### Orders
- Place orders from cart items
- Track order status
- View order history

### Admin Dashboard
```
Dashboard
├── Products
│   ├── Add Product
│   └── View/Edit Products
├── Orders
│   ├── All Orders
│   └── Update Status
├── Users
├── Inventory
└── Settings
```

### Payment
- eSewa payment integration
- Payment verification
- Transaction tracking

## API Endpoints

### Auth
- `POST /auth/signup` - Register
- `POST /auth/login` - Login

### Products
- `GET /products` - List products
- `GET /products/:id` - Get product
- `POST /products` - Create (Admin)
- `PUT /products/:id` - Update (Admin)
- `DELETE /products/:id` - Delete (Admin)

### Cart
- `GET /cart` - Get cart items
- `POST /cart` - Add item
- `PUT /cart/:id` - Update item
- `DELETE /cart/:id` - Remove item

### Orders
- `POST /orders` - Create order
- `GET /orders` - Get user orders
- `GET /orders/:id` - Get order details

### Payment
- `POST /payment/esewa` - eSewa payment
- `POST /payment/verify` - Verify payment

## Database Schema

Core entities:
- User (id, email, password, role, createdAt)
- Product (id, name, description, price, stock, image)
- Cart (id, userId, items)
- Order (id, userId, items, total, status)
- Payment (id, orderId, amount, status, method)

## License

MIT
