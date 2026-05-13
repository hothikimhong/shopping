# AURELIA Fashion E-Commerce: System Documentation

This document provides a comprehensive overview of the settings, architecture, and business workflows for the AURELIA Fashion E-Commerce platform.

---

## 1. Technical Architecture

### Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4 (with Luxury Minimal Design System)
- **Database**: MySQL
- **ORM**: Prisma 7.0
- **Authentication**: NextAuth.js
- **State Management**: Zustand (Persistent Storage)
- **Payments**: Stripe Integration
- **Animations**: Framer Motion
- **Icons**: Lucide React & React Icons (Brand Logos)

### Project Structure
- `src/app`: Application routes and server components.
- `src/components`: Reusable UI components and layouts.
- `src/lib`: Shared utilities, Prisma client, and authentication logic.
- `src/store`: Global state management (Cart).
- `src/actions`: Server actions for database and third-party integrations.
- `prisma`: Database schema and migration scripts.

---

## 2. Configuration & Settings

### Environment Variables (`.env`)
The platform requires several environment variables for core functionality:

| Variable | Description |
| :--- | :--- |
| `DATABASE_URL` | MySQL connection string. |
| `NEXTAUTH_SECRET` | Secret key for session encryption. |
| `GOOGLE_CLIENT_ID` | OAuth Client ID for Google Social Login. |
| `GOOGLE_CLIENT_SECRET` | OAuth Client Secret for Google Social Login. |
| `STRIPE_API_KEY` | Backend secret key for Stripe payments. |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Frontend publishable key for Stripe. |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary name for image hosting. |

### Global Styles (`globals.css`)
The website uses a **Luxury Design System** defined in the root CSS:
- **Primary Color**: `#C5A059` (Gold/Bronze)
- **Secondary Color**: `#2D2D2D` (Charcoal)
- **Typography**: `Playfair Display` (Serif) for headings and `Inter` (Sans-serif) for UI text.

---

## 3. Database Schema (Prisma)

The database is structured to handle complex e-commerce relationships:

- **User**: Stores profiles, roles (USER/ADMIN), and relationship to orders/reviews.
- **Product**: Core product data including prices, stock, and status flags (isNew, isFeatured).
- **Category & Brand**: Hierarchical organization for easy filtering.
- **ProductImage & Variant**: Handles multiple photos and size/color variations per product.
- **Order & OrderItem**: Tracks transactions, total amounts, and delivery status.
- **Cart & Wishlist**: Persistent collections for logged-in and guest users.
- **Review**: Customer-generated ratings and comments.

---

## 4. Business Workflows

### A. Customer Journey
1.  **Discovery**: Users browse the **Home Page** featured collections or filter products by Category.
2.  **Product Selection**: Detailed view with high-quality images, size selection, and description.
3.  **Shopping Cart**: Items added to the cart are persisted in local storage via Zustand. Users can adjust quantities or remove items.
4.  **Authentication**: Users must log in (Credentials or Google) to proceed with checkout.
5.  **Checkout**:
    - Input shipping and billing information.
    - Review order summary (Subtotal, Shipping, Tax).
    - Secure payment processing via Stripe.
6.  **Confirmation**: Success notification and order summary display.

### B. Admin Workflow
1.  **Dashboard Analytics**: Real-time overview of Revenue, Orders, and Customer growth using interactive charts.
2.  **Order Management**: View and track recent customer orders and payment statuses.
3.  **Content Management**: (Planned) Interface for creating/editing products and managing inventory.

---

## 5. Key System Components

### `Prisma Client` (`src/lib/prisma.ts`)
Uses a singleton pattern to ensure only one database connection is active in development, preventing connection leaks.

### `Cart Store` (`src/store/use-cart.ts`)
Managed by Zustand with `persist` middleware, ensuring that user shopping carts remain active even after page refreshes.

### `AuthProvider` (`src/components/providers/auth-provider.tsx`)
A client-side wrapper that enables NextAuth session access across the entire application.

---

## 6. Deployment & Maintenance

### Deployment
The platform is designed to be deployed on **Vercel** with a managed MySQL database (e.g., Railway or PlanetScale).

### Maintenance Commands
- **Generate Client**: `npx prisma generate` (Run after schema changes).
- **Apply Migrations**: `npx prisma migrate dev` (Run to sync local DB).
- **Seed Data**: `npx prisma db seed` (Run to reset demo data).
