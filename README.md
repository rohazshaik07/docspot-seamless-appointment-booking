# DocSpot - Doctor Appointment Booking System

A comprehensive MERN stack application for managing doctor appointments with role-based access control for patients, doctors, and administrators.

## 🏥 Features

### For Patients
- **User Registration & Authentication**
- **Browse Available Doctors** by specialization
- **Book Appointments** with preferred doctors
- **View Appointment History** and status
- **Upload Medical Documents**
- **Real-time Notifications** for appointment updates

### For Doctors
- **Doctor Application System** with admin approval
- **Appointment Management** (approve/reject/complete)
- **Patient Communication** with notes
- **Schedule Management** and availability
- **Profile Management** with specialization details

### For Administrators
- **User Management** (view, edit, delete users)
- **Doctor Approval System** for new applications
- **Appointment Oversight** across the platform
- **Platform Analytics** and statistics
- **System Governance** and monitoring

## 🛠️ Tech Stack

### Backend
- **Express.js** - Web application framework
- **MongoDB** with Mongoose - Database and ODM
- **JWT Authentication** - Secure user authentication
- **bcryptjs** - Password hashing
- **Multer** - File upload handling
- **CORS** - Cross-origin resource sharing

### Frontend
- **React 18** - User interface library
- **React Router DOM** - Client-side routing
- **Bootstrap & React Bootstrap** - UI components
- **Material UI** - Modern UI components
- **Ant Design** - Additional UI components
- **Axios** - HTTP client for API calls
- **Lucide React** - Icon library

## 📹 Demo & Documentation

- **[Live Demo Video](https://drive.google.com/file/d/1-lynytg9aHKyZfNWuo8ZPCNUWZOwxnEu/view?usp=sharing)**
- **[Project Documentation](./Docs/DOCSPOT%20-%20LTVIP2025TMID50339%20.docx)**
- **[Project Demonstration](./Docs/DOCSPOT%20-%20DEMO%20(1).mp4)**
- **[Technical Documentation](./DOCUMENTATION.md)**

> ℹ️ **Note:** If GitHub does not display or download the `.docx` file directly in your browser, you can right-click the link above and choose "Save link as..." to download it to your device.

## 📋 Prerequisites

Before running this application, make sure you have:

- **Node.js** (v16 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **npm** or **yarn** package manager
- **Git** for version control

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/docspot-appointment-system.git
cd docspot-appointment-system
```

### 2. Install Dependencies
```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 3. Environment Configuration

#### Backend Environment (.env)
Create a `.env` file in the `backend` directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/docspot
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

#### Frontend Environment (.env)
Create a `.env` file in the `frontend` directory:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 4. Database Setup
```bash
# Navigate to backend directory
cd backend

# Clear existing data (optional)
node scripts/clearDatabase.js

# Seed database with sample data
node scripts/seedDatabaseComplete.js
```

### 5. Start the Application
```bash
# Start both backend and frontend concurrently
npm run dev

# Or start them separately:
# Backend (from backend directory)
npm run dev

# Frontend (from frontend directory)
npm start
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## 🔐 Demo Credentials

### Administrator
- **Email**: admin@docspot.com
- **Password**: password123

### Sample Doctors
- **Dr. Michael Johnson**: dr.michael.johnson.2025.v3@example.com / CardioDoc2025!
- **Dr. Sarah Patel**: dr.sarah.patel.2025.v3@example.com / PediaDoc2025!
- **Dr. Emily Chen**: dr.emily.chen.2025.v3@example.com / NeuroDoc2025!

### Sample Patients
- **John Doe**: john.doe@example.com / password123
- **Jane Smith**: jane.smith@example.com / password123

## 📁 Project Structure

```
docspot-appointment-system/
├── backend/                 # Express.js backend
│   ├── config/             # Database configuration
│   ├── controllers/        # Route controllers
│   ├── middlewares/        # Custom middlewares
│   ├── routes/            # API routes
│   ├── schemas/           # MongoDB schemas
│   ├── scripts/           # Database scripts
│   └── index.js           # Server entry point
├── frontend/               # React frontend
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── context/       # React context
│   │   └── App.js         # Main App component
│   └── package.json
├── Docs/                   # Project documentation files
│   └── DOCSPOT - LTVIP2025TMID50339 .docx
├── package.json           # Root package.json
└── README.md
```

## 🔄 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### User Routes
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `POST /api/users/apply-doctor` - Apply to become a doctor

### Doctor Routes
- `GET /api/doctors` - Get all approved doctors
- `GET /api/doctors/appointments` - Get doctor's appointments
- `PUT /api/doctors/appointments/:id/status` - Update appointment status

### Admin Routes
- `GET /api/admin/users` - Get all users
- `GET /api/admin/doctors` - Get all doctors
- `PUT /api/admin/doctors/:id/approve` - Approve doctor application

## 🧪 Testing

### Manual Testing
1. Register as a new user
2. Apply to become a doctor
3. Login as admin to approve doctor
4. Book appointments as a patient
5. Manage appointments as a doctor

### Database Scripts
```bash
# View all collections
node scripts/viewCollections.js

# Clear database
node scripts/clearDatabase.js

# Seed sample data
node scripts/seedDatabaseComplete.js
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👥 Team Members

- **M Vineela** - *Project coordination and management* - [M Vineela](https://github.com/MEKAVINEELA)
- **Samudram Hemanth** - *Frontend Developer* - [Samudram Hemanth](https://github.com/HemanthLXIX)
- **Srilakshmi Avvaru** - *UI/UX Designer* - [Srilakshmi Avvaru](https://github.com/srilakshmi-avvaru)
- **M Vinnakota Chandini Sri** - *Backend Development* - [Vinnakota Chandini Sri](https://github.com/Chandini-0111)
- **Rohaz Shaik** - *Full Stack Developer & Database management* - [Rohaz Shaik](https://github.com/rohazshaik07)
