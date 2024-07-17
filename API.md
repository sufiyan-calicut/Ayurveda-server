# API Documentation for Ayurveda Collection

## Overview
This document provides details about the API endpoints available in the "Ayurveda" collection. Each endpoint's request method, URL, headers, and body (if applicable) are described. The collection includes various endpoints categorized under Admin, User, Banner, Auth, Top Bar, and Product.

### Collection Metadata
- **Client Name**: Thunder Client
- **Collection Name**: Ayurveda
- **Collection ID**: d3c62068-c104-4fd5-895f-60a563bc96be
- **Date Exported**: 2024-07-17
- **Version**: 1.2

## Folders and Endpoints

### Admin

#### Get All Banners
- **Endpoint**: `/api/admin/banners`
- **Method**: GET
- **Headers**:
  - Authorization: Bearer \<JWT Token\>

#### Update Banner Status
- **Endpoint**: `/api/admin/banners/:bannerId/status`
- **Method**: PATCH
- **Headers**:
  - Authorization: Bearer \<JWT Token\>
- **Body**:
  ```json
  {
    "imageUrl": "https://example.com/images/banner.png",
    "title": "Sample Banner Title",
    "description": "This is a sample description for the banner."
  }
  ```

#### Delete Banner
- **Endpoint**: `/api/admin/banners/:bannerId`
- **Method**: DELETE
- **Headers**:
  - Authorization: Bearer \<JWT Token\>

#### Update Banner
- **Endpoint**: `/api/admin/banners/:bannerId`
- **Method**: PUT
- **Headers**:
  - Authorization: Bearer \<JWT Token\>
- **Body**:
  ```json
  {
    "imageUrl": "https://example.com/images/banner.png",
    "title": "Updated test banner",
    "description": "This is an updated version of the sample description for the banner."
  }
  ```

#### Add New Banner
- **Endpoint**: `/api/admin/banners`
- **Method**: POST
- **Headers**:
  - Authorization: Bearer \<JWT Token\>
- **Body**:
  ```json
  {
    "imageUrl": "https://example.com/images/testbanner.png",
    "title": "test banner title",
    "description": "test banner description"
  }
  ```

#### Admin Sign In
- **Endpoint**: `/api/admin/auth/sign-in`
- **Method**: GET
- **Body**:
  ```json
  {
    "email": "admin@gmail.com",
    "password": "AdminPassword123"
  }
  ```

### User

#### Get Banners
- **Endpoint**: `/api/user/banners`
- **Method**: GET

#### Sign Up / Register
- **Endpoint**: `/api/user/auth/signup`
- **Method**: POST
- **Body**:
  ```json
  {
    "name": "Najwa",
    "email": "najwamd2000@gmail.com",
    "mobile": "9988454322",
    "password": "NajwaPassword123",
    "address": "123 Main Street, City, Country"
  }
  ```

#### Verify OTP
- **Endpoint**: `/api/user/auth/verify-otp/:otpId`
- **Method**: POST
- **Body**:
  ```json
  {
    "otp": 537141
  }
  ```

#### Resend OTP
- **Endpoint**: `/api/user/auth/resend-otp/:otpId`
- **Method**: GET

#### Forgot Password
- **Endpoint**: `/api/user/auth/forgot-password`
- **Method**: POST
- **Body**:
  ```json
  {
    "email": "najwamd2000@gmail.com"
  }
  ```

#### Reset Password
- **Endpoint**: `/user/auth/reset-password/:resetId`
- **Method**: POST
- **Body**:
  ```json
  {
    "password": "newPassword1"
  }
  ```

#### Sign In / Log In
- **Endpoint**: `/api/user/auth/sign-in`
- **Method**: POST
- **Body**:
  ```json
  {
    "email": "najwamd2000@gmail.com",
    "password": "NajwaPassword123"
  }
  ```

### Banner

#### Endpoints for Banners are categorized under Admin and User sections.

### Auth

#### Endpoints for Authentication are categorized under User section.

### Top Bar

#### Add Top Bar
- **Endpoint**: `/api/admin/top-bar`
- **Method**: POST
- **Headers**:
  - Authorization: Bearer \<JWT Token\>
- **Body**:
  ```json
  {
    "title": "sample topbar",
    "description": "sample topbar description"
  }
  ```

### Product

### Product Endpoints

#### 1. Get All Products
- **URL:** `http://localhost:3000/api/user/products`
- **Method:** `GET`
- **Description:** Retrieves a list of all products.
- **Headers:** None
- **Request Body:** None
- **Response:**
  ```json
  [
    {
      "id": "12345",
      "name": "Product Name",
      "price": 99.99,
      "description": "Product description.",
      "imageUrl": "https://example.com/images/product.png"
    }
  ]
  ```

#### 2. Get Product by ID
- **URL:** `http://localhost:3000/api/user/products/:productId`
- **Method:** `GET`
- **Description:** Retrieves a single product by its ID.
- **Headers:** None
- **Request Body:** None
- **Response:**
  ```json
  {
    "id": "12345",
    "name": "Product Name",
    "price": 99.99,
    "description": "Product description.",
    "imageUrl": "https://example.com/images/product.png"
  }
  ```

#### 3. Add New Product
- **URL:** `http://localhost:3000/api/admin/products`
- **Method:** `POST`
- **Description:** Adds a new product.
- **Headers:**
  - `Authorization: Bearer <your_token_here>`
- **Request Body:**
  ```json
  {
    "name": "New Product",
    "price": 49.99,
    "description": "Description of the new product.",
    "imageUrl": "https://example.com/images/newproduct.png"
  }
  ```
- **Response:**
  ```json
  {
    "id": "67890",
    "name": "New Product",
    "price": 49.99,
    "description": "Description of the new product.",
    "imageUrl": "https://example.com/images/newproduct.png"
  }
  ```

#### 4. Update Product
- **URL:** `http://localhost:3000/api/admin/products/:productId`
- **Method:** `PUT`
- **Description:** Updates an existing product by its ID.
- **Headers:**
  - `Authorization: Bearer <your_token_here>`
- **Request Body:**
  ```json
  {
    "name": "Updated Product",
    "price": 59.99,
    "description": "Updated description of the product.",
    "imageUrl": "https://example.com/images/updatedproduct.png"
  }
  ```
- **Response:**
  ```json
  {
    "id": "12345",
    "name": "Updated Product",
    "price": 59.99,
    "description": "Updated description of the product.",
    "imageUrl": "https://example.com/images/updatedproduct.png"
  }
  ```

#### 5. Delete Product
- **URL:** `http://localhost:3000/api/admin/products/:productId`
- **Method:** `DELETE`
- **Description:** Deletes a product by its ID.
- **Headers:**
  - `Authorization: Bearer <your_token_here>`
- **Request Body:** None
- **Response:**
  ```json
  {
    "message": "Product deleted successfully."
  }
  ```

### User Endpoints

#### 1. Signup / Register
- **URL:** `http://localhost:3000/api/user/auth/signup`
- **Method:** `POST`
- **Description:** Registers a new user.
- **Headers:** None
- **Request Body:**
  ```json
  {
    "name": "Najwa",
    "email": "najwamd2000@gmail.com",
    "mobile": "9988454322",
    "password": "NajwaPassword123",
    "address": "123 Main Street, City, Country"
  }
  ```
- **Response:**
  ```json
  {
    "message": "User registered successfully.",
    "user": {
      "id": "6695b2b3e0b3c371866b0a1",
      "name": "Najwa",
      "email": "najwamd2000@gmail.com"
    }
  }
  ```

#### 2. Verify OTP
- **URL:** `http://localhost:3000/api/user/auth/verify-otp/:userId`
- **Method:** `POST`
- **Description:** Verifies the OTP for user registration.
- **Headers:** None
- **Request Body:**
  ```json
  {
    "otp": 537141
  }
  ```
- **Response:**
  ```json
  {
    "message": "OTP verified successfully."
  }
  ```

#### 3. Resend OTP
- **URL:** `http://localhost:3000/api/user/auth/resend-otp/:userId`
- **Method:** `GET`
- **Description:** Resends the OTP to the user.
- **Headers:** None
- **Request Body:** None
- **Response:**
  ```json
  {
    "message": "OTP resent successfully."
  }
  ```

#### 4. Forgot Password
- **URL:** `http://localhost:3000/api/user/auth/forgot-password`
- **Method:** `POST`
- **Description:** Sends a password reset link to the user's email.
- **Headers:** None
- **Request Body:**
  ```json
  {
    "email": "najwamd2000@gmail.com"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Password reset link sent to your email."
  }
  ```

#### 5. Reset Password
- **URL:** `http://localhost:3000/api/user/auth/reset-password/:userId`
- **Method:** `POST`
- **Description:** Resets the user's password.
- **Headers:** None
- **Request Body:**
  ```json
  {
    "password": "newPassword1"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Password reset successfully."
  }
  ```

#### 6. Sign In / Log In
- **URL:** `http://localhost:3000/api/user/auth/sign-in`
- **Method:** `POST`
- **Description:** Signs in a user.
- **Headers:** None
- **Request Body:**
  ```json
  {
    "email": "najwamd2000@gmail.com",
    "password": "NajwaPassword123"
  }
  ```
- **Response:**
  ```json
  {
    "message": "User signed in successfully.",
    "token": "Bearer <your_jwt_token_here>"
  }
  ```

### Admin Endpoints

#### 1. Admin Sign In
- **URL:** `http://localhost:3000/api/admin/auth/sign-in`
- **Method:** `POST`
- **Description:** Signs in an admin.
- **Headers:** None
- **Request Body:**
  ```json
  {
    "email": "admin@gmail.com",
    "password": "AdminPassword123"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Admin signed in successfully.",
    "token": "Bearer <your_jwt_token_here>"
  }
  ```

---

This API documentation outlines the various endpoints available for the Ayurveda application, providing details on request methods, URLs, headers, request bodies, and expected responses for each endpoint. Use this guide to integrate and interact with the API efficiently.

---

**Note**: Replace `:bannerId`, `:otpId`, and `:resetId` with the actual IDs in the endpoint URLs. The JWT token in the Authorization header should be a valid token for authorized access.