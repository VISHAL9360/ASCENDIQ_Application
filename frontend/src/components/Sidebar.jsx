import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    LayoutDashboard,
    Briefcase,
    Users,
    Building2,
    History,
    UserCircle,
    BookOpen,
    LogOut,
    ChevronRight,
    Sparkles,
    Calendar,
    Bell,
    MessageSquare,
    Award,
    LineChart,
    CreditCard
} from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
    const { user, logout } = useAuth();
    const location = useLocation();

    if (!user) return null;

    const menuItems = {
        admin: [
            { name: 'Overview', icon: LayoutDashboard, path: '/admin/dashboard' },
            { name: 'Student Directory', icon: Users, path: '/admin/students' },
            { name: 'Corporate Partners', icon: Building2, path: '/admin/companies' },
            { name: 'Placement Drives', icon: Briefcase, path: '/admin/drives' },
            { name: 'Skill Analytics', icon: LineChart, path: '/admin/analytics' },
            { name: 'Events Calendar', icon: Calendar, path: '/calendar' },
            { name: 'Notifications', icon: Bell, path: '/notifications' },
        ],
        student: [
            { name: 'Dashboard', icon: LayoutDashboard, path: '/student/dashboard' },
            { name: 'Browse Drives', icon: Briefcase, path: '/student/drives' },
            { name: 'AI Resume Analyzer', icon: Sparkles, path: '/student/resume-analyzer' },
            { name: 'AI Mock Interviews', icon: MessageSquare, path: '/student/mock-interviews' },
            { name: 'Events Calendar', icon: Calendar, path: '/calendar' },
            { name: 'Offer Tracker', icon: CreditCard, path: '/student/offers' },
            { name: 'Alumni Connect', icon: Users, path: '/student/alumni' },
            { name: 'Certificate Vault', icon: Award, path: '/student/certificates' },
            { name: 'Career Academy', icon: BookOpen, path: '/student/career-prep' },
            { name: 'My Profile', icon: UserCircle, path: '/student/profile' },
        ],
        recruiter: [
            { name: 'Recruiter Hub', icon: LayoutDashboard, path: '/recruiter/dashboard' },
            { name: 'Active Drives', icon: Briefcase, path: '/recruiter/drives' },
            { name: 'Candidate Queries', icon: MessageSquare, path: '/recruiter/queries' },
            { name: 'Events Calendar', icon: Calendar, path: '/calendar' },
            { name: 'Company Profile', icon: Building2, path: '/recruiter/company' },
        ],
    };

    const navItems = menuItems[user.role] || [];

    return (
        <aside className="sidebar glass" style={{ borderRight: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <div className="sidebar-header">
                <Link to="/" className="logo">
                    <div className="logo-icon">NH</div>
                    <span>Next Hire</span>
                </Link>
            </div>

            <nav className="sidebar-nav">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`nav-item ${isActive ? 'active' : ''}`}
                        >
                            <Icon size={20} />
                            <span>{item.name}</span>
                            {isActive && <ChevronRight size={14} style={{ marginLeft: 'auto' }} />}
                        </Link>
                    );
                })}
            </nav>

            <div className="sidebar-footer">
                <button className="logout-btn" onClick={logout}>
                    <LogOut size={20} />
                    <span>Sign Out</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;

