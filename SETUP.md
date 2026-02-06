# Vacation Management System - Setup Guide

## Overview
Comprehensive vacation/leave management system for HR departments to manage employee vacation requests, approvals, and tracking.

## Features
- Employee vacation request submission
- Manager/HR approval workflow
- Vacation days tracking
- Role-based access control (Employee, Manager, HR, Admin)
- Real-time vacation status updates
- Email notifications
- Dashboard with analytics

## Technology Stack

### Backend
- Node.js & Express.js
- MongoDB with Mongoose
- JWT Authentication
- RESTful API

### Frontend
- React.js
- Material-UI / Tailwind CSS
- Axios for API calls
- React Router for navigation

## Prerequisites
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## Installation

### 1. Clone the repository
```bash
git clone https://github.com/smsu4ev/vacation-management-system.git
cd vacation-management-system
```

### 2. Backend Setup
```bash
cd backend
npm install

# Create .env file
cp .env.example .env

# Edit .env with your configurations:
# MONGODB_URI=mongodb://localhost:27017/vacation-management
# JWT_SECRET=your_jwt_secret_key
# PORT=5000

# Start the server
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Vacations
- `GET /api/vacations` - Get all vacations (filtered by role)
- `POST /api/vacations` - Create vacation request
- `PUT /api/vacations/:id/approve` - Approve vacation
- `PUT /api/vacations/:id/reject` - Reject vacation

### Users
- `GET /api/users/me` - Get current user profile
- `GET /api/users` - Get all users (Admin/HR only)

## Database Schema

### User Model
- firstName, lastName
- email (unique)
- password (hashed)
- role (employee/manager/hr/admin)
- department, position
- manager (reference to User)
- vacationDays {total, used, remaining}

### Vacation Model
- employee (reference to User)
- startDate, endDate
- days
- type (annual/sick/unpaid/emergency)
- reason
- status (pending/approved/rejected/cancelled)
- approvedBy (reference to User)
- approvalDate
- rejectionReason

## Default Roles
- **Employee**: Can request vacations and view their own requests
- **Manager**: Can approve/reject vacation requests for their subordinates
- **HR**: Can approve/reject all vacation requests and manage users
- **Admin**: Full system access

## Contributing
Pull requests are welcome. For major changes, please open an issue first.

## License
MIT License
