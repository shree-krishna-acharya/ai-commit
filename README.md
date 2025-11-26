# AI PR Review Sample Project

This is a sample Express.js REST API project for testing AI-powered pull request reviews.

## Features

- User management API (CRUD operations)
- Product management API with filtering
- Express.js REST API
- Health check endpoint
- Error handling middleware

## Project Structure

```
src/
├── index.js                 # Main application entry point
├── controllers/             # Business logic
│   ├── userController.js
│   └── productController.js
└── routes/                  # API routes
    ├── users.js
    └── products.js
```

## API Endpoints

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Products
- `GET /api/products` - Get all products (supports filtering by category, minPrice, maxPrice)
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

## Setup

```bash
npm install
npm start
```

## AI PR Review

This project uses GitHub Actions to automatically review pull requests with AI-powered code summaries.