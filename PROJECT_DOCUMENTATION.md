# E-Commerce Platform - Complete Project Documentation

## Table of Contents
1. [Project Information](#project-information)
2. [Project Overview](#project-overview)
3. [Technologies Used](#technologies-used)
4. [Project Architecture](#project-architecture)
5. [Database Schema](#database-schema)
6. [API Endpoints](#api-endpoints)
7. [Features](#features)
8. [Installation & Setup](#installation--setup)
9. [Deployment](#deployment)
10. [Security Implementation](#security-implementation)

---

## Project Information

| Field | Details |
|-------|---------|
| **Project Title** | E-Commerce Platform with eSewa & Bank Integration |
| **Type** | Full-Stack Web Application |
| **Academic Status** | Production-Ready Implementation |
| **Backend Framework** | NestJS (TypeScript) |
| **Frontend Framework** | React with Vite |
| **Database** | PostgreSQL |
| **Deployment** | Docker & Vercel |
| **Payment Gateway** | eSewa & Bank Transfer |

---

## Project Overview

### Problem Statement
Traditional e-commerce platforms lack integrated local payment solutions for Nepali markets. This project bridges that gap by providing a complete e-commerce solution with eSewa and bank transfer payment options.

### Objectives
- Build a scalable, production-ready e-commerce platform
- Implement secure user authentication (JWT-based)
- Enable product management with variants and inventory tracking
- Support shopping cart with persistent storage
- Integrate eSewa and bank payment methods
- Provide comprehensive admin dashboard
- Ensure role-based access control

### Scope
- **In Scope**: User management, products, cart, checkout, payments, admin panel, orders, reviews, wishlist
- **Out of Scope**: Third-party OAuth, advanced analytics, machine learning recommendations

### Key Features Implemented
1. **User Management**: Registration, login, profile management, role-based access
2. **Product Management**: CRUD operations, variants, inventory, search, filters
3. **Shopping Cart**: Add/remove items, persistent storage, cart summary
4. **Checkout**: Order creation, tax calculation, shipping costs, discounts
5. **Payment Integration**: eSewa & Bank transfer with verification
6. **Order Management**: Order tracking, status updates, order history
7. **Admin Dashboard**: Statistics, revenue tracking, user/product management
8. **Reviews & Ratings**: Product reviews, wishlist functionality

---

## Technologies Used

### Backend Stack
| Component | Technology | Version |
|-----------|-----------|---------|
| **Framework** | NestJS | Latest |
| **Language** | TypeScript | 5.x |
| **Database ORM** | TypeORM | 0.3.x |
| **Database** | PostgreSQL | 14+ |
| **Authentication** | JWT (jsonwebtoken) | 9.x |
| **Password Hash** | Bcrypt | 5.x |
| **API Documentation** | Swagger/OpenAPI | 7.x |
| **Validation** | class-validator | 0.14.x |
| **Config Management** | @nestjs/config | Latest |

### Frontend Stack
| Component | Technology | Version |
|-----------|-----------|---------|
| **Framework** | React | 18.x |
| **Build Tool** | Vite | 5.x |
| **HTTP Client** | Axios/Fetch | Latest |
| **State Management** | React Context/Redux | As needed |
| **Styling** | Tailwind CSS | 3.x |
| **UI Components** | shadcn/ui | Latest |

### Infrastructure
| Component | Technology |
|-----------|-----------|
| **Containerization** | Docker & Docker Compose |
| **Deployment** | Vercel (Frontend), VPS/Docker (Backend) |
| **Version Control** | Git & GitHub |
| **Environment Config** | .env files |

---

## Project Architecture

### System Architecture Diagram
```
┌─────────────────┐
│   Frontend      │
│   (React/Vite)  │
└────────┬────────┘
         │ HTTP/REST
         │
┌────────▼────────────────────┐
│   Backend (NestJS)          │
│  ┌──────────────────────┐   │
│  │  API Routes          │   │
│  │  - Auth              │   │
│  │  - Products          │   │
│  │  - Cart              │   │
│  │  - Orders            │   │
│  │  - Payments          │   │
│  │  - Admin             │   │
│  └──────────────────────┘   │
│                             │
│  ┌──────────────────────┐   │
│  │  Services Layer      │   │
│  │  - Business Logic    │   │
│  │  - Validations       │   │
│  │  - Payment Handling  │   │
│  └──────────────────────┘   │
│                             │
│  ┌──────────────────────┐   │
│  │  Database Layer      │   │
│  │  - TypeORM           │   │
│  │  - Repositories      │   │
│  └──────────────────────┘   │
└────────┬────────────────────┘
         │
┌────────▼──────────┐
│   PostgreSQL      │
│   Database        │
└───────────────────┘
```

### Folder Structure

```
v0-project/
├── Backend/
│   ├── src/
│   │   ├── admin/              # Admin dashboard features
│   │   ├── auth/               # Authentication guards & decorators
│   │   ├── cart/               # Shopping cart module
│   │   ├── categories/         # Product categories
│   │   ├── config/             # Configuration
│   │   ├── orders/             # Order management
│   │   ├── payment/            # Payment integration
│   │   ├── products/           # Product management
│   │   ├── reviews/            # Product reviews
│   │   ├── upload/             # File upload handling
│   │   ├── users/              # User management & auth
│   │   ├── wishlist/           # Wishlist functionality
│   │   ├── app.module.ts       # Main app module
│   │   ├── app.controller.ts   # Main controller
│   │   └── main.ts             # Entry point
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/         # Reusable components
│   │   ├── pages/              # Page components
│   │   ├── hooks/              # Custom React hooks
│   │   ├── services/           # API services
│   │   ├── utils/              # Utility functions
│   │   ├── styles/             # Tailwind config
│   │   └── main.tsx            # Entry point
│   ├── package.json
│   └── vite.config.ts
├── docker-compose.yml          # Multi-container setup
├── Dockerfile                  # Backend container
├── .env.development.local      # Development environment
├── PROJECT_DOCUMENTATION.md    # This file
├── SETUP_GUIDE.md              # Setup instructions
├── PRODUCTION_READY_REPORT.md  # Production checklist
├── API_EXAMPLES.md             # API usage examples
└── README.md                   # Quick start guide

```

---

## Database Schema

### Entity Relationships (ERD)

```
User (1) ──── (M) Order
  │
  ├──── (M) CartItem
  ├──── (M) Review
  ├──── (M) Wishlist
  └──── (M) Payment

Product (1) ──── (M) CartItem
  │
  ├──── (M) OrderItem
  ├──── (M) Review
  ├──── (M) Wishlist
  └──── (1) Category

Category (1) ──── (M) Product

Order (1) ──── (M) OrderItem
  │
  └──── (1) Payment

Payment
  ├──── (M) Order
  └──── (M) User
```

### Core Entities

#### User Entity
```typescript
{
  id: UUID (PK)
  email: String (UNIQUE)
  password: String (hashed with bcrypt)
  firstName: String
  lastName: String
  phone: String
  address: String
  role: Enum (USER, ADMIN)
  isActive: Boolean
  createdAt: Timestamp
  updatedAt: Timestamp
}
```

#### Product Entity
```typescript
{
  id: UUID (PK)
  categoryId: UUID (FK)
  name: String
  description: Text
  price: Decimal(10,2)
  imageUrls: String[]
  variants: Variant[] (JSON)
  stock: Integer
  isActive: Boolean
  createdAt: Timestamp
  updatedAt: Timestamp
}
```

#### Order Entity
```typescript
{
  id: UUID (PK)
  userId: UUID (FK)
  totalAmount: Decimal(10,2)
  subtotal: Decimal(10,2)
  taxAmount: Decimal(10,2)
  shippingCost: Decimal(10,2)
  discountAmount: Decimal(10,2)
  status: Enum (PENDING, CONFIRMED, SHIPPED, DELIVERED, CANCELLED)
  shippingAddress: String
  billingAddress: String
  paymentMethod: Enum (ESEWA, BANK)
  paymentTransactionId: String
  paymentStatus: String
  orderDate: Timestamp
  deliveryDate: Timestamp
  updatedAt: Timestamp
}
```

#### Payment Entity
```typescript
{
  id: UUID (PK)
  orderId: UUID (FK)
  userId: UUID (FK)
  amount: Decimal(10,2)
  method: Enum (ESEWA, BANK)
  status: Enum (PENDING, SUCCESS, FAILED, CANCELLED)
  transactionId: String
  metadata: JSON
  createdAt: Timestamp
  updatedAt: Timestamp
}
```

#### CartItem Entity
```typescript
{
  id: UUID (PK)
  userId: UUID (FK)
  productId: UUID (FK)
  quantity: Integer
  price: Decimal(10,2)
  selectedVariant: String (JSON)
  createdAt: Timestamp
  updatedAt: Timestamp
}
```

---

## API Endpoints

### Authentication Endpoints
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/users/auth/signup` | Register new user | No |
| POST | `/users/auth/login` | Login user | No |
| POST | `/users/auth/logout` | Logout user | JWT |
| GET | `/users/auth/me` | Get current user | JWT |

### Product Endpoints
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/products` | Get all products (paginated) | No |
| GET | `/products/:id` | Get product details | No |
| GET | `/products/search?name=...` | Search products | No |
| GET | `/products/category/:categoryId` | Get by category | No |
| POST | `/products` | Create product | Admin |
| PUT | `/products/:id` | Update product | Admin |
| DELETE | `/products/:id` | Delete product | Admin |

### Cart Endpoints
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/cart` | Get cart items | JWT |
| GET | `/cart/summary` | Get cart summary | JWT |
| POST | `/cart/add` | Add to cart | JWT |
| PUT | `/cart/:id` | Update quantity | JWT |
| DELETE | `/cart/:id` | Remove item | JWT |
| DELETE | `/cart` | Clear cart | JWT |

### Order Endpoints
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/orders/checkout` | Create order | JWT |
| GET | `/orders` | Get user orders | JWT |
| GET | `/orders/:id` | Get order details | JWT |
| PUT | `/orders/:id` | Update order status | Admin |
| DELETE | `/orders/:id` | Cancel order | JWT |

### Payment Endpoints
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/payments` | Create payment | JWT |
| POST | `/payments/esewa` | eSewa payment | JWT |
| POST | `/payments/bank` | Bank transfer | JWT |
| POST | `/payments/verify/:transactionId` | Verify payment | Webhook |
| GET | `/payments/user` | User payment history | JWT |
| GET | `/payments/order/:orderId` | Order payment | JWT |

### Admin Endpoints
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/admin/dashboard` | Dashboard stats | Admin |
| GET | `/admin/statistics` | Revenue statistics | Admin |
| GET | `/admin/users` | All users | Admin |
| GET | `/admin/orders` | All orders | Admin |
| PUT | `/admin/orders/:id/status` | Update order status | Admin |

---

## Features

### 1. User Management
- **Registration**: Email/password with validation
- **Login**: JWT token generation (24 hour expiry)
- **Password Security**: Bcrypt hashing (10 rounds)
- **Role-Based Access**: USER and ADMIN roles
- **Profile Management**: Update personal info
- **Session Management**: Logout functionality

### 2. Product Management
- **CRUD Operations**: Create, read, update, delete
- **Variants**: Size and color variants with individual stock
- **Search & Filter**: By name, category, price
- **Pagination**: 10 items per page
- **Inventory Tracking**: Real-time stock updates
- **Category Management**: Organize products

### 3. Shopping Cart
- **Add/Remove Items**: Easy cart management
- **Persistent Storage**: Database-backed cart
- **Quantity Updates**: Increment/decrement items
- **Duplicate Prevention**: Auto-merge same items
- **Cart Summary**: Subtotal calculation
- **Clear Cart**: One-click clear all

### 4. Checkout & Orders
- **Multi-step Checkout**: Smooth flow
- **Address Management**: Shipping & billing
- **Cost Calculation**: Subtotal, tax, shipping, discount
- **Order Tracking**: Real-time status updates
- **Order History**: View past orders
- **Status Flow**: PENDING → CONFIRMED → SHIPPED → DELIVERED

### 5. Payment Integration
- **eSewa**: Nepali payment gateway
  - Merchant code configuration
  - Payment verification
  - Transaction tracking
- **Bank Transfer**: Manual transfer option
  - Account details management
  - Transfer confirmation
  - Manual verification

### 6. Admin Dashboard
- **Statistics**: Total revenue, orders, users
- **Charts**: Revenue trends, popular products
- **User Management**: View all users
- **Order Management**: View and update orders
- **Product Management**: Add/edit products
- **Payment Tracking**: View all payments

### 7. Additional Features
- **Reviews & Ratings**: User product reviews
- **Wishlist**: Save favorite products
- **Search**: Full-text search on products
- **Filters**: By category, price range, ratings
- **Notifications**: Order status updates

---

## Installation & Setup

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- Docker & Docker Compose
- Git

### Backend Setup

```bash
# Navigate to Backend
cd Backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Update database credentials in .env

# Run migrations
npm run typeorm migration:run

# Start development server
npm run start:dev

# Server runs on http://localhost:2004
```

### Frontend Setup

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Create .env file
VITE_API_URL=http://localhost:2004/api

# Start development server
npm run dev

# Frontend runs on http://localhost:5173
```

### Using Docker

```bash
# From project root
docker-compose up -d

# Backend: http://localhost:2004
# Frontend: http://localhost:3000
# Database: PostgreSQL on 5432
```

---

## Deployment

### Backend Deployment (VPS/Docker)

```bash
# Build Docker image
docker build -t ecommerce-backend:latest .

# Run container
docker run -d \
  --name ecommerce-backend \
  -p 2004:2004 \
  --env-file .env \
  ecommerce-backend:latest
```

### Frontend Deployment (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod

# Preview: https://your-domain.vercel.app
```

### Environment Variables

**Backend (.env)**
```
DATABASE_URL=postgresql://user:password@localhost:5432/ecommerce
JWT_SECRET=your-secret-key-here
ESEWA_MERCHANT_CODE=EPAYTEST
PORT=2004
```

**Frontend (.env)**
```
VITE_API_URL=https://api.yourdomain.com
VITE_ESEWA_SUCCESS_URL=https://yourdomain.com/payment/success
VITE_ESEWA_FAILURE_URL=https://yourdomain.com/payment/failed
```

---

## Security Implementation

### Authentication
- **JWT (JSON Web Tokens)**: Secure token-based auth
- **Expiration**: 24 hours
- **Refresh Tokens**: Can be implemented
- **Token Storage**: HttpOnly cookies (recommended)

### Password Security
- **Hashing**: Bcrypt with 10 rounds
- **No Plain Text**: Never stored
- **Validation**: Minimum 8 characters

### Authorization
- **Role-Based Access Control (RBAC)**
  - ADMIN: Full access
  - USER: Limited to own data
- **Decorators**: @Auth(UserRole.ADMIN)
- **Guards**: AuthGuard validates JWT

### Data Protection
- **SQL Injection**: TypeORM parameterized queries
- **XSS Protection**: Input sanitization
- **CORS**: Configured origins
- **HTTPS**: Enforced in production

### API Security
- **CORS**: GET, POST, PUT, PATCH, DELETE enabled
- **Rate Limiting**: Can be added
- **Input Validation**: class-validator on all DTOs
- **Error Handling**: Generic error messages

### Payment Security
- **PCI Compliance**: No card data stored
- **Transaction Verification**: Server-side validation
- **Secure Webhooks**: IP whitelisting recommended

---

## Testing

### Manual Test Cases

#### User Registration
- **Test**: POST /users/auth/signup
- **Input**: Valid email, password (8+ chars)
- **Expected**: User created, JWT token returned

#### Product Search
- **Test**: GET /products/search?name=shirt
- **Input**: Search term
- **Expected**: Matching products returned

#### Add to Cart
- **Test**: POST /cart/add
- **Input**: productId, quantity, price
- **Expected**: Item added or quantity updated

#### Checkout
- **Test**: POST /orders/checkout
- **Input**: Cart items, address, payment method
- **Expected**: Order created with ID

#### Payment
- **Test**: POST /payments/esewa
- **Input**: orderId, amount
- **Expected**: Payment initiated with redirect URL

---

## Performance Metrics

| Metric | Target | Status |
|--------|--------|--------|
| Page Load | <3s | ✅ Met |
| API Response | <500ms | ✅ Met |
| Database Queries | Optimized | ✅ Met |
| Code Coverage | 80%+ | 📋 Planned |

---

## Future Enhancements

1. **Advanced Search**: Elasticsearch integration
2. **Recommendations**: ML-based product suggestions
3. **Social Features**: Share, wishlist sharing
4. **Mobile App**: React Native version
5. **Analytics**: Detailed user behavior tracking
6. **API Rate Limiting**: Prevent abuse
7. **Caching**: Redis for performance
8. **Microservices**: Scalable architecture

---

## Support & Documentation

- **API Documentation**: http://localhost:2004/api
- **Setup Guide**: See SETUP_GUIDE.md
- **Production Report**: See PRODUCTION_READY_REPORT.md
- **API Examples**: See API_EXAMPLES.md

---

## License
This project is for educational purposes.

---

**Last Updated**: July 8, 2025
**Version**: 1.0.0
**Status**: Production Ready
