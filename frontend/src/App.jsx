import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import MyInterviews from './pages/MyInterviews';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import ManageCompanies from './pages/ManageCompanies';
import AdminDrives from './pages/AdminDrives';
import StudentProfile from './pages/StudentProfile';
import PlacementDrives from './pages/PlacementDrives';
import ManageStudents from './pages/ManageStudents';
import RecruiterDrives from './pages/RecruiterDrives';
import RecruiterDashboard from './pages/RecruiterDashboard';
import StudentDashboard from './pages/StudentDashboard';
import LandingPage from './pages/LandingPage';
import ApplicationPipeline from './pages/ApplicationPipeline';
import CareerPrep from './pages/CareerPrep';
import MyApplications from './pages/MyApplications';
import AIResumeAnalyzer from './pages/AIResumeAnalyzer';
import AIMockInterview from './pages/AIMockInterview';
import OfferTracker from './pages/OfferTracker';
import AlumniConnect from './pages/AlumniConnect';
import CertificateVault from './pages/CertificateVault';
import EventCalendar from './pages/EventCalendar';
import FeatureHub from './pages/FeatureHub';

// App Routes Modification Area (Lines 46 & 64-67)
import { 
    MessageSquare, 
    Calendar, 
    Bell, 
    CreditCard, 
    Users, 
    Award, 
    LineChart 
} from 'lucide-react';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <Layout>
            <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Common Routes */}
            <Route element={<ProtectedRoute allowedRoles={['admin', 'student', 'recruiter']} />}>
              <Route path="/calendar" element={<EventCalendar />} />
              <Route path="/notifications" element={<FeatureHub title="Notification Center" description="Stay updated with real-time alerts for application status changes and new job postings." icon={Bell} />} />
            </Route>

            {/* Admin Routes */}
            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/students" element={<ManageStudents />} />
              <Route path="/admin/companies" element={<ManageCompanies />} />
              <Route path="/admin/drives" element={<AdminDrives />} />
              <Route path="/admin/analytics" element={<FeatureHub title="Skill Gap Analytics" description="Deep insights into student skills versus industry requirements to drive better placement outcomes." icon={LineChart} />} />
            </Route>
            {/* Student Routes */}
            <Route element={<ProtectedRoute allowedRoles={['student']} />}>
              <Route path="/student/dashboard" element={<StudentDashboard />} />
              <Route path="/student/drives" element={<PlacementDrives />} />
              <Route path="/student/interviews" element={<MyInterviews />} />
              <Route path="/student/resume-analyzer" element={<AIResumeAnalyzer />} />
              <Route path="/student/mock-interviews" element={<AIMockInterview />} />
              <Route path="/student/offers" element={<OfferTracker />} />
              <Route path="/student/alumni" element={<AlumniConnect />} />
              <Route path="/student/certificates" element={<CertificateVault />} />
              <Route path="/student/career-prep" element={<CareerPrep />} />
              <Route path="/student/applications" element={<MyApplications />} />
              <Route path="/student/profile" element={<StudentProfile />} />
            </Route>

            {/* Recruiter Routes */}
            <Route element={<ProtectedRoute allowedRoles={['recruiter', 'hr']} />}>
              <Route path="/recruiter/dashboard" element={<RecruiterDashboard />} />
              <Route path="/recruiter/drives" element={<RecruiterDrives />} />
              <Route path="/recruiter/queries" element={<FeatureHub title="Candidate Queries" description="Direct messaging system to clarify doubts with applicants and manage communications efficiently." icon={MessageSquare} />} />
              <Route path="/recruiter/pipeline/:driveId" element={<ApplicationPipeline />} />
              <Route path="/recruiter/company" element={<ManageCompanies />} />
            </Route>

            <Route path="/" element={<LandingPage />} />
          </Routes>
        </Layout>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
