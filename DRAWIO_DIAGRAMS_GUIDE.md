# Comprehensive Draw.io Diagrams Guide for E-Commerce Platform

## Quick Reference
All diagrams use standard draw.io tools. No plugins needed. File format: `.drawio` (XML-based, can be opened in draw.io)

---

## Figure 2.1: System Architecture Diagram

### Purpose
Shows all major system components and how they communicate at a high level.

### Canvas Setup
- **Canvas Size**: 1600 x 1000 px
- **Grid**: Enabled (20px grid)
- **Background**: Light gray (#f5f5f5)

### Exact Placement Guide

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                            │
│  ┌──────────────┐              ┌──────────────┐                │
│  │ Web Browser  │              │  Mobile App  │                │
│  │  (React)     │              │   (React)    │                │
│  └──────┬───────┘              └──────┬───────┘                │
│         │                             │                         │
│         └──────────────┬──────────────┘                         │
│                        │                                         │
│                   HTTPS/REST                                    │
│                        │                                         │
├────────────────────────┼──────────────────────────────────────┤
│                    API GATEWAY LAYER                            │
│            ┌─────────────────────────────┐                     │
│            │    NestJS API Server        │                     │
│            │  (Port 2004)                │                     │
│            │  - Authentication           │                     │
│            │  - Rate Limiting            │                     │
│            │  - CORS                     │                     │
│            └────────┬────────────────────┘                     │
│                     │                                           │
├─────────────────────┼────────────────────────────────────────┤
│              BUSINESS LOGIC LAYER                               │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐           │
│  │ Auth Module  │ │ Product Mod  │ │  Cart Mod    │           │
│  └──────────────┘ └──────────────┘ └──────────────┘           │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐           │
│  │ Order Module │ │Payment Module│ │  Admin Mod   │           │
│  └──────────────┘ └──────────────┘ └──────────────┘           │
│                     │                                           │
├─────────────────────┼────────────────────────────────────────┤
│              DATA ACCESS LAYER                                  │
│         ┌────────────────────────────┐                         │
│         │    TypeORM (Database)      │                         │
│         └────────────┬───────────────┘                         │
│                      │                                          │
├──────────────────────┼──────────────────────────────────────┤
│              PERSISTENCE LAYER                                  │
│  ┌──────────────────┐    ┌───────────────────┐               │
│  │  PostgreSQL DB   │    │  Blob Storage     │               │
│  │  (Data)          │    │  (Images/Files)   │               │
│  └──────────────────┘    └───────────────────┘               │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

                    EXTERNAL SERVICES
         ┌──────────────────┬──────────────────┐
         │   eSewa Gateway  │  Bank Transfer   │
         └──────────────────┴──────────────────┘
```

### Draw.io Steps

1. **Create Containers** (Use Rectangle shape with dashed border)
   - CLIENT LAYER: Top-left (100, 50) to (1500, 150)
   - API GATEWAY: (100, 180) to (1500, 280)
   - BUSINESS LOGIC: (100, 310) to (1500, 450)
   - DATA ACCESS: (100, 480) to (1500, 560)
   - PERSISTENCE: (100, 590) to (1500, 750)

2. **Add Components** (Use Rectangle with solid border)
   - Web Browser: (150, 70) - size 200x50
   - Mobile App: (420, 70) - size 200x50
   - NestJS Server: (200, 200) - size 1200x60
   - Auth Module: (150, 330) - size 180x80
   - Product Module: (420, 330) - size 180x80
   - Cart Module: (690, 330) - size 180x80
   - Order Module: (960, 330) - size 180x80
   - Payment Module: (1230, 330) - size 180x80
   - PostgreSQL: (200, 610) - size 400x100
   - Blob Storage: (700, 610) - size 400x100

3. **Add Connectors**
   - From Web/Mobile → NestJS: Solid arrows, label "HTTPS/REST"
   - From NestJS → All modules: Solid arrows
   - From all modules → TypeORM: Solid arrows
   - From TypeORM → DB/Storage: Solid arrows

4. **Add Labels**
   - Use Text tool
   - Layer names at left edge
   - Font: 12pt bold for layer names
   - Font: 10pt regular for component labels

5. **Color Coding**
   - CLIENT LAYER: Light Blue (#E3F2FD)
   - API GATEWAY: Light Green (#E8F5E9)
   - BUSINESS LOGIC: Light Yellow (#FFFDE7)
   - DATA ACCESS: Light Orange (#FFF3E0)
   - PERSISTENCE: Light Red (#FFEBEE)
   - External Services: Gray (#EEEEEE)

---

## Figure 2.2: Context Diagram

### Purpose
Shows the system as a single box with external entities it interacts with.

### Canvas Setup
- **Canvas Size**: 1200 x 800 px
- **Background**: White

### Exact Placement Guide

```
                    ┌─────────────────────┐
                    │     External API    │
                    │ (eSewa, Banks)      │
                    └─────────┬───────────┘
                              │
                              │ Payment
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        │                     ▼                     │
    ┌───────┐           ┌──────────────┐       ┌────────┐
    │ Users │◄──────────►│   E-Commerce ├──────►│  Bank  │
    │(Admin)│   Auth    │   Platform   │ Verify│ System │
    └───────┘           │              │       └────────┘
        │                │              │
        │ Manage         │              │ Email
        │ Products       │              │ Service
        │                └──────┬───────┘
        │                       │
        ▼                       ▼
    ┌─────────────┐       ┌──────────────┐
    │  Customers  │◄──────│  Database    │
    │  (Browse,   │       │  (Store)     │
    │   Order)    │       └──────────────┘
    └─────────────┘
```

### Draw.io Steps

1. **Main System** (Center)
   - Rectangle (400, 200) to (800, 400)
   - Fill: Light cyan (#B3E5FC)
   - Text: "E-Commerce Platform\n(All Modules)"
   - Font: 14pt bold

2. **External Entities** (Around the system)
   
   a. **Users (Admin)** - Top left
      - Circle at (150, 150) radius 50
      - Label: "Admin Users"
      - Color: Light green (#C8E6C9)
   
   b. **Customers** - Bottom left
      - Circle at (150, 450) radius 50
      - Label: "Customers"
      - Color: Light blue (#BBDEFB)
   
   c. **Payment Gateway** - Top right
      - Rectangle (950, 100) to (1050, 200)
      - Label: "eSewa & Banks"
      - Color: Light orange (#FFE0B2)
   
   d. **Email Service** - Right
      - Rectangle (950, 250) to (1050, 350)
      - Label: "Email Service"
      - Color: Light purple (#E1BEE7)
   
   e. **Database** - Right bottom
      - Cylinder (950, 400) to (1050, 500)
      - Label: "Database"
      - Color: Light yellow (#F0F4C3)

3. **Connectors**
   - Admin ↔ System: Double arrow, label "Manage Products\nView Reports"
   - Customers ↔ System: Double arrow, label "Browse\nOrder"
   - System → Payment: Arrow, label "Process Payment"
   - System → Email: Arrow, label "Notifications"
   - System ↔ Database: Double arrow, label "Read/Write"

4. **Line Styles**
   - Admin User: Thick solid line (3pt)
   - Customers: Thick solid line (3pt)
   - External Services: Dashed line (2pt)

---

## Figure 2.3: Level 0 Data Flow Diagram (DFD)

### Purpose
Shows the highest level of data flow - main processes and data stores.

### Canvas Setup
- **Canvas Size**: 1400 x 900 px
- **Grid**: Enabled

### Exact Placement Guide

```
                    ┌──────────────────┐
                    │  Users (Admin)   │
                    └────────┬─────────┘
                             │
                    Data: Products
                    Admin Actions
                             │
                             ▼
        ┌────────────────────────────────────────┐
        │      Main E-Commerce Process (0)       │
        │                                         │
        │  • User Management                      │
        │  • Product Management                   │
        │  • Order Processing                     │
        │  • Payment Processing                   │
        │  • Inventory Management                 │
        │                                         │
        └────────────────────────────────────────┘
         │                  │                │
         │                  │                │
    Product  Orders        Payment        Wishlist
    Listings Notification  Status         & Reviews
         │                  │                │
         ▼                  ▼                ▼
    ┌─────────┐        ┌─────────┐    ┌─────────┐
    │Customers│        │ Payment │    │Reviews/ │
    │         │        │ Gateway │    │Wishlist │
    └─────────┘        └─────────┘    └─────────┘
         │
    Data: Product
    Orders, Cart
         │
         ▼
    ┌──────────────────┐
    │   All Databases  │
    │  (Products, Orders,
    │   Users, Payments)
    └──────────────────┘
```

### Draw.io Steps

1. **External Entities** (Terminator - circles/ovals)
   - Admin Users: (100, 50) to (300, 100) - Oval
   - Customers: (100, 750) to (300, 800) - Oval
   - Payment Gateway: (1050, 350) to (1250, 400) - Oval

2. **Main Process** (Circle or rounded rectangle)
   - (500, 300) to (900, 500)
   - Circle shape, diameter 400px, centered at (700, 400)
   - Label: "0"
   - Text: "E-Commerce\nSystem"
   - Font size: 16pt

3. **Data Flows** (Arrows)
   - Admin → Process: (300, 75) to (500, 350) - Arrows
   - Process → Customers: (700, 500) to (200, 775)
   - Process → Payment: (900, 400) to (1050, 375)
   - Label each arrow with data type (10pt, italic)

4. **Data Stores** (Rectangle with parallel lines top/bottom)
   - Products DB: (500, 600) to (700, 650)
   - Orders DB: (750, 600) to (950, 650)
   - Draw with top and bottom parallel lines (3pt)
   - Label: "D1: Products" and "D2: Orders"

5. **Connections to Data Stores**
   - Process ↔ Each DB: Arrows labeled "Read/Write"
   - Font: 9pt

---

## Figure 2.4: Level 1 Data Flow Diagram

### Purpose
Expands the Level 0 main process into detailed sub-processes.

### Canvas Setup
- **Canvas Size**: 1600 x 1000 px

### Exact Placement Guide

```
                                         ┌──────────────┐
                                         │  User Data   │
                                         └──────┬───────┘
        ┌────────────┐                          │
        │  Users     │◄─────────────────────────┤
        │(Admin)     │                          │
        └────┬───────┘                          │
             │                                  │
             │ Product Info              ┌─────▼──────┐
             │                           │   1.0      │
             ▼                           │ User Mgmt   │
    ┌────────────────┐                   └─────┬──────┘
    │      1.0       │                         │
    │  Auth & User   ├─────────────────────────┼─────────────┐
    │  Management    │                         │             │
    └────────┬───────┘                         │             │
             │                                 ▼             │
             │ Login/Logout        ┌──────────────────┐     │
             │ Register             │      2.0        │     │
             │                      │ Product Browse  │     │
             ▼                      │ & Management    │     │
    ┌────────────────┐             └────────┬────────┘     │
    │      3.0       │                      │              │
    │ Shopping Cart  ├──────────────────────┼──────────────┤
    │ Management     │                      │              │
    └────────┬───────┘                      │              │
             │                              ▼              │
             │ Cart Items         ┌──────────────────┐     │
             │ Total              │      4.0        │     │
             │                    │ Order Processing│     │
             ▼                    └────────┬────────┘     │
    ┌────────────────┐                    │              │
    │      5.0       │                    ▼              │
    │ Payment        ├──────────────────────────────────┤
    │ Processing     │                                  │
    └────────┬───────┘                    ▼              │
             │                   ┌──────────────────┐    │
             │                   │      6.0        │    │
             │                   │ Wishlist &      │    │
             │                   │ Reviews Mgmt    │    │
             │                   └────────┬────────┘    │
             │                           │              │
             └───────────────────────────┴──────────────┘
                                 │
                                 ▼
                    ┌────────────────────────┐
                    │   All Data Stores      │
                    │ (Users, Products,      │
                    │  Orders, Payments)     │
                    └────────────────────────┘
```

### Draw.io Steps

1. **Create 6 Sub-Processes** (Circles numbered 1.0 to 6.0)
   - Process 1.0: Auth & User Management - (150, 150) radius 70
   - Process 2.0: Product Browse & Mgmt - (450, 150) radius 70
   - Process 3.0: Shopping Cart - (150, 450) radius 70
   - Process 4.0: Order Processing - (450, 450) radius 70
   - Process 5.0: Payment Processing - (150, 750) radius 70
   - Process 6.0: Wishlist & Reviews - (450, 750) radius 70

2. **External Entities**
   - Users (Admin): (100, 50) to (250, 100)
   - Customers: (900, 50) to (1050, 100)
   - Payment Gateway: (1250, 450) to (1400, 500)

3. **Data Flows Between Processes**
   - 1.0 → 2.0: Horizontal arrow, label "User Status"
   - 2.0 → 3.0: Diagonal arrow, label "Product Info"
   - 3.0 → 4.0: Horizontal arrow, label "Cart Items"
   - 4.0 → 5.0: Diagonal arrow, label "Order Details"
   - 5.0 → 6.0: Horizontal arrow, label "Payment Status"
   - 6.0 → 2.0: Feedback loop, label "Reviews"

4. **External Data Flows**
   - Users → 1.0: Arrow, label "Login/Register"
   - 2.0 → Customers: Arrow, label "Product List"
   - 4.0 → Payment Gateway: Arrow, label "Payment Request"
   - Payment Gateway → 5.0: Arrow, label "Payment Status"

5. **Data Stores** (Rectangle with parallel lines)
   - Position: (900, 700) to (1100, 750)
   - Label: "D: Database"

---

## Figure 2.5: Use Case Diagram

### Purpose
Shows what different actors can do with the system.

### Canvas Setup
- **Canvas Size**: 1400 x 1000 px

### Exact Placement Guide

```
                    ┌──────────────┐
                    │ Admin Users  │
                    └───────┬──────┘
                            │
                            │ manages
                            │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
        │         ┌──────────▼──────────┐        │
        │         │  Manage Products   │        │
        │         └────────────────────┘        │
        │                                        │
        │         ┌────────────────────┐        │
        │         │  Manage Categories│        │
        │         └────────────────────┘        │
        │                                        │
        │         ┌────────────────────┐        │
        │         │  View Analytics    │        │
        │         └────────────────────┘        │
        │                                        │
        │         ┌────────────────────┐        │
        └────────►│ Manage Orders      │        │
                  └────────────────────┘        │
                                                │
                  ┌─────────────────────────┐   │
                  │   E-COMMERCE SYSTEM     │   │
                  │                         │   │
                  │  ┌───────────────────┐ │   │
                  │  │  Browse Products  │ │   │
                  │  └───────────────────┘ │   │
                  │  ┌───────────────────┐ │   │
                  │  │  Add to Cart      │ │   │
                  │  └───────────────────┘ │   │
                  │  ┌───────────────────┐ │   │
                  │  │  Checkout         │ │   │
                  │  └───────────────────┘ │   │
                  │  ┌───────────────────┐ │   │
                  │  │  Make Payment     │ │   │
                  │  └───────────────────┘ │   │
                  │  ┌───────────────────┐ │   │
                  │  │  Track Order      │ │   │
                  │  └───────────────────┘ │   │
                  │  ┌───────────────────┐ │   │
                  │  │  Leave Review     │ │   │
                  │  └───────────────────┘ │   │
                  │  ┌───────────────────┐ │   │
                  │  │  Add to Wishlist  │ │   │
                  │  └───────────────────┘ │   │
                  │                         │   │
                  └─────────────────────────┘   │
                                                │
                            ┌───────────────────┘
                            │ uses
                            │
                    ┌───────▼──────┐
                    │   Customers  │
                    └──────────────┘

                    ┌──────────────┐
                    │Payment System│
                    └──────────────┘
```

### Draw.io Steps

1. **Create System Boundary** (Rectangle)
   - (400, 150) to (950, 850)
   - Border: Solid 2pt black
   - Fill: White or very light background
   - Label: "E-Commerce System" - top-left corner (10pt bold)

2. **Actors** (Stick figures - use Ellipse + Line)
   - Admin Users: (100, 200) - Ellipse 50x50, label below
   - Customers: (100, 550) - Ellipse 50x50, label below
   - Payment System: (1200, 400) - Ellipse 50x50, label below

3. **Use Cases** (Ovals inside system)
   - All use cases are Ellipse shapes, 120x50
   
   **Top row (Admin only):**
   - Manage Products: (500, 200)
   - Manage Categories: (700, 200)
   - View Analytics: (900, 200)
   
   **Middle row (Shared/Admin):**
   - Manage Orders: (700, 350)
   
   **Customer use cases (centered):**
   - Browse Products: (500, 400)
   - Add to Cart: (700, 400)
   - Checkout: (900, 400)
   - Make Payment: (500, 550)
   - Track Order: (700, 550)
   - Leave Review: (900, 550)
   - Add to Wishlist: (500, 700)
   - View Notifications: (700, 700)

4. **Actor Associations** (Solid lines)
   - Admin → Manage Products: Line
   - Admin → Manage Categories: Line
   - Admin → View Analytics: Line
   - Admin → Manage Orders: Line
   - Customers → Browse Products: Line
   - Customers → Add to Cart: Line
   - Customers → Checkout: Line
   - Customers → Make Payment: Line
   - Customers → Track Order: Line
   - Customers → Leave Review: Line
   - Customers → Add to Wishlist: Line
   - Payment System → Make Payment: Line

5. **Include/Extend Relationships** (Dashed arrows with stereotype)
   - Browse Products ◄──include── Add to Cart
   - Add to Cart ◄──include── Checkout
   - Checkout ◄──include── Make Payment
   - Make Payment ──extend──► Send Confirmation (optional)
   - Label: "<<include>>" or "<<extend>>" (10pt, italic)

---

## Figure 2.6: Activity Diagram

### Purpose
Shows the flow of activities for a key process (e.g., Order Placement).

### Canvas Setup
- **Canvas Size**: 1000 x 1400 px
- **Direction**: Vertical top-to-bottom

### Exact Placement Guide

```
                        ┌─────┐
                        │Start│
                        └──┬──┘
                           │
                           ▼
                    ┌─────────────────┐
                    │  User Log In    │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────────┐
                    │ Browse Products     │
                    └────────┬────────────┘
                             │
                             ▼
                    ┌─────────────────────┐
                    │  Add to Cart        │
                    └────────┬────────────┘
                             │
                             ▼
                      ┌──────────────┐
                      │ More Items?  │◄────┐
                      └──┬──────┬───┘      │
                         │      │         │
                        Yes    No         │
                         │      │         │
                         └──────┼─────────┘
                                │
                                ▼
                      ┌──────────────────┐
                      │  Proceed to      │
                      │  Checkout        │
                      └────────┬─────────┘
                               │
                               ▼
                      ┌──────────────────┐
                      │  Enter Shipping  │
                      │  Address         │
                      └────────┬─────────┘
                               │
                               ▼
                      ┌──────────────────┐
                      │  Select Payment  │
                      │  Method          │
                      └────────┬─────────┘
                               │
                               ▼
                      ┌──────────────────┐
                      │  Process Payment │
                      └────────┬─────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ Payment Successful? │
                    └──┬──────────┬───────┘
                       │          │
                      Yes        No
                       │          │
                       │          ▼
                       │   ┌──────────────┐
                       │   │ Show Error   │
                       │   │ Retry?       │
                       │   └──┬──────┬────┘
                       │      │      │
                       │     Yes    No
                       │      │      │
                       │      │      └──────────┐
                       │      │                 │
                       │      └──────┐          │
                       │             │          │
                       ▼             ▼          ▼
                   ┌────────────┐  ┌──────────────────┐
                   │Confirm     │  │ Order Cancelled  │
                   │Order       │  └──────────────────┘
                   └────┬───────┘         │
                        │                 │
                        │   ┌─────────────┘
                        │   │
                        ▼   ▼
                      ┌───────┐
                      │ End   │
                      └───────┘
```

### Draw.io Steps

1. **Start/End** (Circle - use filled circle)
   - Start: (480, 30) radius 20
   - End: (480, 1350) radius 20

2. **Activities** (Rectangle with rounded corners)
   - All activities are 200x50
   - User Log In: (380, 80)
   - Browse Products: (380, 150)
   - Add to Cart: (380, 220)
   - Proceed to Checkout: (380, 370)
   - Enter Shipping Address: (380, 440)
   - Select Payment Method: (380, 510)
   - Process Payment: (380, 580)
   - Confirm Order: (380, 720)
   - Order Cancelled: (600, 720)

3. **Decision Points** (Diamond shape)
   - More Items?: (400, 290) size 150x100
   - Payment Successful?: (400, 650) size 150x100
   - Retry?: (700, 700) size 150x100

4. **Transitions** (Arrows)
   - All arrows: solid line, 2pt
   - Between sequential activities: straight down
   - From decision (More Items): 
     - Yes → back to Add to Cart (loop left)
     - No → to Checkout (down)
   - From decision (Payment Successful):
     - Yes → to Confirm Order
     - No → to Retry

5. **Labels on Arrows**
   - "Yes" or "No" labels on decision branches
   - Font: 9pt regular, positioned near arrow

6. **Swimlanes** (Optional - add vertical rectangles for actors)
   - User Lane: (50, 0) to (350, 1350)
   - System Lane: (350, 0) to (700, 1350)
   - Payment Lane: (700, 0) to (1000, 1350)
   - Assign activities to respective lanes

---

## Figure 2.7: Sequence Diagram

### Purpose
Shows interactions between objects over time for a specific scenario (e.g., Payment Processing).

### Canvas Setup
- **Canvas Size**: 1400 x 1000 px
- **Direction**: Horizontal timeline

### Exact Placement Guide

```
Time →

Actor        Frontend       API Server     DB          Payment
                                                        Gateway
 │              │               │          │              │
 │              │               │          │              │
 │─ Click ─────►│               │          │              │
 │             Pay              │          │              │
 │              │─ POST /pay ───►│          │              │
 │              │               │          │              │
 │              │               │ INSERT ──►│              │
 │              │               │ (order)   │              │
 │              │               │          │              │
 │              │               ├──────────►│              │
 │              │               │           │              │
 │              │               ├─────────────────────────►│
 │              │               │ Init ESewa                │
 │              │               │           │   Verify    │
 │              │               │           │◄────────────│
 │              │               │           │              │
 │              │◄─ 200 OK ─────│           │              │
 │◄─ Redirect ──│ (redirect_url) │          │              │
 │              │               │          │              │
 │ Redirect to  │               │          │              │
 │ ESewa        │               │          │              │
 │              │               │          │              │
 │─────────────────────────────────────────────►           │
 │              │               │          │              │
 │              │               │          │   Payment    │
 │              │               │          │   Success    │
 │              │               │          │◄─────────────│
 │              │               │          │              │
 │              │◄─ Webhook ────────────────────────────────│
 │              │ (status: success)                       │
 │              │               │ UPDATE ──►│              │
 │              │               │ (payment) │              │
 │              │               │          │              │
 │◄─ Redirect ──│               │          │              │
 │  (Success)   │               │          │              │
 │              │               │          │              │
```

### Draw.io Steps

1. **Create Actor/System Headers** (Rectangles at top)
   - All at y=20, height=40
   - Actor: (100, 20) to (150, 60), label "Actor"
   - Frontend: (300, 20) to (350, 60), label "Frontend"
   - API: (500, 20) to (550, 60), label "API Server"
   - Database: (700, 20) to (750, 60), label "DB"
   - Payment: (900, 20) to (950, 60), label "Payment"

2. **Create Lifelines** (Vertical dashed lines)
   - From each header, extend down to bottom
   - x-coordinates: 125, 325, 525, 725, 925
   - Dashed line style
   - Extends from y=60 to y=900

3. **Create Messages** (Arrows between lifelines)
   
   Message 1: User → Frontend
   - From (125, 100) to (325, 100)
   - Solid arrow, label "Click Pay" (9pt)
   
   Message 2: Frontend → API
   - From (325, 150) to (525, 150)
   - Solid arrow, label "POST /payments" (9pt)
   
   Message 3: API → Database
   - From (525, 200) to (725, 200)
   - Solid arrow, label "INSERT order" (9pt)
   
   Message 4: API → Payment Gateway
   - From (525, 250) to (925, 250)
   - Solid arrow, label "Initialize Payment" (9pt)
   
   Message 5: Payment → API (Async)
   - From (925, 350) to (525, 350)
   - Dashed arrow, label "Webhook: status=success" (9pt)
   
   Message 6: API → Database (Update)
   - From (525, 400) to (725, 400)
   - Solid arrow, label "UPDATE payment_status" (9pt)
   
   Message 7: API → Frontend (Return)
   - From (525, 450) to (325, 450)
   - Dashed arrow, label "200 OK" (9pt)
   
   Message 8: Frontend → User
   - From (325, 500) to (125, 500)
   - Dashed arrow, label "Redirect to Success" (9pt)

4. **Add Activation Boxes** (Thin rectangles on lifelines)
   - When an object is actively processing
   - Above API lifeline, y=150 to y=450, width 5
   - Above DB lifeline, y=200 to y=410, width 5
   - Color: Light gray (#CCCCCC)

5. **Add Note Boxes** (For important information)
   - Position: (550, 80) to (700, 130)
   - Background: Light yellow (#FFFFCC)
   - Text: "Order created with\npending status" (8pt)

---

## Figure 2.8: System Flowchart

### Purpose
Shows the overall flow of the system with decision points and processes.

### Canvas Setup
- **Canvas Size**: 1200 x 1200 px

### Exact Placement Guide

```
                        START
                          │
                          ▼
                    ┌──────────────┐
                    │ User Opens   │
                    │  App         │
                    └──────┬───────┘
                           │
                           ▼
                    ┌──────────────┐
                    │  Is User     │◄──────┐
                    │  Logged In?  │       │
                    └──┬───────┬───┘       │
                       │       │          │
                      No     Yes          │
                       │       │          │
                       ▼       │          │
                  ┌────────┐   │          │
                  │ Login/ │   │          │
                  │Register│   │          │
                  └────┬───┘   │          │
                       │       │          │
                       └───┬───┘          │
                           │             │
                           ▼             │
                    ┌──────────────┐     │
                    │ Load Home    │     │
                    │ Page         │     │
                    └──────┬───────┘     │
                           │            │
                           ▼            │
                    ┌──────────────────┐ │
                    │ Select Action    │ │
                    │ Browse | Cart |  │ │
                    │ Checkout | Etc   │ │
                    └──┬──┬──┬────┬────┘ │
                   /   │  │  │    \      │
              Browse   │  │  │    Checkout
                 /     │  │  │         \
                ▼      ▼  ▼  ▼          ▼
           ┌────────┐ ┌────────┐    ┌─────────┐
           │Browse  │ │ Cart   │    │  Check  │
           │Products│ │Mgmt    │    │  out    │
           └────┬───┘ └────┬───┘    └────┬────┘
                │          │             │
                │          └──────┬──────┘
                │                 │
                └─────────┬───────┘
                          │
                          ▼
                    ┌──────────────┐
                    │ Any Issues?  │
                    └──┬───────┬───┘
                       │       │
                      Yes     No
                       │       │
                       ▼       │
                  ┌────────┐   │
                  │ Handle │   │
                  │  Error │   │
                  └────┬───┘   │
                       │       │
                       └───┬───┘
                           │
                           ▼
                    ┌──────────────┐
                    │ Process      │
                    │ Complete?    │
                    └──┬───────┬───┘
                       │       │
                      Yes     No
                       │       │
                       │       └─ Loop back
                       │          to "Select Action"
                       │
                       ▼
                    ┌──────────────┐
                    │ Show Results │
                    └──────┬───────┘
                           │
                           ▼
                        END
```

### Draw.io Steps

1. **Terminal Symbols** (Oval/ellipse)
   - Start: (550, 20) to (650, 70)
   - End: (550, 1100) to (650, 1150)
   - Color: Light green (#C8E6C9)

2. **Process Symbols** (Rectangle)
   - User Opens App: (500, 100) to (700, 150)
   - Load Home Page: (500, 300) to (700, 350)
   - Browse Products: (300, 550) to (450, 600)
   - Cart Management: (500, 550) to (650, 600)
   - Checkout: (700, 550) to (850, 600)
   - Handle Error: (800, 700) to (950, 750)
   - Process Complete: (500, 850) to (700, 900)
   - Show Results: (500, 950) to (700, 1000)

3. **Decision Symbols** (Diamond)
   - Is User Logged In?: (550, 200) to (650, 280)
   - Select Action: (550, 450) to (650, 530)
   - Any Issues?: (550, 750) to (650, 830)

4. **Connectors** (Arrows)
   - Vertical flows: straight down, 2pt solid
   - Decision branches: split at diamond
   - Yes/No labels: 9pt, positioned above/beside arrow

5. **Color Coding**
   - Start/End: Green (#C8E6C9)
   - Processes: Blue (#BBDEFB)
   - Decisions: Yellow (#FFF9C4)
   - Error Handling: Red (#FFCDD2)

---

## Figure 2.9: Entity Relationship Diagram (ERD)

### Purpose
Shows database tables and relationships between them.

### Canvas Setup
- **Canvas Size**: 1600 x 1000 px
- **Theme**: Professional (white background)

### Exact Placement Guide

```
┌─────────────────┐       ┌─────────────────┐
│     Users       │       │   Categories    │
├─────────────────┤       ├─────────────────┤
│ PK id (UUID)    │       │ PK id (UUID)    │
│ email (string)  │       │ name (string)   │
│ password (hash) │       │ description     │
│ firstName       │       │ createdAt       │
│ lastName        │       │ updatedAt       │
│ role (enum)     │       └─────────────────┘
│ createdAt       │              ▲
│ updatedAt       │              │ 1:N
└────────┬────────┘              │
         │                       │
         │ 1:N                   │
         │                       │
         ▼                       ▼
    ┌─────────────────┐   ┌──────────────────┐
    │  Orders         │   │   Products       │
    ├─────────────────┤   ├──────────────────┤
    │ PK id (UUID)    │   │ PK id (UUID)     │
    │ FK userId (UUID)├──►│ FK categoryId    │
    │ totalAmount     │   │ name (string)    │
    │ status (enum)   │   │ price (decimal)  │
    │ shippingAddr    │   │ description      │
    │ paymentMethod   │   │ imageUrls        │
    │ orderDate       │   │ variants (JSONB) │
    │ updatedAt       │   │ stock (int)      │
    └────────┬────────┘   │ isActive         │
             │            │ createdAt        │
             │ 1:N        │ updatedAt        │
             │            └────────┬─────────┘
             │                     │ 1:N
             ▼                     ▼
    ┌─────────────────┐   ┌──────────────────┐
    │  OrderItems     │   │    CartItems     │
    ├─────────────────┤   ├──────────────────┤
    │ PK id (UUID)    │   │ PK id (UUID)     │
    │ FK orderId      │   │ FK userId        │
    │ FK productId    │   │ FK productId     │
    │ quantity        │   │ quantity         │
    │ price           │   │ price            │
    │ selectedVariant │   │ selectedVariant  │
    │ createdAt       │   │ createdAt        │
    └─────────────────┘   └──────────────────┘
         ▲                        ▲
         │ N:1                    │ N:1
         └────────────┬───────────┘
                      │
             ┌────────▼──────────┐
             │    Wishlist       │
             ├───────────────────┤
             │ PK id (UUID)      │
             │ FK userId         │
             │ FK productId      │
             │ addedAt           │
             └───────────────────┘

         ┌─────────────────┐     ┌──────────────────┐
         │    Payments     │     │    Reviews       │
         ├─────────────────┤     ├──────────────────┤
         │ PK id (UUID)    │     │ PK id (UUID)     │
         │ FK orderId      │     │ FK productId     │
         │ FK userId       │     │ FK userId        │
         │ amount          │     │ rating (1-5)     │
         │ method (enum)   │     │ title            │
         │ status (enum)   │     │ comment          │
         │ transactionId   │     │ createdAt        │
         │ metadata (JSON) │     │ updatedAt        │
         │ createdAt       │     └──────────────────┘
         │ updatedAt       │
         └─────────────────┘
```

### Draw.io Steps

1. **Create Entity Rectangles** (All entities are 150 x 180)
   
   **Top Row:**
   - Users: (50, 20) to (200, 200)
   - Categories: (400, 20) to (550, 200)
   - Payments: (750, 20) to (900, 200)
   
   **Middle Row:**
   - Orders: (50, 280) to (200, 460)
   - Products: (400, 280) to (550, 460)
   - Reviews: (750, 280) to (900, 460)
   
   **Bottom Row:**
   - OrderItems: (50, 540) to (200, 720)
   - CartItems: (400, 540) to (550, 720)
   - Wishlist: (750, 540) to (900, 720)

2. **Format Each Entity**
   - Border: 2pt solid black
   - Header background: Dark blue (#1565C0)
   - Header text: White, bold, 11pt
   - Fields: Light background (#F5F5F5)
   - Field text: 9pt, left-aligned
   - Structure:
     ```
     ┌─────────────────┐
     │ Entity Name     │  ← Header (bold, white text)
     ├─────────────────┤
     │ PK id           │  ← Primary Key (bold)
     │ FK foreignKey   │  ← Foreign Key (italic)
     │ field1 (type)   │  ← Regular field
     │ field2 (type)   │
     │ ...             │
     └─────────────────┘
     ```

3. **Add Relationships** (Lines with cardinality)
   
   **1:N Relationships:**
   - Users → Orders: Line from (200, 150) to (50, 280)
     - Label: "1:N" (9pt) at midpoint
     - Style: Solid line, crow's foot notation
   - Categories → Products: Line from (550, 150) to (400, 280)
     - Label: "1:N"
   - Users → CartItems: Line from (200, 650) to (400, 650)
     - Label: "1:N" above line
   - Products → CartItems: Line from (550, 630) to (400, 630)
     - Label: "1:N" above line
   - Products → OrderItems: Line from (400, 360) to (200, 620)
     - Label: "1:N"
   - Orders → OrderItems: Line from (125, 460) to (125, 540)
     - Label: "1:N" right of line

4. **Crow's Foot Notation** (for relationships)
   - One side (1): Single line
   - Many side (N): Fork/crow's foot (3 lines)
   - Draw.io: Use "crow's foot" connector option
   - Or use: Circle-line for optional, solid line for required

5. **Add Cardinality Labels**
   - Position at midpoint of each relationship line
   - Font: 8pt, italic
   - Examples: "1:1", "1:N", "M:N"

6. **Color Coding** (Optional but professional)
   - User-related entities: Blue (#BBDEFB)
   - Product-related entities: Green (#C8E6C9)
   - Order-related entities: Orange (#FFE0B2)
   - Payment-related entities: Red (#FFCDD2)

---

## Quick Drawing Tips

### Colors Used Across All Diagrams
- Primary Blue: #1976D2
- Light Blue: #BBDEFB
- Light Green: #C8E6C9
- Light Orange: #FFE0B2
- Light Red: #FFCDD2
- Light Yellow: #FFF9C4
- Light Purple: #E1BEE7
- Gray: #EEEEEE, #CCCCCC
- Dark Gray: #424242

### Font Recommendations
- Titles: 14-16pt, Bold, Dark Gray
- Labels: 10-12pt, Regular, Dark Gray
- Field names: 9pt, Regular, Dark Gray
- Annotations: 8-9pt, Italic, Medium Gray

### Shape Selection
- Processes: Rounded Rectangle
- Decisions: Diamond (45° rotated square)
- Entities/Data: Rectangle or Ellipse
- Actors: Circle or Stick Figure
- Terminator: Oval or Circle
- Data Flow: Arrow (various styles)

### Alignment Tools in Draw.io
1. Select multiple shapes: Ctrl+Click each shape
2. Align: Format → Align → (Left/Right/Top/Bottom/Center)
3. Distribute: Format → Arrange → (Horizontal/Vertical spacing)
4. Group: Ctrl+G to group related elements

### Export for Academic Reports
1. File → Export As
2. Format: PNG (high resolution - 300 DPI)
3. Settings:
   - Zoom: 100%
   - Transparent background: Check if preferred
   - Resolution: Scale 300%
4. Save as: Figure_2_1_System_Architecture.png

---

## Summary: Diagrams Quick Reference

| Figure | Type | Main Content | Canvas Size |
|--------|------|--------------|------------|
| 2.1 | System Architecture | Layers & Components | 1600 x 1000 |
| 2.2 | Context | Actors & System Boundary | 1200 x 800 |
| 2.3 | DFD Level 0 | Main Process & Data Stores | 1400 x 900 |
| 2.4 | DFD Level 1 | Sub-processes | 1600 x 1000 |
| 2.5 | Use Case | Actors & Use Cases | 1400 x 1000 |
| 2.6 | Activity | Process Flow | 1000 x 1400 |
| 2.7 | Sequence | Object Interactions Over Time | 1400 x 1000 |
| 2.8 | Flowchart | System Flow with Decisions | 1200 x 1200 |
| 2.9 | ERD | Database Tables & Relationships | 1600 x 1000 |

---

## Exporting Tips

1. **One Diagram Per File**: Create separate .drawio files
2. **Naming Convention**: `Figure_2_1_System_Architecture.drawio`
3. **PNG Export**: Use 300% zoom for high-quality images
4. **PDF Export**: For printing (if needed)
5. **Consistency**: Use same fonts, colors, and styles across all diagrams

Happy diagramming! 📊
