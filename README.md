# 🚀 AscendIQ - AI-Powered Placement Management System

<div align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Spring_Boot-F2F4F9?style=for-the-badge&logo=spring-boot" alt="Spring Boot" />
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Google_Gemini_AI-4285F4?style=for-the-badge&logo=google&logoColor=white" alt="Gemini AI" />
  <img src="https://img.shields.io/badge/AWS_S3-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white" alt="AWS" />
</div>

<br/>

**AscendIQ** is a state-of-the-art, full-stack Placement Management Platform designed to bridge the gap between Students, Recruiters, and University Admins. Powered by modern web technologies and advanced Artificial Intelligence (Google Gemini), it automates resume parsing, conducts AI mock interviews, tracks job offers, and connects students with alumni.

---

## ✨ Key Features

### 🎓 For Students
- **AI Resume Analyzer**: Upload your resume and instantly receive a parsed skill analysis, ATS score, and tailored improvement suggestions powered by Gemini AI.
- **AI Mock Interviews**: Select your target domain (Software Engineering, Data Science, HR) and chat dynamically with an AI interviewer. Get real-time grading, model answers, and detailed feedback.
- **Offer Tracker**: Dashboard to manage your placement offers, compare CTCs, and track your joining dates.
- **Alumni Connect**: Directly connect with verified university alumni working in top-tier product and service-based companies.
- **Certificate Vault**: Securely upload and verify your technical certifications.

### 🏢 For Recruiters
- **Drive Management**: Create and manage campus placement drives, specify required skills, and set eligibility criteria (CGPA, no backlogs).
- **Application Pipeline**: Streamline the recruitment process by tracking candidates through multiple interview rounds.
- **Company Profile**: Update corporate profiles and track all campus hiring metrics in one centralized dashboard.

### ⚙️ For Administrators
- **Real-time Analytics**: Gain insights into student performance, placement statistics, and skill gap analysis across the university.
- **Student & Company Management**: Complete control over platform users, verifying student records and onboarding new recruiting partners.
- **Event Calendar**: Schedule and broadcast upcoming workshops, seminars, and placement drives.

---

## 💻 Tech Stack

### Frontend Architecture
- **Framework**: React.js (Vite)
- **Styling**: Vanilla CSS with modern Glassmorphism UI
- **Routing**: React Router DOM (v6)
- **Icons**: Lucide React
- **Network Actions**: Axios with JWT Interceptors

### Backend Architecture
- **Framework**: Java 21, Spring Boot 3.2.x
- **Security**: Spring Security with JWT (JSON Web Tokens)
- **Database**: PostgreSQL (Hibernate/JPA for ORM)
- **Cloud Storage**: AWS S3 SDK (Resume uploads)
- **AI Engine**: Google Gemini API SDK

---

## 🛠️ Local Setup & Installation

Follow these steps to run the AscendIQ platform on your local machine.

### Prerequisites
- Node.js (v18+)
- Java JDK 21
- Maven (v3.8+)
- PostgreSQL installed and running locally

### 1. Backend Setup (Spring Boot)
Navigate to the backend directory:
```bash
cd backend-springboot
```

Create a hidden `application-secrets.properties` file in `src/main/resources/` with the following variables:
```properties
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/ffdb
SPRING_DATASOURCE_USERNAME=postgres
SPRING_DATASOURCE_PASSWORD=your_db_password
JWT_SECRET=your_super_secret_jwt_key_that_is_long_enough
GEMINI_API_KEY=AIzaSy...
AWS_ACCESS_KEY=your_aws_key
AWS_SECRET_KEY=your_aws_secret
```

Build and run the application:
```bash
mvn clean package -DskipTests
mvn spring-boot:run
```
*The backend will start at `http://localhost:8080/api`*

### 2. Frontend Setup (React/Vite)
Navigate to the frontend directory:
```bash
cd frontend
```

Install NPM dependencies:
```bash
npm install
```

Start the Vite development server:
```bash
npm run dev
```
*The frontend will start at `http://localhost:5173`*

---

## 🔒 Security & Roles
The platform implements rigid Role-Based Access Control (RBAC):
- `ROLE_STUDENT`: Access to learning, mock interviews, applying for drives.
- `ROLE_RECRUITER`: Access to post drives, review applications, download resumes.
- `ROLE_ADMIN`: Master access to system analytics and user management.

Authentication is handled securely via **JWT Bearer Tokens** passed in the HTTP Authorization headers.

---

## 🤝 Contributing
Contributions, issues, and feature requests are welcome!
Feel free to check the [issues page](https://github.com/VISHAL9360/ASCENDIQ_Application/issues) if you want to contribute.

---

<p align="center">
  <i>Developed with ❤️ for seamless university placements.</i>
</p>
