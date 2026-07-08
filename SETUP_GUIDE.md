# Quick Setup Guide - Production Ready E-Commerce API

## Prerequisites
- Node.js 18+
- PostgreSQL 15+
- Docker & Docker Compose (optional, for containerized setup)
- Git

---

## Option 1: Local Setup (Recommended for Development)

### 1. Install Dependencies
```bash
cd Backend
npm install
```

### 2. Configure Environment
```bash
# Create .env file from template
cp .env.example .env

# Edit .env with your values:
export DB_TYPE=postgres
export DB_HOST=localhost
export DB_PORT=5432
export DB_USERNAME=postgres
export DB_PASSWORD=root
export DB_DATABASE=ecommerce
export JWT_SECRET=your_super_secret_key_here_use_openssl_rand_base64_32
export PORT=2004
```

### 3. Start PostgreSQL
```bash
# On Linux/Mac:
brew install postgresql
brew services start postgresql

# Or use Docker:
docker run --name ecommerce_db -e POSTGRES_PASSWORD=root -e POSTGRES_DB=ecommerce -p 5432:5432 -d postgres:15-alpine
```

### 4. Start the Application
```bash
npm run start:dev
```

You should see: `Server running on port 2004`

### 5. Access the API
- **Swagger Docs:** http://localhost:2004/api
- **API Base:** http://localhost:2004

---

## Option 2: Docker Compose (Recommended for Production)

### 1. Build & Start Containers
```bash
docker-compose up --build
```

### 2. Verify Services
- API: http://localhost:2004
- Database: localhost:5432
- Swagger: http://localhost:2004/api

---

## Database Setup

### Manual Migration (if synchronize:false)
```bash
# Connect to PostgreSQL
psql -U postgres -d ecommerce

# Create tables (or use a migration tool)
# The application will auto-create tables on first run with synchronize:true
```

### Reset Database
```bash
docker-compose down
docker-compose up -d db
npm run start:dev
```

---

## Testing the API

### 1. Register a User
```bash
curl -X POST http://localhost:2004/users/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "Password123",
    "name": "John Doe"
  }'
```

Response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 2. Store Token
```bash
export TOKEN="your_token_here"
```

### 3. Get Current User
```bash
curl -X GET http://localhost:2004/users/auth/me \
  -H "Authorization: Bearer $TOKEN"
```

### 4. Create a Product (Admin)
First, create an admin user in database or modify user role.

```bash
curl -X POST http://localhost:2004/products \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Laptop",
    "categoryId": "category-uuid",
    "price": 50000,
    "description": "High-performance laptop",
    "variants": [
      {"color": "black", "size": "15inch", "stock": 10}
    ]
  }'
```

### 5. Get Products
```bash
curl -X GET "http://localhost:2004/products?page=1&limit=10&search=laptop"
```

### 6. Add to Cart
```bash
curl -X POST http://localhost:2004/cart/add \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "productId": "product-uuid",
    "quantity": 1,
    "price": 50000
  }'
```

### 7. Create Order
```bash
curl -X POST http://localhost:2004/orders \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "orderItems": [
      {"productId": "product-uuid", "quantity": 1, "price": 50000}
    ],
    "shippingAddress": "123 Main St, City, Country 12345",
    "paymentMethod": "esewa"
  }'
```

---

## Key Endpoints

### Authentication
```
POST   /users/auth/signup              # Register
POST   /users/auth/login               # Login
POST   /users/auth/logout              # Logout
GET    /users/auth/me                  # Current user
```

### Products
```
GET    /products                        # List (with pagination)
GET    /products/search?name=           # Search
GET    /products/:id                    # Details
POST   /products                        # Create (ADMIN)
PUT    /products/:id                    # Update (ADMIN)
DELETE /products/:id                    # Delete (ADMIN)
```

### Cart
```
GET    /cart                            # Get cart
GET    /cart/summary                    # Cart summary
POST   /cart/add                        # Add item
PUT    /cart/:id                        # Update quantity
DELETE /cart/:id                        # Remove item
DELETE /cart                            # Clear cart
```

### Orders
```
GET    /orders/my-orders                # User's orders
GET    /orders/:id                      # Order details
POST   /orders                          # Create order
PUT    /orders/:id/status               # Update status (ADMIN)
```

### Payments
```
POST   /payments/esewa                  # eSewa payment
POST   /payments/bank                   # Bank transfer
GET    /payments/user                   # User payments
POST   /payments/verify/:transactionId  # Verify payment
```

### Admin
```
GET    /admin/dashboard/stats           # Statistics
GET    /admin/dashboard/recent-orders   # Recent orders
GET    /admin/dashboard/order-stats     # Order breakdown
GET    /admin/dashboard/payment-stats   # Payment stats
```

---

## Troubleshooting

### Port Already in Use
```bash
# Find process using port 2004
lsof -i :2004
# Kill it
kill -9 <PID>
```

### Database Connection Error
```bash
# Check PostgreSQL is running
psql -U postgres -d ecommerce -c "SELECT 1"

# Verify environment variables
echo $DB_HOST $DB_PORT $DB_USERNAME $DB_PASSWORD
```

### JWT Token Expired
- Tokens expire after 1 hour (configurable in config)
- Register/login again to get new token
- Change `JWT_EXPIRES_IN` in config to extend

### CORS Issues
- API CORS is enabled for all origins in development
- For production, specify allowed origins in main.ts

---

## Production Checklist

- [ ] Set `JWT_SECRET` to strong random value: `openssl rand -base64 32`
- [ ] Update `DB_PASSWORD` to secure value
- [ ] Configure real Cloudinary credentials
- [ ] Setup eSewa merchant code with actual account
- [ ] Enable HTTPS/SSL certificates
- [ ] Configure production database backups
- [ ] Setup monitoring and logging
- [ ] Test all payment flows
- [ ] Setup CI/CD pipeline
- [ ] Configure firewall rules
- [ ] Enable database connection pooling

---

## Development Commands

```bash
# Start development server
npm run start:dev

# Start production build
npm run build
npm run start:prod

# Run tests
npm run test

# Check code style
npm run lint

# Format code
npm run lint -- --fix
```

---

## Need Help?

- Check Swagger documentation: http://localhost:2004/api
- Review PRODUCTION_READY_REPORT.md for detailed information
- Check logs for error messages
- Ensure all environment variables are set

---

**Status:** Production Ready ✅
**Last Updated:** July 8, 2026
