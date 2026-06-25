# BlackCube MERN Backend

Backend API for the BlackCube MERN Stack Developer Assignment.

## Live API

https://blackcube-backend.onrender.com

## Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Cloudinary
* Multer
* Cookie Parser

## Features

* User Registration
* User Login
* User Logout
* JWT Authentication
* Protected Routes
* Add Product
* Edit Product
* Delete Product
* Like / Unlike Product
* Get Liked Products
* User Profile
* Image Upload using Cloudinary

## Installation

```bash
git clone https://github.com/sudharshanFSD/blackcube-backend.git

cd blackcube-backend

npm install

npm start
```

## Environment Variables

Create a `.env` file and add:

```env
PORT=5000
MONGO_URI=YOUR_MONGODB_URI
JWT_SECRET=YOUR_JWT_SECRET
CLOUDINARY_CLOUD_NAME=YOUR_CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY=YOUR_CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET=YOUR_CLOUDINARY_API_SECRET
```

## API Endpoints

### Authentication

* POST `/api/auth/signup`
* POST `/api/auth/login`
* POST `/api/auth/logout`
* GET `/api/auth/profile`

### Products

* GET `/api/product`
* POST `/api/product`
* PUT `/api/product/:productId`
* DELETE `/api/product/:productId`
* PUT `/api/product/:productId/like`
* GET `/api/product/liked`

## Frontend Repository

https://github.com/sudharshanFSD/blackcube-frontend

## Live Frontend

https://blackcubemern.netlify.app

## Author

Sudharshan
