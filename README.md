# Sports Facility Booking Platform (Backend)

### Project Explanation

This project is a Sports Facility Booking Platform built using Node.js, Express, Mongoose, and TypeScript. This project allows users to register, log in, and book facilities. Admin users can create, update, and soft delete facilities. The application uses JSON Web Tokens (JWT) for authentication and Zod for request validation.

## 🌟 Important Links

| Link Type                   | URL                                                                                                    |
| --------------------------- | ------------------------------------------------------------------------------------------------------ |
| 🛠 **API Documentation**    | [Postman Documentation](https://documenter.getpostman.com/view/30515463/2sAYBPmuPn)                    |
| 📊 **Database ER Diagram**  | [Database Design](https://dbdiagram.io/d/sports-facility-booking-6732e1b6e9daa85aca1dc16a)             |
| 🔗 **Frontend Live Demo**   | [Live Demo](https://sprorts-facility-booking-platform.vercel.app)                                      |
| 💻 **Frontend GitHub Repo** | [Frontend Repository](https://github.com/jakirulislamhakim/sports-facility-booking-platform-front-end) |

## Tech Stack

- **Backend:** Node.js, Express
- **Database:** MongoDB with Mongoose
- **Language:** TypeScript
- **Validation:** Zod
- **Payment Gateway:** Aamarpay
- **Email Service:** Nodemailer
- **Documentation:** Postman

---

## Features

- User authentication with JWT and role-based access control (Admin/User)
- CRUD operations for facilities and bookings
- Soft delete functionality for facilities
- Comprehensive error handling and validation
- Data validation using Zod
- Modular directory structure for scalability
- Aamarpay payment integration for booking payments.
- Send email by nodemailer
- Upload image in cloudinary
- Rate limiting 30 request for 5 minuets

---

## 🚀 Installation Guide

Follow these steps to set up the backend of the Sports Facility Booking Platform locally:

1. **Clone the Repository**  
   Run the following command to clone the repository:

   ```bash
   git clone https://github.com/jakirulislamhakim/sports-facility-booking-platform--backend
   ```

2. **Install Dependencies**
   Navigate to the project directory and install the required dependencies:

```bash
cd sports-facility-booking-platform--backend
npm install
```

3. **Configure Environment Variables**

Copy the `.env.example` file to a .env file:
bash
Update the `.env` file with your configuration (e.g., database URI, JWT secret, etc.).

4. **Start the Development Server**
   Run the following command to start the server in development mode:

```bash
npm run start-dev
```

Your server should now be running on the specified port in the .env file.
