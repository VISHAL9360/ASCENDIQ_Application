import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { User, Bell, Moon, Sun } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
    const { user } = useAuth();
    const { theme, toggleTheme } = useTheme();

    return (
        <nav className={`navbar ${user ? 'with-sidebar' : ''} glass`}>
            {!user && (
                <div style={{ marginRight: 'auto' }}>
                    <Link to="/" className="logo" style={{ textDecoration: 'none' }}>
                        <div className="logo-icon">NH</div>
                        <span style={{ color: 'var(--color-primary)', fontWeight: 700, fontSize: '1.2rem', marginLeft: '0.75rem' }}>Next Hire</span>
                    </Link>
                </div>
            )}

            <div className="nav-actions">
                <button 
                    onClick={toggleTheme} 
                    className="nav-item-icon" 
                    style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                >
                    {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                </button>
                {user ? (
                    <>
                        <button className="nav-item-icon" style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer' }}>
                            <Bell size={20} />
                        </button>
                        <div className="user-profile-btn glass-card" style={{ padding: '0.4rem 1rem' }}>
                            <div className="user-info">
                                <span className="user-name">{user.name}</span>
                                <span className="user-role">{user.role}</span>
                            </div>
                            <div className="avatar-circle" style={{ background: 'var(--color-accent)', color: 'white' }}>
                                <User size={18} />
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="nav-auth-group">
                        <Link to="/login" className="nav-link">Log In</Link>
                        <Link to="/register" className="btn-premium">Get Started</Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;

