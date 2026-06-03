# 🎓 AI-Integrated Placement Management System

## 📝 Overview
The AI-Integrated Placement Management System is a premium, minimalist SaaS platform designed to streamline the campus recruitment process. It serves as a centralized hub connecting Students, Recruiters, and University Administrators. The platform offers a sophisticated fintech-inspired UI/UX with modern aesthetics and advanced features such as AI Mock Interviews, Smart Calendars (Google Calendar Integration), and comprehensive role-based access control.

## 🚀 Features
- **Premium SaaS UI/UX**: State-of-the-art, elegant design using Tailwind CSS and Framer Motion for smooth micro-animations.
- **Role-Based Access Control (RBAC)**: Secure access and specific dashboards tailored for Students, Recruiters, and Administrators.
- **AI Mock Interviews**: Intelligent mock interview simulator to help students prepare for real technical and HR rounds.
- **Smart Calendars**: Seamless scheduling for interviews with Google Calendar API integration.
- **Alumni Networking**: Connect students with alumni for mentorship and guidance.
- **Application Tracking**: Real-time tracking of job applications for students and a review pipeline for recruiters.
- **Advanced Analytics**: Interactive charts and data visualization for admins and recruiters using Recharts.

## 👥 User Roles & Capabilities
### 1. 🎓 Student
- **Profile Management**: Build a comprehensive professional profile and upload resumes.
- **Job Discovery & Application**: Browse active placement drives and apply to matched roles.
- **Interview Prep**: Access the AI Mock Interview system for practice.
- **Status Tracking**: Monitor application statuses and upcoming interview schedules via Smart Calendar.
- **Networking**: Engage with the Alumni network.

### 2. 🏢 Recruiter
- **Drive Management**: Post job openings, define criteria, and manage recruitment drives.
- **Candidate Review**: Access applicant profiles, resumes, and shortlist candidates.
- **Interview Scheduling**: Schedule interviews seamlessly using integrated calendars.
- **Analytics**: View application statistics and pipeline metrics.

### 3. 🛡️ Administrator (Admin)
- **User Management**: Approve and verify recruiter accounts; monitor student registrations.
- **System Oversight**: Oversee all placement drives and platform activities.
- **Reporting**: Generate comprehensive placement reports and view overall platform analytics.
- **Settings**: Manage system configurations and security policies.

## 🛠️ Technology Stack
### Frontend (Client-Side)
- **Framework**: React.js 19 with Vite (Fast build tool)
- **Styling**: Tailwind CSS 4 (Utility-first CSS)
- **Animations**: Framer Motion
- **Data Visualization**: Recharts
- **Icons**: Lucide React
- **Form Management**: React Hook Form
- **Routing**: React Router DOM
- **HTTP Client**: Axios

### Backend (Server-Side)
- **Framework**: Spring Boot 3.2.x (Java 21)
- **Database ORM**: Spring Data JPA / Hibernate
- **Security**: Spring Security
- **Authentication**: JWT (JSON Web Tokens)
- **API Integration**: Google API Client (for Smart Calendars)

### Database
- **Production DB**: PostgreSQL
- **Development/Test DB**: H2 Database (In-Memory)

## 🏗️ Architecture Details
The project follows a **Client-Server Architecture** with a strict decoupling of the frontend and backend:
1. **Frontend (React/Vite)**: Operates as a Single Page Application (SPA). It manages the UI state, user interactions, and renders dynamic content. It communicates with the backend via RESTful APIs.
2. **Backend (Spring Boot)**: Acts as the core logic engine. It handles business logic, security, data validation, and database interactions.
3. **Authentication Flow**: Stateless authentication using JWT. Upon successful login, the backend issues a JWT, which the frontend stores and attaches to the `Authorization` header of subsequent API requests.
4. **Database Tier**: Relational data modeling mapped via JPA entities. PostgreSQL handles persistent data storage.

## 💻 Implementation Highlights
- **Backend Migration**: Successfully migrated from a legacy MERN stack to a robust Spring Boot architecture for improved performance, type safety, and scalability.
- **Design System**: A centralized design system utilizing CSS variables and modern typography (Inter and Plus Jakarta Sans).
- **Security**: Passwords are cryptographically hashed, and API endpoints are protected through Spring Security filter chains based on user roles (Student, Admin, Recruiter).

## ⚙️ Getting Started (Local Development)

### Prerequisites
- Node.js (v18+ recommended)
- Java Development Kit (JDK 21)
- Maven
- PostgreSQL installed and running

### 1. Setting up the Backend (Spring Boot)
1. Navigate to the backend directory:
   ```bash
   cd backend-springboot
   ```
2. Configure the database in `src/main/resources/application.properties` (ensure your PostgreSQL credentials and database URL are correct).
3. Run the application using Maven:
   ```bash
   mvn spring-boot:run
   ```
   *The backend will typically start on `http://localhost:8080`.*

### 2. Setting up the Frontend (React + Vite)
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   *The frontend will start on a local port (e.g., `http://localhost:5173`).*

---
*Developed for Campus Placements - Empowering Students and Recruiters.*
