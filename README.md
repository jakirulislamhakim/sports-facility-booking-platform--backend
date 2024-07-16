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
---

## API Documentation

### User Routes

#### User Sign Up

- **URL:** `/api/auth/signup`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "name": "Your Name",
    "email": "your.email@example.com",
    "password": "your_password",
    "phone": "1234567890",
    "role": "user",
    "address": "Your Address"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "User registered successfully",
    "data": {
      "_id": "user_id",
      "name": "Your Name",
      "email": "your.email@example.com",
      "role": "user",
      "phone": "1234567890",
      "address": "Your Address"
    }
  }
  ```

#### User Login

- **URL:** `/api/auth/login`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "email": "your.email@example.com",
    "password": "your_password"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "User logged in successfully",
    "token": "JWT_TOKEN",
    "data": {
      "_id": "user_id",
      "name": "Your Name",
      "email": "your.email@example.com",
      "role": "user",
      "phone": "1234567890",
      "address": "Your Address"
    }
  }
  ```

### Facility Routes

#### Create a Facility (Admin Only)

- **URL:** `/api/facilities`
- **Method:** `POST`
- **Headers:** `Authorization: Bearer JWT_TOKEN`
- **Body:**
  ```json
  {
    "name": "Facility Name",
    "description": "Facility Description",
    "pricePerHour": 50,
    "location": "Facility Location"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Facility added successfully",
    "data": {
      "_id": "facility_id",
      "name": "Facility Name",
      "description": "Facility Description",
      "pricePerHour": 50,
      "location": "Facility Location",
      "isDeleted": false
    }
  }
  ```

#### Update a Facility (Admin Only)

- **URL:** `/api/facilities/:id`
- **Method:** `PUT`
- **Headers:** `Authorization: Bearer JWT_TOKEN`
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
    "statusCode": 200,
    "message": "Facility updated successfully",
    "data": {
      "_id": "facility_id",
      "name": "Updated Facility Name",
      "description": "Updated Facility Description",
      "pricePerHour": 120,
      "location": "Updated Facility Location",
      "isDeleted": false
    }
  }
  ```

#### Delete a Facility (Admin Only)

- **URL:** `/api/facilities/:id`
- **Method:** `DELETE`
- **Headers:** `Authorization: Bearer JWT_TOKEN`
- **Response:**
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Facility deleted successfully",
    "data": {
      "_id": "facility_id",
      "name": "Updated Facility Name",
      "description": "Updated Facility Description",
      "pricePerHour": 120,
      "location": "Updated Facility Location",
      "isDeleted": true
    }
  }
  ```

#### Get All Facilities

- **URL:** `/api/facilities`
- **Method:** `GET`
- **Response:**
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Facilities retrieved successfully",
    "data": [
      {
        "_id": "facility_id",
        "name": "Facility Name",
        "description": "Facility Description",
        "pricePerHour": 50,
        "location": "Facility Location",
        "isDeleted": false
      },
      {
        "_id": "facility_id",
        "name": "Updated Facility Name",
        "description": "Updated Facility Description",
        "pricePerHour": 120,
        "location": "Updated Facility Location",
        "isDeleted": false
      }
    ]
  }
  ```

### Booking Routes

#### Check Availability

- **URL:** `/api/check-availability`
- **Method:** `GET`
- **Query Parameters:** `date` (optional, format: YYYY-MM-DD)
- **Response:**
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Availability checked successfully",
    "data": [
      {
        "startTime": "08:00",
        "endTime": "10:00"
      },
      {
        "startTime": "14:00",
        "endTime": "16:00"
      }
    ]
  }
  ```

#### Create a Booking (User Only)

- **URL:** `/api/bookings`
- **Method:** `POST`
- **Headers:** `Authorization: Bearer JWT_TOKEN`
- **Body:**
  ```json
  {
    "facility": "facility_id",
    "date": "2024-06-15",
    "startTime": "10:00",
    "endTime": "13:00"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Booking created successfully",
    "data": {
      "_id": "booking_id",
      "facility": "facility_id",
      "date": "2024-06-15",
      "startTime": "10:00",
      "endTime": "13:00",
      "user": "user_id",
      "payableAmount": 90,
      "isBooked": "confirmed"
    }
  }
  ```

#### View All Bookings (Admin Only)

- **URL:** `/api/bookings`
- **Method:** `GET`
- **Headers:** `Authorization: Bearer JWT_TOKEN`
- **Response:**
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Bookings retrieved successfully",
    "data": [
      {
        "_id": "booking_id",
        "facility": {
          "_id": "facility_id",
          "name": "Facility Name",
          "description": "Facility Description",
          "pricePerHour": 50,
          "location": "Facility Location",
          "isDeleted": false
        },
        "date": "2024-06-15",
        "startTime": "10:00",
        "endTime": "13:00",
        "user": {
          "_id": "user_id",
          "name": "Your Name",
          "email": "your.email@example.com",
          "phone": "1234567890",
          "role": "user",
          "address": "Your Address"
        },
        "payableAmount": 90,
        "isBooked": "confirmed"
      }
    ]
  }
  ```

#### View Bookings by User (User Only)

- **URL:** `/api/bookings/user`
- **Method:** `GET`
- **Headers:** `Authorization: Bearer JWT_TOKEN`
- **Response:**
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Bookings retrieved successfully",
    "data": [
      {
        "_id": "booking_id",
        "facility": {
          "_id": "facility_id",
          "name": "Facility Name",
          "description": "Facility Description",
          "pricePerHour": 50,
          "location": "Facility Location",
          "isDeleted": false
        },
        "date": "2024-06-15",
        "startTime": "10:00",
        "endTime": "13:00",
        "user": "user_id",
        "payableAmount": 90,
        "isBooked": "confirmed"
      }
    ]
  }
  ```


#### Cancel a Booking (User Only)

- **URL:** `/api/bookings/:id`
- **Method:** `DELETE`
- **Headers:** `Authorization: Bearer JWT_TOKEN`
- **Response:**
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Booking cancelled successfully",
    "data": {
      "_id": "booking_id",
      "facility": {
        "_id": "facility_id",
        "name": "Facility Name",
        "description": "Facility Description",
        "pricePerHour": 50,
        "location": "Facility Location",
        "isDeleted": false
      },
      "date": "2024-06-15",
      "startTime": "10:00",
      "endTime": "13:00",
      "user": {
        "_id": "user_id",
        "name": "Your Name",
        "email": "your.email@example.com",
        "phone": "1234567890",
        "role": "user",
        "address": "Your Address"
      },
      "payableAmount": 90,
      "isBooked": "cancelled"
    }
  }
  ```
---
