# Taskmaster Documentation

## Overview

Taskmaster is a task management application designed to help users organize and manage their tasks effectively. It provides a RESTful API built with Express, integrated with MySQL for database management, and utilizes JWT for authentication. The project also includes Swagger for API documentation and Drizzle ORM for database migration and querying.

## Table of Contents

1. Installation
2. Environment Variables
3. Database Model
4. API Authentication
5. Usage

## Installation

### Prerequisites

- Node.js (version 18 or above)
- MySQL (version 5.7 or above)
- npm (Node Package Manager)

### Step-by-step Setup

1. **Clone the Repository**
   - Clone the repository from GitHub and navigate into the project directory.

2. **Install Dependencies**
   - Run the command `npm install` to install all necessary dependencies.

3. **Set Up MySQL Database**
   - Create a new MySQL database named `taskmaster` and configure a user with the necessary privileges. You can use the following SQL commands:
     ```sql
     CREATE DATABASE taskmaster;
     CREATE USER 'username'@'localhost' IDENTIFIED BY 'password';
     GRANT ALL PRIVILEGES ON taskmaster.* TO 'username'@'localhost';
     FLUSH PRIVILEGES;
     ```

4. **Run Database Migrations**
   - First, generate the migration files by running:
     ```bash
     npm generate
     ```
   - Then, apply the migrations to the database using:
     ```bash
     npm migrate
     ```

## Environment Variables

Create a `.env` file in the root directory of your project and add the following environment variables:

- **PORT**: The port on which the API will run (e.g., 8080).
- **REFRESH_TOKEN_SECRET**: Secret key for refreshing tokens.
- **ACCESS_TOKEN_SECRET**: Secret key for access tokens.
- **API_URL**: The base URL of the API (e.g., `http://localhost:8080`).
- **ENV**: Environment mode (development or production).
- **DB_URL**: Connection string for the MySQL database (e.g., `mysql://username:password@localhost/taskmaster`).

## Database Model

The application consists of two main database tables: `users` and `tasks`.

### User Table

The `users` table includes the following fields:
- **id**: Unique identifier for each user (primary key, auto-incremented).
- **name**: User's name.
- **email**: User's email (unique).
- **hash**: Hashed password for user authentication.
- **refresh_token**: Token for refreshing user sessions.

### Task Table

The `tasks` table includes the following fields:
- **id**: Unique identifier for each task (primary key, auto-incremented).
- **title**: Title of the task.
- **description**: Description of the task.
- **progress**: Current status of the task (e.g., 'todo', 'in-progress', 'done').
- **dueDate**: Due date for the task.
- **createdAt**: Timestamp of task creation.
- **userId**: Foreign key referencing the user who created the task.

## API Authentication

Taskmaster uses JSON Web Tokens (JWT) for authentication. Upon successful login, the server generates an access token and a refresh token. The access token is used for authorizing requests to the API, while the refresh token can be used to obtain a new access token when the original expires.

## Usage

### Starting the Application

1. **Run the Application**
   - Use the command `npm start` to start the server.

2. **Access the API Documentation**
   - Swagger is integrated into the application for API documentation. You can access it at `http://localhost:8080/api-docs`.

3. **Testing the API**
   - Use tools like Postman or cURL to test the API endpoints. Make sure to include the JWT token in the authorization header for protected routes.
