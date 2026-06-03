import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Loader2, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'student'
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const res = await register(formData.username, formData.email, formData.password, formData.role);
            if (res) {
                setSuccess(true);
                setTimeout(() => navigate('/login'), 2000);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--color-bg-secondary)' }}>
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass-card" style={{ padding: '48px', textAlign: 'center', maxWidth: '400px' }}>
                    <CheckCircle2 size={64} color="var(--color-success)" style={{ marginBottom: '24px' }} />
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '12px' }}>Registration Successful!</h2>
                    <p style={{ color: 'var(--color-text-muted)', marginBottom: '24px' }}>Redirecting you to the login page...</p>
                    <Loader2 className="animate-spin" size={24} color="var(--color-accent)" style={{ margin: '0 auto' }} />
                </motion.div>
            </div>
        );
    }

    return (
        <div style={{ 
            minHeight: '100vh', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            backgroundColor: 'var(--color-bg-secondary)',
            padding: '40px 20px'
        }}>
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card" 
                style={{ 
                    width: '100%', 
                    maxWidth: '480px', 
                    padding: '48px', 
                    backgroundColor: 'white',
                    border: '1px solid var(--color-border)'
                }}
            >
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <div style={{ 
                        width: '48px', 
                        height: '48px', 
                        backgroundColor: 'var(--color-primary)', 
                        color: 'white', 
                        borderRadius: '12px', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        margin: '0 auto 24px',
                        fontWeight: 800,
                        fontSize: '1.2rem'
                    }}>NH</div>
                    <h1 style={{ 
                        fontSize: '1.8rem', 
                        fontWeight: 800, 
                        color: 'var(--color-primary)', 
                        fontFamily: 'var(--font-title)',
                        letterSpacing: '-0.03em',
                        marginBottom: '8px'
                    }}>Create your account</h1>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>Join the Next Hire placement ecosystem</p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-main)' }}>Full Name / Username</label>
                        <div style={{ position: 'relative' }}>
                            <User size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                            <input
                                type="text"
                                required
                                minLength={3}
                                maxLength={20}
                                placeholder="john_doe"
                                style={{ 
                                    width: '100%', padding: '12px 16px 12px 48px', borderRadius: '8px', 
                                    border: '1px solid var(--color-border)', outline: 'none', fontSize: '0.95rem', transition: 'var(--transition)'
                                }}
                                value={formData.username}
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            />
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-main)' }}>Email Address</label>
                        <div style={{ position: 'relative' }}>
                            <Mail size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                            <input
                                type="email"
                                required
                                placeholder="john@university.edu"
                                style={{ 
                                    width: '100%', padding: '12px 16px 12px 48px', borderRadius: '8px', 
                                    border: '1px solid var(--color-border)', outline: 'none', fontSize: '0.95rem', transition: 'var(--transition)'
                                }}
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-main)' }}>Password</label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                            <input
                                type="password"
                                required
                                minLength={6}
                                maxLength={40}
                                placeholder="••••••••"
                                style={{ 
                                    width: '100%', padding: '12px 16px 12px 48px', borderRadius: '8px', 
                                    border: '1px solid var(--color-border)', outline: 'none', fontSize: '0.95rem', transition: 'var(--transition)'
                                }}
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-main)' }}>Account Type</label>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                            <button 
                                type="button"
                                onClick={() => setFormData({ ...formData, role: 'student' })}
                                style={{ 
                                    padding: '12px', borderRadius: '8px', border: '1px solid', 
                                    borderColor: formData.role === 'student' ? 'var(--color-accent)' : 'var(--color-border)',
                                    backgroundColor: formData.role === 'student' ? 'var(--color-accent-soft)' : 'white',
                                    color: formData.role === 'student' ? 'var(--color-accent)' : 'var(--color-text-muted)',
                                    fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', transition: 'var(--transition)'
                                }}
                            >
                                Student
                            </button>
                            <button 
                                type="button"
                                onClick={() => setFormData({ ...formData, role: 'recruiter' })}
                                style={{ 
                                    padding: '12px', borderRadius: '8px', border: '1px solid', 
                                    borderColor: formData.role === 'recruiter' ? 'var(--color-accent)' : 'var(--color-border)',
                                    backgroundColor: formData.role === 'recruiter' ? 'var(--color-accent-soft)' : 'white',
                                    color: formData.role === 'recruiter' ? 'var(--color-accent)' : 'var(--color-text-muted)',
                                    fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', transition: 'var(--transition)'
                                }}
                            >
                                Recruiter
                            </button>
                        </div>
                    </div>

                    {error && <p style={{ color: 'var(--color-danger)', fontSize: '0.85rem', textAlign: 'center', fontWeight: 500 }}>{error}</p>}

                    <button type="submit" disabled={loading} className="btn-premium" style={{ width: '100%', padding: '14px', justifyContent: 'center', fontSize: '1rem', marginTop: '12px' }}>
                        {loading ? <Loader2 className="animate-spin" size={20} /> : 'Create account'}
                    </button>
                </form>

                <div style={{ marginTop: '32px', textAlign: 'center' }}>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                        Already have an account? <Link to="/login" style={{ fontWeight: 700, color: 'var(--color-accent)', textDecoration: 'none' }}>Sign in</Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;
