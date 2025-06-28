# 🏥 DOCSPOT - Healthcare Appointment Booking System

A comprehensive healthcare appointment booking platform built with Next.js, enabling patients to easily book appointments with qualified doctors and healthcare professionals.

![DOCSPOT Banner](https://res.cloudinary.com/ded4wm8pu/image/upload/v1751112763/Screenshot_2025-06-28_174223_rywii3.png)

**Live Demo**: [DOCSPOT - Check our work here!](https://docspot-seamless-appointment-bookin.vercel.app/)


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

### 🏠 Homepage

- Hero section with compelling healthcare messaging  
- Featured doctors showcase  
- Medical services overview  
- Patient testimonials  
- FAQ section  
- Contact information  

### 👨‍⚕️ Doctor Management

- Doctor profiles with photos and credentials  
- Specializations (Surgeon, Neurologist, Cardiologist, etc.)  
- Availability and time slot setting  
- Patient reviews and ratings  

### 📅 Appointment Booking

- Interactive calendar  
- Real-time slot availability  
- Booking history tracking  
- Email notifications (planned)  

### 👤 User Roles

#### Patients

- Browse/search doctors  
- Book appointments  
- View appointment history  
- Rate/review doctors  

#### Doctors

- Manage profile & credentials  
- Set availability  
- View appointments  
- Track earnings  

#### Admins

- Manage users & doctors  
- Approve doctors  
- Booking oversight  
- Platform analytics  

### 🔐 Authentication System

- JWT-based authentication  
- Role-based access  
- Google OAuth (planned)  

## 🛠 Technologies Used

### Frontend

- **Next.js 14**  
- **TypeScript**  
- **Tailwind CSS**  
- **Shadcn/ui**  
- **Lucide React**  
- **React Hook Form**

### Backend

- **Next.js API Routes**  
- **MongoDB**  
- **JWT**  
- **bcryptjs**

### Development Tools

- **ESLint**  
- **Prettier**  
- **Git**  
- **Vercel**

## 👥 Team Members

### 🎯 Team Leader

**[M Vineela](https://github.com/MEKAVINEELA)** 
- Project coordination and management
- Architecture design and implementation
- Code review and quality assurance
- Team collaboration and communication

### 👨‍💻 Development Team

**[Rohaz Shaik](https://github.com/rohazshaik07)** 
- Frontend development and UI/UX implementation
- Component development and styling
- Responsive design optimization
- User experience enhancement
  
**[Samudram Hemanth](https://github.com/HemanthLXIX)**
- Backend API development
- Database design and implementation
- Authentication system development
- Server-side logic implementation
  
**[Srilakshmi Avvaru](https://github.com/srilakshmi-avvaru)**
- Frontend component development
- Form handling and validation
- State management implementation
- Testing and debugging
  
**[Vinnakota Chandini Sri](https://github.com/Chandini-0111)** 
- UI/UX design and implementation
- Image optimization and asset management
- Documentation and content creation
- Quality assurance and testing

## 🚀 Installation

### Prerequisites

- Node.js (v18+)  
- MongoDB  
- Git  

### Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/docspot-healthcare-booking.git
   cd docspot-healthcare-booking
   ```

2. **Install Dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure Environment**
   Create a `.env.local` file:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   NEXTAUTH_SECRET=your_nextauth_secret
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Seed the Database**
   ```bash
   npm run seed
   ```

5. **Start the App**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Visit**
   Open [http://localhost:3000](http://localhost:3000)

### Demo Accounts

- **Admin**: `admin@docspot.com` / `admin123`  
- **Doctor**: `dr.ahmed@docspot.com` / `doctor123`  
- **Patient**: `john.doe@example.com` / `password123`  

## 📁 Project Structure

```
docspot-healthcare-booking/
├── app/
│   ├── (auth)/
│   ├── admin/
│   ├── api/
│   ├── doctors/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/
│   ├── header.tsx
│   ├── footer.tsx
│   ├── hero.tsx
│   ├── doctors.tsx
│   ├── services.tsx
│   ├── about.tsx
│   ├── testimonials.tsx
│   └── faq.tsx
├── lib/
│   ├── mongodb.ts
│   ├── auth.ts
│   └── utils.ts
├── hooks/
├── types/
├── public/
├── .env.local
├── next.config.js
├── tailwind.config.ts
├── package.json
└── README.md
```

## 🔌 API Endpoints

### Auth

- `POST /api/auth/login`  
- `POST /api/auth/signup`  
- `POST /api/auth/logout`  

### Doctors

- `GET /api/doctors`  
- `GET /api/doctors/[id]`  
- `PUT /api/doctors/[id]`  

### Bookings

- `POST /api/bookings`  
- `GET /api/bookings`  
- `PUT /api/bookings/[id]`  

### Admin

- `GET /api/admin/doctors`  
- `GET /api/admin/users`  
- `GET /api/admin/bookings`  
- `PUT /api/admin/doctors/[id]/approve`  

## 🌍 Environment Variables

| Variable               | Description                      | Required |
|------------------------|----------------------------------|----------|
| `MONGODB_URI`          | MongoDB connection               | ✅        |
| `JWT_SECRET`           | JWT secret key                   | ✅        |
| `NEXTAUTH_SECRET`      | Auth session secret              | ✅        |
| `NEXTAUTH_URL`         | Site base URL                    | ✅        |
| `GOOGLE_CLIENT_ID`     | Google OAuth                     | ❌        |
| `GOOGLE_CLIENT_SECRET` | Google OAuth                     | ❌        |

## 🤝 Contributing

### Workflow

1. **Fork**
   ```bash
   git fork https://github.com/your-username/docspot-healthcare-booking.git
   ```

2. **Branch**
   ```bash
   git checkout -b feature/your-feature
   ```

3. **Commit**
   ```bash
   git commit -m "feat: your message"
   ```

4. **Push**
   ```bash
   git push origin feature/your-feature
   ```

5. **Pull Request**
   Submit a PR with your changes.

### Guidelines

- Use TypeScript  
- Lint + format code  
- Write clear commits  
- Ensure responsiveness  
- Comment complex logic  

### Testing

```bash
npm run test
npm run lint
npm run type-check
```

## 📸 Screenshots

### Login Page  
![Homepage](https://res.cloudinary.com/ded4wm8pu/image/upload/v1751112747/Screenshot_2025-06-28_164944_w3t8lh.png)

### Doctor Profiles  
![Doctor Profiles](https://res.cloudinary.com/ded4wm8pu/image/upload/v1751112747/Screenshot_2025-06-28_170025_lys3b1.png)

### Booking Interface  
![Booking Interface](https://res.cloudinary.com/ded4wm8pu/image/upload/v1751112746/Screenshot_2025-06-28_170415_vqtjra.png)

### Admin Dashboard  
![Admin Dashboard](https://res.cloudinary.com/ded4wm8pu/image/upload/v1751112748/Screenshot_2025-06-28_165048_cihvom.png)

## 🚀 Deployment

### Vercel

- Connect repo to Vercel  
- Add env vars  
- Deploy with:
  ```bash
  npm run build
  npm run start
  ```

### Manual

```bash
npm run build
npm run start
```

## 🔮 Future Enhancements

- [ ] Real-time Notifications (WebSockets)  
- [ ] Payment Integration  
- [ ] Video Consultations  
- [ ] React Native Mobile App  
- [ ] AI Chatbot Support  
- [ ] Multi-language Support  
- [ ] Email/SMS Alerts  
- [ ] Admin Analytics Dashboard  

## 🙏 Acknowledgments

- Shadcn/ui  
- Lucide React  
- Unsplash  
- MongoDB  
- Vercel  

---

**Built with ❤️ by Team DOCSPOT**  
_Empowering healthcare through technology_
