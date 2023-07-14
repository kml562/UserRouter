# Coding Platform

This project is a coding platform where participants can solve questions, and the admin can manage the questions. It includes authentication, question management, and solution evaluation using the Sphere Engine API.

## Deployment Links  - https://jsacademy.onrender.com

## Project Goal

The goal of this project is to create a coding platform that allows participants to solve questions, run their solutions using the Sphere Engine API, and receive feedback on their solutions. The admin has the ability to add, edit, or delete questions.

## Basic Requirements

- Role-based authentication system for admin and participants.
- Signup and login features for user authentication and authorization.
- Middleware function to differentiate admins from participants.
- APIs for the admin to add, edit, or delete questions.
- APIs for the admin to add test cases to a question.
- An API to receive and evaluate solutions from users.
- Hosting the repository on a free service (e.g., Heroku) and providing a link in the README.

## Technologies Used

The coding platform is built using the following technologies and libraries:

- Node.js
- Express.js
- MongoDB  (NoSQL database)
- bcrypt (for password encryption)
- jsonwebtoken (JWT) (for token-based authentication)
- Axios (for making HTTP requests to the Sphere Engine API)
- Nodemailer (for sending emails)
- dotenv (for managing environment variables)
- Validator (for data validation)


## api endpoint
#### User endpoint-
- post /user/signup    (for singup a new user account)
- get /user/login     (login a users account)
- get /user/getproblem  (get problem from the Sphere Engine API) 
- post /user/submit          (submit your problem solution from the Sphere Engine API) 
- get /user/submission/:submissionId    (get your problem solution from the Sphere Engine API) 


#### Admit endpoints
 - post /admin/create  (create a new problem in the Sphere Engine)
 - post /admin/addtestcase/:problemId  (post a test case in the Sphere Engine)
 - put  /admin/update/:problemId      (update your problem in the Sphere Engine)
 - delete /admin/delete/:problemId    (delete your problem in the Sphere Engine)
 

### Models
- User Model
```yaml
{ 
  
  name: {string, mandatory},,
  email: {string, mandatory, valid email, unique}, 
  password: {string, mandatory},
  role: {string, mandatory,enum:["front-end developer", "back-end developer","admin", "UI-UX Designer"]}
  createdAt: {timestamp},
  updatedAt: {timestamp}
}
```

## Installation and Setup

### Prerequisites

- Node.js (version 14.0.0 or above)
- MongoDB  (database)

### Steps

1. Clone the repository:

   ```shell
   git clone https://github.com/kml562/UserRouter

### Install the dependencies: 
   cd UserRouter
   npm install


### Environment Variables

1. Create a `.env` file in the root directory of the project.

2. Define the following environment variables in the `.env` file:

   - `PORT`: The port number on which the server will run (e.g., `3000`).
   - `MONGOURI`: The connection URL for MongoDB or AWS DynamoDB.
   - `JWT_SECRET`: Secret key for JWT token generation.
   - `JWT_EXPIRY`: Expiry time for JWT tokens.
   - `accessToken`: Your access token for the Sphere Engine API.
   - `endpoint`: The endpoint URL for the Sphere Engine API.

### Start the server:
npm start
