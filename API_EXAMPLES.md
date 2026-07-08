# API Usage Examples - E-Commerce Platform

## Base URL
```
http://localhost:2004
```

## Authentication Header Format
```
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

---

## 1. Authentication Examples

### Register New User
```bash
curl -X POST http://localhost:2004/users/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePass123!",
    "name": "John Doe",
    "phoneNumber": "+977-9810000000",
    "address": "123 Main St, Kathmandu"
  }'
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1Njc4LWFiY2QtMTIzNC1hYmNkLTEyMzQ1Njc4YWJjZCIsImVtYWlsIjoiam9obkBleGFtcGxlLmNvbSIsImlhdCI6MTcyMDQwMDAwMCwiZXhwIjoxNzIwNDAzNjAwfQ.signature"
}
```

### Login
```bash
curl -X POST http://localhost:2004/users/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePass123!"
  }'
```

### Get Current User Profile
```bash
curl -X GET http://localhost:2004/users/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Response:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "john@example.com",
  "name": "John Doe",
  "phoneNumber": "+977-9810000000",
  "address": "123 Main St, Kathmandu",
  "role": "user",
  "isActive": true,
  "createdAt": "2026-07-08T10:30:00Z",
  "updatedAt": "2026-07-08T10:30:00Z"
}
```

### Logout
```bash
curl -X POST http://localhost:2004/users/auth/logout \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 2. Product Examples

### Get All Products (with Pagination)
```bash
curl -X GET "http://localhost:2004/products?page=1&limit=10&sortBy=createdAt&sortOrder=DESC"
```

**Response:**
```json
{
  "data": [
    {
      "id": "product-uuid-1",
      "categoryId": "category-uuid",
      "name": "MacBook Pro",
      "price": 150000,
      "description": "High-performance laptop",
      "imageUrls": ["https://example.com/macbook.jpg"],
      "variants": [
        {"color": "silver", "size": "14-inch", "stock": 5},
        {"color": "space-gray", "size": "16-inch", "stock": 3}
      ],
      "stock": 8,
      "isActive": true,
      "createdAt": "2026-07-08T10:00:00Z"
    }
  ],
  "total": 25,
  "page": 1,
  "limit": 10
}
```

### Search Products
```bash
curl -X GET "http://localhost:2004/products/search?name=laptop"
```

### Filter by Category
```bash
curl -X GET "http://localhost:2004/products/category/cat-uuid-123"
```

### Get Product Details
```bash
curl -X GET "http://localhost:2004/products/product-uuid-1"
```

### Create Product (Admin Only)
```bash
curl -X POST http://localhost:2004/products \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "iPhone 15",
    "categoryId": "cat-uuid-electronics",
    "price": 85000,
    "description": "Latest iPhone with advanced features",
    "imageUrls": ["https://example.com/iphone15.jpg"],
    "variants": [
      {"color": "black", "size": "128GB", "stock": 20},
      {"color": "white", "size": "256GB", "stock": 15},
      {"color": "gold", "size": "512GB", "stock": 10}
    ]
  }'
```

### Update Product (Admin Only)
```bash
curl -X PUT http://localhost:2004/products/product-uuid \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "price": 80000,
    "stock": 50
  }'
```

### Delete Product (Admin Only)
```bash
curl -X DELETE http://localhost:2004/products/product-uuid \
  -H "Authorization: Bearer ADMIN_TOKEN"
```

---

## 3. Shopping Cart Examples

### Get Cart
```bash
curl -X GET http://localhost:2004/cart \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Response:**
```json
[
  {
    "id": "cart-item-uuid",
    "userId": "user-uuid",
    "productId": "product-uuid",
    "quantity": 1,
    "price": 150000,
    "selectedVariant": "{\"color\":\"silver\",\"size\":\"14-inch\"}",
    "createdAt": "2026-07-08T11:00:00Z",
    "product": {
      "id": "product-uuid",
      "name": "MacBook Pro",
      "price": 150000
    }
  }
]
```

### Get Cart Summary
```bash
curl -X GET http://localhost:2004/cart/summary \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Response:**
```json
{
  "items": [...],
  "subtotal": 150000,
  "itemCount": 1
}
```

### Add Item to Cart
```bash
curl -X POST http://localhost:2004/cart/add \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "productId": "product-uuid",
    "quantity": 1,
    "price": 150000,
    "selectedVariant": "{\"color\":\"silver\",\"size\":\"14-inch\"}"
  }'
```

### Update Cart Item Quantity
```bash
curl -X PUT http://localhost:2004/cart/cart-item-uuid \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "quantity": 2
  }'
```

### Remove Item from Cart
```bash
curl -X DELETE http://localhost:2004/cart/cart-item-uuid \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Clear Entire Cart
```bash
curl -X DELETE http://localhost:2004/cart \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 4. Order Examples

### Create Order
```bash
curl -X POST http://localhost:2004/orders \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "orderItems": [
      {
        "productId": "product-uuid",
        "quantity": 1,
        "price": 150000
      }
    ],
    "shippingAddress": "123 Main St, Kathmandu, Nepal 44600",
    "billingAddress": "123 Main St, Kathmandu, Nepal 44600",
    "paymentMethod": "esewa",
    "discountAmount": 5000
  }'
```

**Response:**
```json
{
  "id": "order-uuid",
  "userId": "user-uuid",
  "subtotal": 150000,
  "taxAmount": 19500,
  "shippingCost": 150,
  "discountAmount": 5000,
  "totalAmount": 164650,
  "status": "pending",
  "paymentStatus": "pending",
  "paymentMethod": "esewa",
  "shippingAddress": "123 Main St, Kathmandu, Nepal 44600",
  "billingAddress": "123 Main St, Kathmandu, Nepal 44600",
  "orderDate": "2026-07-08T12:00:00Z",
  "orderItems": [...]
}
```

### Get My Orders
```bash
curl -X GET http://localhost:2004/orders/my-orders \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Get Order Details
```bash
curl -X GET http://localhost:2004/orders/order-uuid \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Update Order Status (Admin Only)
```bash
curl -X PUT http://localhost:2004/orders/order-uuid/status \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "shipped"
  }'
```

**Valid Status Values:**
- `pending` - Initial state
- `confirmed` - Payment successful
- `shipped` - Order dispatched
- `delivered` - Order received
- `cancelled` - Order cancelled

---

## 5. Payment Examples

### Create eSewa Payment
```bash
curl -X POST http://localhost:2004/payments/esewa \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "orderId": "order-uuid",
    "amount": 164650
  }'
```

**Response:**
```json
{
  "payment": {
    "id": "payment-uuid",
    "orderId": "order-uuid",
    "userId": "user-uuid",
    "amount": 164650,
    "method": "esewa",
    "status": "pending",
    "createdAt": "2026-07-08T12:05:00Z"
  },
  "redirectUrl": "https://uat.esewa.com.np/epay/main?amt=164650&pid=payment-uuid&..."
}
```

### Create Bank Payment
```bash
curl -X POST http://localhost:2004/payments/bank \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "orderId": "order-uuid",
    "amount": 164650,
    "accountNumber": "1234567890",
    "bankName": "Rastriya Banijya Bank"
  }'
```

### Verify Payment
```bash
curl -X POST http://localhost:2004/payments/verify/transaction-id \
  -H "Content-Type: application/json" \
  -d '{
    "status": "success"
  }'
```

### Get User Payments
```bash
curl -X GET http://localhost:2004/payments/user \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Get Order Payment
```bash
curl -X GET http://localhost:2004/payments/order/order-uuid \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 6. Wishlist Examples

### Add to Wishlist
```bash
curl -X POST http://localhost:2004/wishlist/add \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "productId": "product-uuid"
  }'
```

### Get Wishlist
```bash
curl -X GET http://localhost:2004/wishlist \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Remove from Wishlist
```bash
curl -X DELETE http://localhost:2004/wishlist/wishlist-item-uuid \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Move to Cart
```bash
curl -X POST http://localhost:2004/wishlist/wishlist-item-uuid/move-to-cart \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 7. Review Examples

### Create Review
```bash
curl -X POST http://localhost:2004/reviews \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "productId": "product-uuid",
    "rating": 4,
    "comment": "Great product, very satisfied with quality and delivery!"
  }'
```

### Get Product Reviews
```bash
curl -X GET http://localhost:2004/reviews/product/product-uuid
```

### Get Product Rating
```bash
curl -X GET http://localhost:2004/reviews/product/product-uuid/rating
```

**Response:**
```json
{
  "rating": 4.5
}
```

### Update Review
```bash
curl -X PUT http://localhost:2004/reviews/review-uuid \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "rating": 5,
    "comment": "Updated review: Excellent product!"
  }'
```

### Delete Review
```bash
curl -X DELETE http://localhost:2004/reviews/review-uuid \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 8. Admin Dashboard Examples

### Get Dashboard Statistics
```bash
curl -X GET http://localhost:2004/admin/dashboard/stats \
  -H "Authorization: Bearer ADMIN_TOKEN"
```

**Response:**
```json
{
  "totalOrders": 125,
  "totalUsers": 342,
  "totalProducts": 89,
  "totalRevenue": 5234500,
  "completedOrders": 110,
  "pendingOrders": 15,
  "successfulPayments": 110
}
```

### Get Recent Orders
```bash
curl -X GET "http://localhost:2004/admin/dashboard/recent-orders?limit=5" \
  -H "Authorization: Bearer ADMIN_TOKEN"
```

### Get Recent Users
```bash
curl -X GET "http://localhost:2004/admin/dashboard/recent-users?limit=10" \
  -H "Authorization: Bearer ADMIN_TOKEN"
```

### Get Order Statistics
```bash
curl -X GET http://localhost:2004/admin/dashboard/order-stats \
  -H "Authorization: Bearer ADMIN_TOKEN"
```

**Response:**
```json
{
  "all": 125,
  "pending": 15,
  "confirmed": 50,
  "shipped": 40,
  "delivered": 18,
  "cancelled": 2
}
```

### Get Payment Statistics
```bash
curl -X GET http://localhost:2004/admin/dashboard/payment-stats \
  -H "Authorization: Bearer ADMIN_TOKEN"
```

**Response:**
```json
{
  "totalPayments": 110,
  "successfulPayments": 105,
  "failedPayments": 3,
  "pendingPayments": 2
}
```

---

## Error Response Examples

### Validation Error
```json
{
  "statusCode": 400,
  "message": "Bad Request",
  "error": "Email must be a valid email"
}
```

### Unauthorized Error
```json
{
  "statusCode": 401,
  "message": "Unauthorized",
  "error": "No token provided"
}
```

### Forbidden Error
```json
{
  "statusCode": 403,
  "message": "Forbidden",
  "error": "Only admin users can access this resource"
}
```

### Not Found Error
```json
{
  "statusCode": 404,
  "message": "Not Found",
  "error": "Product with ID xyz not found"
}
```

### Conflict Error (Duplicate)
```json
{
  "statusCode": 409,
  "message": "Conflict",
  "error": "User with this email already exists"
}
```

---

## Test Data

### Test Admin Account
```
Email: admin@example.com
Password: AdminPass123!
```

### Test Regular User Account
```
Email: user@example.com
Password: UserPass123!
```

---

## Common Issues & Solutions

### "No token provided" Error
**Solution:** Include `Authorization: Bearer YOUR_TOKEN` header

### "Product already in wishlist" Error
**Solution:** Don't add same product twice; remove first then add again

### "Insufficient stock available" Error
**Solution:** Check available stock with GET /products/:id

### "Invalid rating value" Error
**Solution:** Rating must be between 1 and 5

### CORS Error
**Solution:** API supports all HTTP methods; check frontend origin

---

**API Documentation Complete**
Swagger Docs available at: http://localhost:2004/api
