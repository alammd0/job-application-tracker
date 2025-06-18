# 🧾 Job Application Tracker (JAT)
*A Website For Tracking Jobs*

📅 **Date:** 17-06-2025  
👤 **Created by:** Md Khalid Alam

---

## 📌 Project Description

**Job Application Tracker (JAT)** is a web-based application designed to streamline and simplify the job search process for candidates. It provides users with a centralized platform to track job applications, manage statuses, and stay organized throughout their job-hunting journey.

---

## 🎯 Platform Goals

- Provide a user-friendly and efficient interface for tracking job applications.
- Enable users to **add**, **update**, **delete**, and **filter** job entries based on status (`Applied`, `Interview`, `Offer`, `Rejected`).
- Ensure secure user access and authentication to manage personal job data.

---

## 🧑‍💻 Frontend Tech Stack

- **React.js** (with TypeScript)
- **Redux Toolkit** for state management
- **React Router Dom** for routing
- **React Toastify** for toast notifications
- **Tailwind CSS** or custom styling
- **Axios** for making API requests
- **React Icons** for UI icons

### ✨ Frontend Features

- User authentication (Signup/Login)
- Form-based job creation
- Job filtering by status
- Dashboard to manage all jobs

---

## 🔐 Backend Tech Stack

- **Node.js** with **Express.js**
- **JavaScript**
- **JWT** for secure authentication
- **Zod** for schema validation (published as NPM package)
- **Nodemailer** for sending email notifications
- **bcryptjs** for password hashing
- Business logic for user and job CRUD operations

---

## 🗃️ Database Design

- **PostgreSQL** (hosted on Render)
- **Prisma** ORM for database operations

### 📂 Core Models

- **User**: Stores credentials
- **Job**: Stores company, role, applied date, notes, status, etc.

---

## 🔗 API Design

RESTful APIs for all operations related to users and jobs. Secured using JWT middleware.

### 📡 Sample Endpoints

- `POST /signup` – Register a new user
- `POST /login` – Login user
- `GET /get-user/:id` – Get user info by ID
- `DELETE /delete-user/:id` – Delete user & related jobs
- `POST /create-job` – Create a new job
- `PUT /update-job/:id` – Update job entry
- `GET /get-all-jobs` – Get all jobs by user
- `GET /get-job-details/:id` – Get job details by ID
- `DELETE /delete-job/:id` – Delete job and update user

---

## 🚀 How to Use This Project

### 1. **Clone the Repository**
```bash
git clone https://github.com/alammd0/job-application-tracker.git
cd job-application-tracker
---

## Set Up Environment Variables
