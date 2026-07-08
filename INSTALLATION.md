# E-Commerce Platform - Installation Guide

## Prerequisites

- Node.js 16+ 
- PostgreSQL 12+
- npm or yarn

## Backend Setup

### 1. Navigate to Backend folder

```bash
cd Backend
npm install
```

### 2. Setup Environment Variables

Create a `.env` file in the Backend folder:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/ecommerce
JWT_SECRET=your_secret_key_here_change_this
PORT=2004
```

### 3. Setup Database with Prisma

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 4. Start Backend Server

```bash
npm run start:dev
```

Backend will run on: `http://localhost:2004`

## Frontend Setup

### 1. Navigate to Frontend folder

```bash
cd frontend
npm install
```

### 2. Setup Environment Variables

Create a `.env` file in the frontend folder:

```env
REACT_APP_API_URL=http://localhost:2004
```

### 3. Start Frontend Server

```bash
npm start
```

Frontend will run on: `http://localhost:3000`

## Database Schema

The Prisma schema includes:

- **User**: User accounts with JWT auth
- **Product**: Products with price and stock
- **CartItem**: Shopping cart items
- **Order**: Orders with status tracking
- **OrderItem**: Individual order items
- **Payment**: Payment transactions

## Testing the Application

1. Open `http://localhost:3000` in your browser
2. Create an account (signup)
3. Login with your credentials
4. Browse and add products to cart
5. Checkout with eSewa payment
6. View orders in your account

## Admin Access

Navigate to `http://localhost:3000/admin` to access the admin dashboard.

Admin Dashboard Features:
- Dashboard: View key metrics
- Products: Add/edit/delete products
- Orders: Manage and update order status
- Users: View and manage users
- Settings: Configure store settings

## Troubleshooting

### Database Connection Error
- Ensure PostgreSQL is running
- Check DATABASE_URL in .env
- Verify database exists

### Port Already in Use
- Backend: Change PORT in .env
- Frontend: `npm start -- --port 3001`

### Prisma Migration Failed
- Delete `prisma/migrations` folder
- Run `npx prisma migrate dev --name init` again

## Next Steps

1. Update `.env` with your actual values
2. Create API endpoints for core features
3. Update UI components as needed
4. Connect payment gateway
5. Deploy to production

## Support

For issues:
1. Check `.env` files are configured correctly
2. Ensure both servers are running
3. Check browser console for errors
4. Verify database connection
