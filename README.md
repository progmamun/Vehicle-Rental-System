# 🚗 Vehicle Rental System

# [Live](https://vehicle-rental-system-sage.vercel.app)

A robust and secure backend API for managing a vehicle rental business, built with modern technologies and best practices.

✨ Features

- Vehicle Management: Track and manage vehicle inventory with real-time availability status
- Customer Management: Handle customer accounts, profiles, and rental history
- Booking System: Process vehicle rentals, returns, and automated cost calculations
- Role-Based Authentication: Secure access control with JWT for Admin and Customer roles
- RESTful API: Well-documented endpoints following REST conventions
- Type Safety: Full TypeScript implementation for enhanced reliability

🛠️ Technology Stack

- Runtime: Node.js + TypeScript
- Framework: Express.js
- Database: PostgreSQL
- Security:
- bcrypt for password hashing
- jsonwebtoken for JWT authentication
- Deployment: Vercel

🚀 Quick Start
Prerequisites

- Node.js (v22 or higher)
- PostgreSQL database
- Yarn package manager

---

- yarn install
- yarn dev
- yarn build
- Generate JWT Secret (run in terminal):

```
node -e "const crypto = require('crypto'); console.log(crypto.randomBytes(64).toString('hex'));"
```
