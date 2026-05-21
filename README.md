# HealthBook – Healthcare Management System

A full-stack healthcare management system built with modern web technologies.
The platform provides role-based access for administrators and patients, enabling secure healthcare record management and appointment workflows.

---

# Features

* Authentication & Authorization
* Admin Dashboard
* Patient Dashboard
* Secure Login System
* MySQL Database Integration
* REST API Backend
* Modern Frontend UI
* Seeded Demo Accounts

---

# Tech Stack

## Frontend

* React.js
* Vite
* Axios
* Tailwind CSS

## Backend

* Node.js
* Express.js
* MySQL
* Sequelize 
* JWT Authentication

---

# Project Structure

```bash
healthbook/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── src/
│   ├── config/
│   ├── seed/
│   └── package.json
│
└── README.md
```

---

# Installation Guide

## 1. Clone Repository

```bash
git clone https://github.com/Nabin-Raj-Chhetri/Appointment-web-dev-Assignment.git
cd Appointment-web-dev-Assignment
Public
```

---

# Database Setup

## MySQL Configuration

Create a MySQL database named:

```sql
CREATE DATABASE health_book;
```

Update your backend `.env` file with your MySQL credentials.

Example:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=health_book
DB_PORT=3306
```

---

# Backend Setup

Navigate to backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

```bash
npm run seed
```

Start backend server:

```bash
npm run dev
```

---

# Frontend Setup

Navigate to frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start frontend server:

```bash
npm run dev
```

---

# Demo Credentials

## Admin Account

```txt
Email: admin@healthbook.com
Password: password123
```

## Patient Account

```txt
Email: patient@healthbook.com
Password: password123
```

---

# Environment Variables

Create a `.env` file inside the backend directory.

Example configuration:

```env
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=health_book
DB_PORT=3306

JWT_SECRET=anyexamplejwt
```

---

# Running the Application

## Backend

```bash
cd backend
npm run dev
```

Backend server runs on:

```txt
http://localhost:8000
```

## Frontend

```bash
cd frontend
npm run dev
```

Frontend runs on:

```txt
http://localhost:5173
```

---

# API Architecture

The backend follows RESTful API principles.

Example modules:

* Authentication
* Users
* Patients
* Appointments
* Medical Records

---

# Security Features

* Password Hashing
* JWT Authentication
* Protected Routes
* Role-Based Access Control
* Environment Variable Protection

---

# Future Improvements

* Doctor Module
* Appointment Scheduling
* Video Consultation
* Email Notifications
* Medical Report Upload
* Prescription Management

---

# Author

Developed by **Nabin Raj Chhetri**

GitHub: `https://github.com/Nabin-Raj-Chhetri/Appointment-web-dev-Assignment.git`

---

# License

This project is licensed under the MIT License.
