
# Sports Facility Booking Platform

### Project Explanation

This project is a Sports Facility Booking Platform built using Node.js, Express, Mongoose, and TypeScript. This project allows users to register, log in, and book facilities. Admin users can create, update, and soft delete facilities. The application uses JSON Web Tokens (JWT) for authentication and Zod for request validation.


## Features

- User authentication with JWT
- CRUD operations for facilities and bookings
- Soft delete functionality for facilities
- Comprehensive error handling and validation
- Data validation using Zod
- Modular directory structure for scalability

## Tech Stack

- **Backend:** Node.js, Express
- **Database:** MongoDB with Mongoose
- **Language:** TypeScript


## API Documentation

### User Endpoints

#### Create a User

- **URL:** `/api/auth/signup`
- **Method:** `POST`
- **Headers:** None
- **Body:**
  ```json
  {
    "name": "User Name",
    "email": "user@example.com",
    "password": "password123",
    "phone": "0123456789",
    "role": "user", // or "admin"
    "address": "User Address"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "User created successfully",
    "data": {
      "name": "User Name",
      "email": "user@example.com",
      "phone": "0123456789",
      "role": "user",
      "address": "User Address",
      "_id": "user_id",
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    }
  }
  ```

#### Login a User

- **URL:** `/api/auth/login`
- **Method:** `POST`
- **Headers:** None
- **Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Login successful",
    "data": {
      "token": "jwt_token"
    }
  }
  ```

### Facility Endpoints

#### Create a Facility

- **URL:** `/api/facilities`
- **Method:** `POST`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "name": "Facility Name",
    "description": "Facility Description",
    "pricePerHour": 100,
    "location": "Facility Location"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Facility created successfully",
    "data": {
      "name": "Facility Name",
      "description": "Facility Description",
      "pricePerHour": 100,
      "location": "Facility Location",
      "isDeleted": false,
      "_id": "facility_id",
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    }
  }
  ```

#### Update a Facility

- **URL:** `/api/facilities/:id`
- **Method:** `PUT`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "name": "Updated Facility Name",
    "description": "Updated Facility Description",
    "pricePerHour": 120,
    "location": "Updated Facility Location"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Facility updated successfully",
    "data": {
      "name": "Updated Facility Name",
      "description": "Updated Facility Description",
      "pricePerHour": 120,
      "location": "Updated Facility Location",
      "isDeleted": false,
      "_id": "facility_id",
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    }
  }
  ```

#### Soft Delete a Facility

- **URL:** `/api/facilities/:id`
- **Method:** `DELETE`
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
  ```json
  {
    "success": true,
    "message": "Facility deleted successfully",
    "data": {
      "name": "Facility Name",
      "description": "Facility Description",
      "pricePerHour": 100,
      "location": "Facility Location",
      "isDeleted": true,
      "_id": "facility_id",
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    }
  }
  ```

#### Get All Facilities

- **URL:** `/api/facilities`
- **Method:** `GET`
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
  ```json
  {
    "success": true,
    "message": "Facilities retrieved successfully",
    "data": [
      {
        "name": "Facility Name",
        "description": "Facility Description",
        "pricePerHour": 100,
        "location": "Facility Location",
        "isDeleted": false,
        "_id": "facility_id",
        "createdAt": "timestamp",
        "updatedAt": "timestamp"
      }
    ]
  }
  ```

### Booking Endpoints

#### Create a Booking

- **URL:** `/api/bookings`
- **Method:** `POST`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "user": "user_id",
    "facility": "facility_id",
    "startTime": "10:00",
    "endTime": "12:00",
    "date": "2024-06-15",
    "isBooked": "true"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Booking created successfully",
    "data": {
      "user": "user_id",
      "facility": "facility_id",
      "startTime": "10:00",
      "endTime": "12:00",
      "date": "2024-06-15",
      "isBooked": "true",
      "_id": "booking_id",
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    }
  }
  ```

#### Get All Bookings

- **URL:** `/api/bookings`
- **Method:** `GET`
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
  ```json
  {
    "success": true,
    "message": "Bookings retrieved successfully",
    "data": [
      {
        "user": "user_id",
        "facility": "facility_id",
        "startTime": "10:00",
        "endTime": "12:00",
        "date": "2024-06-15",
        "isBooked": "true",
        "_id": "booking_id",
        "createdAt": "timestamp",
        "updatedAt": "timestamp"
      }
    ]
  }
  ```


