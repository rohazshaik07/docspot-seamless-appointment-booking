# 🏥 DOCSPOT - Healthcare Appointment Booking System

A comprehensive healthcare appointment booking platform built with Next.js, enabling patients to easily book appointments with qualified doctors and healthcare professionals.

![DOCSPOT Banner](https://res.cloudinary.com/ded4wm8pu/image/upload/v1751112763/Screenshot_2025-06-28_174223_rywii3.png)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Team Members](#team-members)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [Screenshots](#screenshots)
- [License](#license)

## 🎯 Overview

DOCSPOT is a modern healthcare appointment booking system that bridges the gap between patients and healthcare providers. The platform offers a seamless experience for booking medical appointments, managing doctor profiles, and handling administrative tasks.

### 🌟 Key Highlights

- **Patient-Friendly Interface**: Easy-to-use booking system with intuitive design
- **Doctor Management**: Comprehensive doctor profiles with specializations and availability
- **Admin Dashboard**: Complete administrative control over users, doctors, and appointments
- **Real-time Booking**: Instant appointment confirmation and management
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Secure Authentication**: Role-based access control for patients, doctors, and admins

## ✨ Features

### 🏠 **Homepage**
- Hero section with compelling healthcare messaging
- Featured doctors showcase
- Medical services overview
- Patient testimonials
- FAQ section
- Contact information

### 👨‍⚕️ **Doctor Management**
- Comprehensive doctor profiles with photos and credentials
- Specialization categories (Surgeon, Neurologist, Cardiologist, etc.)
- Doctor availability and time slots
- Patient reviews and ratings
- Experience and qualification details

### 📅 **Appointment Booking**
- Interactive calendar for date selection
- Available time slot display
- Real-time booking confirmation
- Appointment history tracking
- Email notifications (planned)

### 👤 **User Roles**

#### **Patients**
- Browse and search doctors
- Book appointments
- View appointment history
- Rate and review doctors
- Manage personal profile

#### **Doctors**
- Manage personal profile and credentials
- Set availability and time slots
- View upcoming appointments
- Access patient information
- Track earnings and statistics

#### **Administrators**
- User management (patients and doctors)
- Doctor approval system
- Booking oversight
- Platform analytics
- Content management

### 🔐 **Authentication System**
- Secure login/signup functionality
- Role-based access control
- Demo accounts for testing
- JWT token-based authentication
- Google OAuth integration (planned)

## 🛠 Technologies Used

### **Frontend**
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - Modern UI component library
- **Lucide React** - Beautiful icon library
- **React Hook Form** - Form handling and validation

### **Backend**
- **Next.js API Routes** - Server-side API endpoints
- **MongoDB** - NoSQL database for data storage
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing and security

### **Development Tools**
- **ESLint** - Code linting and formatting
- **Prettier** - Code formatting
- **Git** - Version control
- **Vercel** - Deployment platform

## 👥 Team Members

Our dedicated team of 5 members collaborated to bring DOCSPOT to life:

### 🎯 **Team Leader**
**M Vineela**
- Project coordination and management
- Architecture design and implementation
- Code review and quality assurance
- Team collaboration and communication

### 👨‍💻 **Development Team**

**Rohaz Shaik**
- Frontend development and UI/UX implementation
- Component development and styling
- Responsive design optimization
- User experience enhancement

**Samudram Hemanth**
- Backend API development
- Database design and implementation
- Authentication system development
- Server-side logic implementation

**Srilakshmi Avvaru**
- Frontend component development
- Form handling and validation
- State management implementation
- Testing and debugging

**Vinnakota Chandini Sri**
- UI/UX design and implementation
- Image optimization and asset management
- Documentation and content creation
- Quality assurance and testing

## 🚀 Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager
- MongoDB database (local or cloud)
- Git for version control

### Setup Instructions

1. **Clone the Repository**
   \`\`\`bash
   git clone https://github.com/rohazshaik07/docspot-seamless-appointment-booking.git
   cd docspot-healthcare-booking
   \`\`\`

2. **Install Dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. **Environment Configuration**
   Create a `.env.local` file in the root directory:
   \`\`\`env
   # Database
   MONGODB_URI=your_mongodb_connection_string
   
   # Authentication
   JWT_SECRET=your_jwt_secret_key
   NEXTAUTH_SECRET=your_nextauth_secret
   
   # Google OAuth (Optional)
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   
   # Application
   NEXTAUTH_URL=http://localhost:3000
   \`\`\`

4. **Database Setup**
   \`\`\`bash
   # Run the database seeding script
   npm run seed
   \`\`\`

5. **Start Development Server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

6. **Access the Application**
   Open [http://localhost:3000](http://localhost:3000) in your browser

### Demo Accounts

For testing purposes, use these demo accounts:

**Admin Account:**
- Email: `admin@docspot.com`
- Password: `admin123`

**Doctor Account:**
- Email: `dr.ahmed@docspot.com`
- Password: `doctor123`

**Patient Account:**
- Email: `john.doe@example.com`
- Password: `password123`

## 📁 Project Structure

\`\`\`
docspot-healthcare-booking/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication pages
│   ├── admin/                    # Admin dashboard
│   ├── api/                      # API routes
│   ├── doctors/                  # Doctor pages
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Homepage
├── components/                   # Reusable components
│   ├── ui/                       # UI components (shadcn/ui)
│   ├── header.tsx                # Navigation header
│   ├── footer.tsx                # Footer component
│   ├── hero.tsx                  # Hero section
│   ├── doctors.tsx               # Doctors showcase
│   ├── services.tsx              # Services section
│   ├── about.tsx                 # About section
│   ├── testimonials.tsx          # Testimonials
│   └── faq.tsx                   # FAQ section
├── lib/                          # Utility libraries
│   ├── mongodb.ts                # Database connection
│   ├── auth.ts                   # Authentication utilities
│   └── utils.ts                  # General utilities
├── hooks/                        # Custom React hooks
├── types/                        # TypeScript type definitions
├── public/                       # Static assets
├── .env.local                    # Environment variables
├── next.config.js                # Next.js configuration
├── tailwind.config.ts            # Tailwind CSS configuration
├── package.json                  # Dependencies and scripts
└── README.md                     # Project documentation
\`\`\`

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration
- `POST /api/auth/logout` - User logout

### Doctors
- `GET /api/doctors` - Get all doctors
- `GET /api/doctors/[id]` - Get doctor by ID
- `PUT /api/doctors/[id]` - Update doctor profile

### Bookings
- `POST /api/bookings` - Create new booking
- `GET /api/bookings` - Get user bookings
- `PUT /api/bookings/[id]` - Update booking status

### Admin
- `GET /api/admin/doctors` - Get all doctors (admin)
- `GET /api/admin/users` - Get all users (admin)
- `GET /api/admin/bookings` - Get all bookings (admin)
- `PUT /api/admin/doctors/[id]/approve` - Approve doctor

## 🌍 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URI` | MongoDB connection string | Yes |
| `JWT_SECRET` | Secret key for JWT tokens | Yes |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | No |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret | No |
| `NEXTAUTH_SECRET` | NextAuth secret key | Yes |
| `NEXTAUTH_URL` | Application URL | Yes |

## 🤝 Contributing

We welcome contributions from the community! Here's how you can contribute:

### Development Workflow

1. **Fork the Repository**
   \`\`\`bash
   git fork https://github.com/rohazshaik07/docspot-seamless-appointment-booking.git
   \`\`\`

2. **Create Feature Branch**
   \`\`\`bash
   git checkout -b feature/your-feature-name
   \`\`\`

3. **Make Changes**
   - Follow the existing code style
   - Add tests for new features
   - Update documentation as needed

4. **Commit Changes**
   \`\`\`bash
   git commit -m "feat: add your feature description"
   \`\`\`

5. **Push to Branch**
   \`\`\`bash
   git push origin feature/your-feature-name
   \`\`\`

6. **Create Pull Request**
   - Provide clear description of changes
   - Include screenshots for UI changes
   - Reference any related issues

### Code Style Guidelines

- Use TypeScript for type safety
- Follow ESLint and Prettier configurations
- Write meaningful commit messages
- Add comments for complex logic
- Ensure responsive design for all components

### Testing

\`\`\`bash
# Run tests
npm run test

# Run linting
npm run lint

# Type checking
npm run type-check
\`\`\`

## 📸 Screenshots

### Login page
![Homepage](https://res.cloudinary.com/ded4wm8pu/image/upload/v1751112747/Screenshot_2025-06-28_164944_w3t8lh.png)

### Doctor Profiles
![Doctor Profiles](https://res.cloudinary.com/ded4wm8pu/image/upload/v1751112747/Screenshot_2025-06-28_170025_lys3b1.png)

### Booking Interface
![Booking Interface](https://res.cloudinary.com/ded4wm8pu/image/upload/v1751112746/Screenshot_2025-06-28_170415_vqtjra.png)

### Admin Dashboard
![Admin Dashboard](https://res.cloudinary.com/ded4wm8pu/image/upload/v1751112748/Screenshot_2025-06-28_165048_cihvom.png)

## 🚀 Deployment

### Vercel Deployment

1. **Connect Repository**
   - Import project to Vercel
   - Connect GitHub repository

2. **Configure Environment Variables**
   - Add all required environment variables
   - Ensure MongoDB connection is accessible

3. **Deploy**
   \`\`\`bash
   npm run build
   npm run start
   \`\`\`

### Manual Deployment

1. **Build the Project**
   \`\`\`bash
   npm run build
   \`\`\`

2. **Start Production Server**
   \`\`\`bash
   npm run start
   \`\`\`

## 🔮 Future Enhancements

- [ ] **Real-time Notifications** - WebSocket integration for instant updates
- [ ] **Payment Integration** - Stripe/PayPal for appointment payments
- [ ] **Video Consultations** - Telemedicine capabilities
- [ ] **Mobile App** - React Native mobile application
- [ ] **AI Chatbot** - Automated patient assistance
- [ ] **Multi-language Support** - Internationalization
- [ ] **Advanced Analytics** - Detailed reporting and insights
- [ ] **Email/SMS Notifications** - Automated communication system


## 🙏 Acknowledgments

- **Shadcn/ui** for the beautiful component library
- **Unsplash** for high-quality medical images
- **Lucide React** for the icon library
- **Vercel** for hosting and deployment
- **MongoDB** for database services
---

**Built with ❤️ by Team DOCSPOT**

*Empowering healthcare through technology*
