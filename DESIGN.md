# ElderCare-Assist - Project Design Specification

## 1. Project Architecture

### Tech Stack
- **Frontend**: React.js (Vite), Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JsonWebToken (JWT) with secure cookies or headers.
- **Deployment**: Vercel (Frontend & Backend)

### Folder Structure
#### Backend (`/server`)
```
/server
  /config         # DB connection, env vars
  /controllers    # Request logic
  /models         # Mongoose schemas
  /routes         # API routes
  /middleware     # Auth, Error handling
  index.js        # Entry point
```

#### Frontend (`/client`)
```
/client
  /src
    /components   # Reusable UI components
    /pages        # Route pages (Home, Login, Dashboard)
    /context      # Auth context (Global state)
    /services     # API calls (Axios instances)
  App.jsx         # Main component with Routes
```

## 2. Database Schemas (MongoDB)

### User Schema
| Field | Type | Description |
|-------|------|-------------|
| `name` | String | Full name |
| `email` | String | Unique, Verified |
| `password` | String | Hashed (bcrypt) |
| `role` | String | `patient` \| `caregiver` \| `admin` |
| `createdAt` | Date | Timestamp |

### Profile Schemas (Linked to User)
*Ideally stored in separate collections or as sub-documents in User if small.*

**Caregiver Profile**
| Field | Type | Description |
|-------|------|-------------|
| `userId` | ObjectId | Ref to User |
| `specialization` | String | e.g. "Nurse", "Physiotherapist" |
| `experience` | Number | Years of experience |
| `details` | String | Bio / Qualifications |
| `isVerified` | Boolean | Admin approval status (Default: false) |
| `availability` | Boolean | Is currently accepting bookings |

### Booking Schema
| Field | Type | Description |
|-------|------|-------------|
| `patientId` | ObjectId | Ref to User (Patient) |
| `caregiverId` | ObjectId | Ref to User (Caregiver) |
| `service` | String | Service requested |
| `date` | Date | Date of appointment |
| `status` | String | `pending` \| `accepted` \| `rejected` \| `completed` |
| `notes` | String | Special instructions |

## 3. REST API Definitions

### Authentication
- `POST /api/auth/register`: Create new user (Role selection required).
- `POST /api/auth/login`: Authenticate and return JWT.
- `GET /api/auth/profile`: Get current user details.

### Caregivers
- `GET /api/caregivers`: List verified caregivers (Public/Patient).
- `GET /api/caregivers/:id`: specific profile details.
- `PUT /api/caregivers/profile`: Update profile (Caregiver only).

### Bookings
- `POST /api/bookings`: Create a new service request (Patient).
- `GET /api/bookings`: Get my bookings (Patient see outgoing, Caregiver see incoming).
- `PUT /api/bookings/:id`: Update status (Accept/Reject for Caregiver, Cancel for Patient).

### Admin
- `GET /api/admin/pending`: Get unverified caregivers.
- `PUT /api/admin/verify/:id`: Approve a caregiver.

## 4. User Flows

### A. Booking a Caregiver (Patient)
1.  **Login**: Patient logs in to dashboard.
2.  **Discovery**: Browses list of "Verified" caregivers or searches by type (Nurse, Attendant).
3.  **Booking**: Clicks "Book Now" on a profile -> Fills date/time & problem description -> Submits.
4.  **Wait**: Booking status shows "Pending" in Dashboard.
5.  **CONFIRMATION**: Once Caregiver accepts, status changes to "Accepted".

### B. Caregiver Service Lifecycle
1.  **Onboarding**: Sign up as 'Caregiver' -> Complete Profile (Specialization, Experience).
2.  **Verification**: Wait for Admin approval (Profile hidden until approved).
3.  **Operation**: Once verified, receive booking requests in Dashboard.
4.  **Action**: View Request -> Click "Accept" or "Reject".
5.  **Completion**: detailed view of patient info (after acceptance).

## 5. Minimal Feature Set (Internship Scope)

1.  **Auth System**: Secure Login/Register with Role selection.
2.  **Caregiver Directory**: Simple list view with filtering by category.
3.  **Verification Gate**: Caregivers cannot receive bookings until Admin toggles `isVerified`.
4.  **Booking State Machine**: Simple Pending -> Accepted/Rejected flow.
5.  **Responsive UI**: Clean interface using Tailwind CSS.
6.  **No Payments**: "Payment to be settled in person" note.

## 6. Constraints Adherence
- **No Payments**: Handled via text/manual process implication.
- **No Emergency**: Clearly labeled "Non-Emergency Platform".
- **No Mobile App**: Responsive Web App only.
