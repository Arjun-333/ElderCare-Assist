# ElderCare-Assist Implementation Plan

## Phase 1: Project Setup & Initialization
1.  **Repository Setup**:
    - Initialize Git repo.
    - Create `.gitignore` (node_modules, .env).
    - Create `README.md`.
2.  **Backend Setup**:
    - Initialize `server/package.json`.
    - Install dependencies (`express`, `mongoose`, `dotenv`, `cors`, `bcryptjs`, `jsonwebtoken`).
    - Setup basic Express server structure.
    - Connect to MongoDB.
3.  **Frontend Setup**:
    - Initialize `client` using Vite (`npm create vite@latest client -- --template react`).
    - Install Tailwind CSS.
    - Setup Router (`react-router-dom`).

## Phase 2: Backend Core (Auth & Users)
1.  **Models**:
    - Implement `User` schema.
    - Implement `CaregiverProfile` schema.
2.  **Auth API**:
    - Implement `POST /api/auth/register`.
    - Implement `POST /api/auth/login`.
    - Implement `authMiddleware` for JWT verification.
3.  **Testing**: Use Postman/curl to verify registration and login.

## Phase 3: Frontend Basic & Auth
1.  **Components**:
    - Create Layout (Navbar, Footer).
    - Create Input/Button components.
2.  **Pages**:
    - Login Page.
    - Register Page (with Role selection toggle).
3.  **Integration**:
    - Connect forms to Auth API.
    - Store JWT in localStorage/cookies.
    - Handle redirect on success.

## Phase 4: Caregiver Features (Backend + Frontend)
1.  **Backend**:
    - Implement `GET /api/caregivers` (All verified).
    - Implement `PUT /api/caregivers/profile` (Update own profile).
    - Implement `PUT /api/admin/verify/:id` (Admin only).
2.  **Frontend**:
    - Create "Caregiver Dashboard" to edit profile.
    - Create "Browse Caregivers" page for Patients (Card grid).
    - Create "Admin Dashboard" to verify users.

## Phase 5: Booking System
1.  **Backend**:
    - Implement `Booking` schema.
    - Implement `POST /api/bookings`.
    - Implement `GET /api/bookings` (User specific).
    - Implement `PUT /api/bookings/:id` (Status update).
2.  **Frontend**:
    - **Patient**: "Book Now" modal/page on Caregiver profile.
    - **Patient**: "My Bookings" list view.
    - **Caregiver**: "Incoming Requests" list view with Accept/Reject buttons.

## Phase 6: Polish & Deployment
1.  **UI Polish**: Ensure Tailwind styling is consistent and responsive.
2.  **Error Handling**: specific error messages on frontend.
3.  **Deployment**:
    - Configure `vercel.json` for backend.
    - Deploy Client to Vercel.
    - Database hosted on MongoDB Atlas.
