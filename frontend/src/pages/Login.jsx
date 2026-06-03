import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Mail, Lock, Loader2, ShieldCheck, CheckCircle2, Zap, Users, Building2 } from 'lucide-react';

const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { login, googleLogin } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        /* global google */
        if (window.google) {
            window.google.accounts.id.initialize({
                client_id: "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com",
                callback: handleGoogleResponse
            });
        }
    }, []);

    const handleGoogleResponse = async (response) => {
        setLoading(true);
        try {
            const success = await googleLogin(response.credential);
            if (success) navigate('/');
            else setError('Google authentication failed');
        } catch (err) {
            setError('Google login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const success = await login(formData.username, formData.password);
            if (success) navigate('/');
            else setError('Invalid credentials');
        } catch (err) {
            setError('Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ 
            minHeight: '100vh', 
            display: 'grid', 
            gridTemplateColumns: '1.2fr 0.8fr',
            backgroundColor: 'var(--color-bg-primary)',
        }}>
            {/* Left Side - Login Form */}
            <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                padding: '40px',
                borderRight: '1px solid var(--color-border)'
            }}>
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    style={{ width: '100%', maxWidth: '400px' }}
                >
                    <div style={{ marginBottom: '40px' }}>
                        <div style={{ 
                            width: '40px', 
                            height: '40px', 
                            backgroundColor: 'var(--color-primary)', 
                            color: 'white', 
                            borderRadius: '10px', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            marginBottom: '24px',
                            fontWeight: 800,
                            fontSize: '1rem'
                        }}>NH</div>
                        <h1 style={{ 
                            fontSize: '2rem', 
                            fontWeight: 800, 
                            color: 'var(--color-primary)', 
                            fontFamily: 'var(--font-title)',
                            letterSpacing: '-0.03em',
                            marginBottom: '8px'
                        }}>Sign in</h1>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem' }}>Access your personalized placement hub.</p>
                    </div>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-main)' }}>Username or Email</label>
                            <div style={{ position: 'relative' }}>
                                <Mail size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                                <input
                                    type="text"
                                    required
                                    placeholder="john_doe or email"
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
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-main)' }}>Password</label>
                                <Link to="/forgot-password" style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-accent)', textDecoration: 'none' }}>Forgot password?</Link>
                            </div>
                            <div style={{ position: 'relative' }}>
                                <Lock size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                                <input
                                    type="password"
                                    required
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

                        {error && <p style={{ color: 'var(--color-danger)', fontSize: '0.85rem', textAlign: 'center', fontWeight: 500 }}>{error}</p>}

                        <button type="submit" disabled={loading} className="btn-premium" style={{ width: '100%', padding: '14px', justifyContent: 'center', fontSize: '1rem', marginTop: '12px' }}>
                            {loading ? <Loader2 className="animate-spin" size={20} /> : 'Sign in to platform'}
                        </button>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', margin: '8px 0' }}>
                            <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--color-border)' }}></div>
                            <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>OR</span>
                            <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--color-border)' }}></div>
                        </div>

                        <button 
                            type="button" 
                            onClick={() => {
                                /* Google Login logic will be handled by the script in index.html */
                                window.google?.accounts.id.prompt();
                            }}
                            className="btn-premium-outline" 
                            style={{ width: '100%', padding: '12px', justifyContent: 'center', fontSize: '0.95rem', gap: '12px', backgroundColor: 'white' }}
                        >
                            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" style={{ width: '18px' }} />
                            Sign in with Google
                        </button>
                    </form>

                    <div style={{ marginTop: '32px', textAlign: 'center' }}>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                            Don't have an account? <Link to="/register" style={{ fontWeight: 700, color: 'var(--color-accent)', textDecoration: 'none' }}>Join your institution</Link>
                        </p>
                    </div>

                    <div style={{ marginTop: '48px', paddingTop: '24px', borderTop: '1px solid var(--color-border)', color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>
                        <p style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                            <ShieldCheck size={14} /> SOC2 Type II Certified
                        </p>
                        <p style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <CheckCircle2 size={14} /> Trusted by 500+ global recruiters
                        </p>
                    </div>
                </motion.div>
            </div>

            {/* Right Side - Info Panel */}
            <div style={{ 
                backgroundColor: 'var(--color-bg-secondary)', 
                padding: '80px 40px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
            }}>
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 800, fontFamily: 'var(--font-title)', marginBottom: '32px', letterSpacing: '-0.02em' }}>
                        The complete ecosystem for <br /> every stakeholder.
                    </h3>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        {[
                            { title: 'For Students', icon: Users, desc: 'AI-powered interview prep and direct recruiter access.' },
                            { title: 'For Recruiters', icon: Building2, desc: 'Unified candidate pipelines and automated scheduling.' },
                            { title: 'For TPOs', icon: Zap, desc: 'Enterprise-grade analytics and real-time placement tracking.' }
                        ].map((role, i) => (
                            <div key={i} className="glass-card" style={{ padding: '24px', backgroundColor: 'white', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                                <div style={{ color: 'var(--color-accent)' }}><role.icon size={20} /></div>
                                <div>
                                    <h4 style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '4px' }}>{role.title}</h4>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>{role.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{ marginTop: '48px' }}>
                        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '16px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>Recent Ecosystem Activity</p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {[
                                'Google just posted 12 new roles',
                                '1,200 students placed this month',
                                'AI Interview module upgraded v2.4'
                            ].map((item, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: 'var(--color-primary)' }}>
                                    <CheckCircle2 size={14} color="var(--color-success)" /> {item}
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Login;
