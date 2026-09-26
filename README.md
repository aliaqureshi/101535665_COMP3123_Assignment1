# COMP3123 Assignment 1 - Backend REST API

**Student Name:** Alia Qureshi  
**Student Number:** 101535665  
**Course:** COMP3123 - Full Stack Development I  

## Project Overview

This project is a secure REST API developed using Node.js, Express.js, MongoDB, and Mongoose for COMP3123 Assignment 1.

The application provides user registration and authentication using JSON Web Tokens (JWT). Authenticated users can create, retrieve, update, and delete employee records.

Employee records are associated with the user who created them. Users can only access and modify their own employee records.

## Technologies Used

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JSON Web Token (JWT)
- bcrypt
- express-validator
- Helmet
- express-rate-limit
- dotenv
- Nodemon
- Postman

## Project Structure

```text
101535665_COMP3123_Assignment1/
├── config/
│   └── db.js
├── controllers/
│   ├── employeeController.js
│   └── userController.js
├── middleware/
│   ├── authMiddleware.js
│   ├── errorMiddleware.js
│   ├── logger.js
│   └── rateLimiter.js
├── models/
│   ├── Employee.js
│   └── User.js
├── routes/
│   ├── employeeRoutes.js
│   └── userRoutes.js
├── validators/
│   ├── employeeValidator.js
│   └── userValidator.js
├── logs/
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── server.js
```

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/aliaqureshi/101535665_COMP3123_Assignment1.git
```

Navigate into the project directory:

```bash
cd 101535665_COMP3123_Assignment1
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory.

Use `.env.example` as a template:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1h
```

Do not commit the real `.env` file to GitHub.

### 4. MongoDB

The application uses MongoDB.

Configure `MONGODB_URI` with a valid MongoDB connection string. MongoDB Atlas can be used as the database service.

The database used for this assignment is:

```text
comp3123_assignment1
```

### 5. Start the Application

Development mode:

```bash
npm run dev
```

Production/start mode:

```bash
npm start
```

By default, the local API runs at:

```text
http://localhost:3000
```

## API Endpoints

### User Signup

```http
POST /api/v1/user/signup
```

Creates a new user account.

A successful signup returns:

```text
201 Created
```

The application validates the username, email address, password, and required fields. Duplicate usernames and email addresses are rejected.

### User Login

```http
POST /api/v1/user/login
```

Authenticates a registered user.

Users can log in using their username or email address and password.

A successful login returns:

```text
200 OK
```

A successful response includes a JWT that can be used to access protected employee endpoints.

## Employee Endpoints

All employee endpoints are protected using JWT authentication.

### Get All Employees

```http
GET /api/v1/emp/employees
```

Returns the employee records belonging to the authenticated user.

### Create Employee

```http
POST /api/v1/emp/employees
```

Creates an employee associated with the authenticated user.

Successful creation returns:

```text
201 Created
```

### Get Employee by ID

```http
GET /api/v1/emp/employees/{eid}
```

Returns a specific employee only if the employee belongs to the authenticated user.

### Update Employee

```http
PUT /api/v1/emp/employees/{eid}
```

Updates an employee only if the employee belongs to the authenticated user.

### Delete Employee

```http
DELETE /api/v1/emp/employees?eid=EMPLOYEE_ID
```

Deletes an employee belonging to the authenticated user.

Successful deletion returns:

```text
204 No Content
```

## Authentication

The application uses JSON Web Tokens (JWT) for authentication.

After a successful login, the API returns a JWT.

Protected endpoints require the token to be included in the HTTP Authorization header using the Bearer scheme:

```text
Authorization: Bearer YOUR_JWT_TOKEN
```

Requests with a missing, invalid, or expired JWT are rejected.

## Authorization and Employee Ownership

Employee records contain a reference to the user who created them.

The authenticated user's ID is obtained from the verified JWT. Employee queries use this user ID to ensure that users can only access employee records that belong to them.

For example:

- User A can access User A's employees.
- User B can access User B's employees.
- User A cannot access, update, or delete User B's employees.
- User B cannot access, update, or delete User A's employees.

Cross-user employee access is rejected by the API.

## Security

### Password Hashing

Passwords are hashed using `bcrypt` before being stored in MongoDB.

Plain-text passwords are not stored in the database and password hashes are not returned in normal API responses.

### JSON Web Tokens

JWTs are generated after successful authentication and are required for protected employee routes.

Tokens have an expiration time configured using the `JWT_EXPIRES_IN` environment variable.

### Helmet

Helmet is used to add security-related HTTP response headers to the Express application.

### Rate Limiting

Rate limiting is implemented using `express-rate-limit`.

The following authentication endpoints are protected:

```text
POST /api/v1/user/signup
POST /api/v1/user/login
```

The current authentication rate limiter allows a maximum of 10 requests within a 15-minute window.

When the limit is exceeded, the API returns:

```text
429 Too Many Requests
```

This helps reduce excessive authentication requests and brute-force attempts.

### Input Validation

Input validation is implemented using `express-validator`.

Validation is performed for user registration, login, employee creation, employee updates, and employee IDs.

Examples of invalid input that are rejected include:

- Missing required fields
- Invalid email addresses
- Invalid passwords
- Invalid salaries
- Invalid dates
- Invalid MongoDB ObjectIds

### Environment Variables

Sensitive configuration is stored using environment variables.

The `.env` file is excluded from Git using `.gitignore`.

The repository contains `.env.example` to document the required configuration without exposing real credentials.

## Error Handling

The application uses centralized error handling and returns JSON error responses.

The API handles situations including:

- Duplicate users
- Invalid login credentials
- Missing JWT
- Invalid JWT
- Expired JWT
- Invalid employee IDs
- Employees that do not exist
- Unauthorized employee access
- Invalid request bodies
- Unsupported routes
- Unexpected server errors
- Rate-limit violations

Sensitive implementation information and stack traces are not returned in production-style API error responses.

## HTTP Status Codes

The API uses appropriate HTTP status codes, including:

- `200 OK` - Successful request
- `201 Created` - Resource successfully created
- `204 No Content` - Resource successfully deleted
- `400 Bad Request` - Validation or malformed request
- `401 Unauthorized` - Authentication failure
- `403 Forbidden` - Forbidden access where applicable
- `404 Not Found` - Resource or route not found
- `409 Conflict` - Duplicate resource
- `429 Too Many Requests` - Rate limit exceeded
- `500 Internal Server Error` - Unexpected server error

## Logging

The application includes request logging middleware.

Logs are stored locally in:

```text
logs/app.log
```

Each request log includes information such as:

- Timestamp
- HTTP method
- Request URL
- HTTP status code
- Response duration

Example:

```text
[2026-09-26T01:45:42.590Z] GET /health Status: 200 Duration: 3ms
```

Sensitive information such as passwords, JWT secrets, database credentials, and authorization tokens is intentionally not written to request logs.

Generated `.log` files are excluded from Git using `.gitignore`.

## Health Check

The application provides a health-check endpoint:

```http
GET /health
```

Example successful response:

```json
{
  "status": "success",
  "message": "API is running"
}
```

Expected status:

```text
200 OK
```

The health-check endpoint can be used to confirm that the API server is operational.

## Testing

The API was tested using Postman.

Testing includes successful and error/security scenarios for:

- User signup
- Username login
- Email login
- Invalid credentials
- Missing credentials
- Employee creation
- Employee retrieval
- Employee updates
- Employee deletion
- Input validation
- Missing JWT
- Invalid JWT
- Invalid employee IDs
- Non-existing employees
- Cross-user employee access
- Rate limiting
- Unsupported routes
- Health check

Two separate users were used to verify employee ownership and authorization.

The exported Postman collection is included with the project submission.

## Sample Test Credentials

The following non-sensitive test accounts can be used for marking.

### User A

```text
Username: alia101535665
Password: AliaTest123
```

### User B

```text
Username: aliaSecond101535665
Password: SecondTest123
```

These accounts are intended only for assignment testing.

## GitHub Repository

Repository:

```text
https://github.com/aliaqureshi/101535665_COMP3123_Assignment1
```

## Author

**Alia Qureshi**  
**Student Number: 101535665**  
**COMP3123 - Assignment 1**