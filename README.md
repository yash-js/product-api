
# Product & Favorites API

A RESTful API for managing products, favorites, and user authentication for an eCommerce platform. Built using Express.js, MongoDB, and Swagger for API documentation. This API allows users to register, log in, and perform CRUD operations on products, as well as manage their favorite products.

## Features

- User authentication (Register, Login)
- Product management (Create, Read, Update, Delete)
- Manage product favorites (Add, Remove, List)
- Pagination, Sorting, and Filtering for product listings
- Full-text search for products by name and description

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- Express.js
- Swagger (for API documentation)

## Installation

### Clone the repository

```bash
git clone https://github.com/yash-js/product-api
cd product-api
```

### Install dependencies

```bash
npm install
```

### Create a `.env` file

Create a `.env` file in the root of the project and add the following environment variables:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/your-database-name
JWT_SECRET=your_jwt_secret
```

- `PORT`: The port on which the server will run (default is `5000`).
- `MONGODB_URI`: The connection string for MongoDB (use MongoDB Atlas or a local MongoDB instance).
- `JWT_SECRET`: A secret key used for JWT authentication. You should generate a random secret key to keep your authentication secure.

### Start the server

```bash
npm start
```

The API will be available at `http://localhost:5000`.

## API Endpoints

### Authentication

- **POST /api/auth/register**: Register a new user.
- **POST /api/auth/login**: Login with email and password.

### Products

- **GET /api/products**: Get a list of all products with pagination, filtering, sorting, and search.
- **POST /api/products**: Create a new product (Requires authentication).
- **GET /api/products/{id}**: Get a product by its ID.
- **PUT /api/products/{id}**: Update a product by its ID (Requires authentication).
- **DELETE /api/products/{id}**: Delete a product by its ID (Requires authentication).

### Favorites

- **GET /api/favorites**: Get a list of all favorite products (Requires authentication).
- **POST /api/favorites/{productId}**: Add a product to the favorites list (Requires authentication).
- **DELETE /api/favorites/{productId}**: Remove a product from the favorites list (Requires authentication).

## Swagger Documentation

The API documentation is available using Swagger UI. After running the server, navigate to:

```
http://localhost:5000/api-docs
```

This page will display a user-friendly interface for all available API endpoints, including request parameters and response examples.

## Validation & Error Handling

- The API uses `express-validator` for request validation and ensures that all required fields are validated before processing.
- Detailed error messages are returned in case of invalid inputs or server errors.

## Example Requests

### Register User

```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### Login User

```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### Get Products with Search

```bash
GET /api/products?search=shirt&page=1&limit=10
```

### Add Product to Favorites

```bash
POST /api/favorites/{productId}
Authorization: Bearer {JWT_TOKEN}
```

## Contribution

Feel free to open issues or submit pull requests. Contributions are welcome!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
