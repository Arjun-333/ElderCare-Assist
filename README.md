# ElderCare-Assist

**Elderly Nursing & Healthcare Assistance Platform**

A MERN stack web platform connecting elderly patients with verified caregivers for home-based care services. Built for reliability and ease of use.

## Features
- **Role-Based Access**: Patient, Caregiver, and Admin roles.
- **Caregiver Directory**: Search and filter verified professionals.
- **Booking System**: Schedule appointments with notes.
- **Admin Verification**: Caregivers must be verified by admin before taking bookings.
- **Responsive UI**: Built with React and Tailwind CSS.
- **Authentication**: Secure JWT-based login/signup.

## Tech Stack
- **Frontend**: React (Vite), Tailwind CSS, Axios
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Auth**: JWT, Bcrypt

## Prerequisites
- Node.js (v14+)
- MongoDB (Running locally or Atlas URI)

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/Arjun-333/ElderCare-Assist.git
cd ElderCare-Assist
```

### 2. Backend Setup
```bash
cd server
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and Secret
npm run dev
```

### 3. Frontend Setup
```bash
cd client
npm install
npm run dev
```

## User Roles & Testing
- **Patient**: Register as 'Patient'. Browse caregivers -> Book.
- **Caregiver**: Register as 'Caregiver'. Fill details. Wait for verification (Update `isVerified` in DB or use Admin).
- **Admin**: No registration UI (for security). Manually set `role: "admin"` in MongoDB for a user to access the Admin Dashboard at `/`.

## Note
- This is an internship project with specific constraints (No Payments, No Emergency Services).
- Payment is assumed to be settled offline.
