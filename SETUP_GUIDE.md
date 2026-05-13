# Setup & Deployment Guide: AURELIA Fashion E-Commerce

Welcome to your premium Next.js Fashion E-Commerce platform. This document outlines the steps to finalize your environment and deploy the application.

## Prerequisites
- **Node.js**: v18.17 or later.
- **MySQL**: A running instance (local or cloud).
- **Accounts**: Google Cloud (Auth), Stripe (Payments), Cloudinary (Images).

## 1. Database Setup
1. Open your `.env` file.
2. Update `DATABASE_URL` with your MySQL credentials:
   `DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE"`
3. Run the initial migration to create the tables:
   ```powershell
   npx prisma migrate dev --name init
   ```
4. Generate the Prisma client:
   ```powershell
   npx prisma generate
   ```

## 2. Authentication Setup (NextAuth)
1. Go to [Google Cloud Console](https://console.cloud.google.com/).
2. Create an OAuth 2.0 Client ID.
3. Add `http://localhost:3000/api/auth/callback/google` to authorized redirect URIs.
4. Update `.env` with `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`.
5. Set a strong `NEXTAUTH_SECRET`.

## 3. Payment Integration (Stripe)
1. Go to [Stripe Dashboard](https://dashboard.stripe.com/).
2. Copy your **Publishable key** and **Secret key**.
3. Update `.env` with `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` and `STRIPE_API_KEY`.
4. (Production) Set up a webhook to handle successful payments and update `STRIPE_WEBHOOK_SECRET`.

## 4. Image Management (Cloudinary)
1. Sign up for [Cloudinary](https://cloudinary.com/).
2. Update `.env` with your `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET`.

## 5. Development
Run the development server:
```powershell
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to see the application.

## 6. Deployment
### Vercel (Recommended)
1. Push your code to a GitHub repository.
2. Connect the repository to Vercel.
3. Add all environment variables from `.env` to the Vercel project settings.
4. Vercel will automatically detect Next.js and deploy.

### Railway (For MySQL)
1. Create a MySQL database on Railway.
2. Use the provided connection string for your `DATABASE_URL` on Vercel.

---

## Troubleshooting (Windows)
- **Permissions**: If `npx` commands fail, try running PowerShell as Administrator.
- **Port Conflicts**: If port 3000 is in use, use `npm run dev -- -p 3001`.
- **MySQL Connection**: Ensure the MySQL service is running in Windows Services (`services.msc`).
