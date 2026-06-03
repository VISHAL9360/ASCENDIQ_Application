import { useState, useEffect } from 'react';
import api from '../services/api';
import {
    LayoutDashboard,
    Briefcase,
    Users,
    CheckCircle,
    Clock,
    TrendingUp,
    Loader2,
    Calendar,
    ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const RecruiterDashboard = () => {
    const [stats, setStats] = useState(null);
    const [drives, setDrives] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: drivesData } = await api.get('/drives');
                setDrives(drivesData.slice(0, 5));
                setStats({
                    activeDrives: drivesData.length,
                    totalApplicants: 156,
                    shortlisted: 42,
                    scheduledInterviews: 8
                });
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <Loader2 className="animate-spin" color="var(--color-accent)" size={32} />
        </div>
    );

    const statCards = [
        { label: 'Active Drives', value: stats.activeDrives, icon: Briefcase, color: 'var(--color-accent)' },
        { label: 'Total Applicants', value: stats.totalApplicants, icon: Users, color: 'var(--color-info)' },
        { label: 'Shortlisted', value: stats.shortlisted, icon: CheckCircle, color: 'var(--color-success)' },
        { label: 'Interviews', value: stats.scheduledInterviews, icon: Clock, color: 'var(--color-warning)' },
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            <header>
                <h1 style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'var(--font-title)', letterSpacing: '-0.03em', marginBottom: '8px' }}>
                    Recruitment Hub
                </h1>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem' }}>Manage your hiring pipeline and placement drives.</p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
                {statCards.map((card, idx) => (
                    <motion.div 
                        key={idx} 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="glass-card" 
                        style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}
                    >
                        <div style={{ 
                            width: '40px', 
                            height: '40px', 
                            borderRadius: '8px', 
                            backgroundColor: 'var(--color-bg-secondary)', 
                            color: card.color,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <card.icon size={20} />
                        </div>
                        <div>
                            <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: '4px' }}>{card.label}</p>
                            <p style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-primary)' }}>{card.value}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px' }}>
                <div style={{ flex: '2', minWidth: '0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, fontFamily: 'var(--font-title)' }}>Active Drive Pipeline</h2>
                        <Link to="/recruiter/drives" style={{ color: 'var(--color-accent)', fontWeight: 600, textDecoration: 'none', fontSize: '0.9rem' }}>Manage all drives</Link>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {drives.map((drive) => (
                            <div key={drive.id} className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                    <div style={{ width: '40px', height: '40px', backgroundColor: 'var(--color-bg-secondary)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: 'var(--color-primary)' }}>
                                        {drive.jobRole?.[0] || 'D'}
                                    </div>
                                    <div>
                                        <h4 style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--color-primary)' }}>{drive.jobRole || drive.title}</h4>
                                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <Calendar size={14} /> {drive.driveDate ? new Date(drive.driveDate).toLocaleDateString() : 'Date TBD'}
                                        </p>
                                    </div>
                                </div>
                                <Link to={`/recruiter/pipeline/${drive.id}`} className="btn-premium-outline" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
                                    Manage Pipeline
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>

                <div style={{ flex: '1', minWidth: '0' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 700, fontFamily: 'var(--font-title)', marginBottom: '24px' }}>Hiring Analytics</h2>
                    <div className="glass-card" style={{ padding: '32px', backgroundColor: 'var(--color-accent)', color: 'white' }}>
                        <TrendingUp size={32} style={{ marginBottom: '20px', opacity: 0.8 }} />
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '12px' }}>Applicant Growth</h3>
                        <p style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.6, marginBottom: '24px' }}>
                            Your job postings are getting 24% more views this week compared to last month. Optimize your job descriptions to further increase conversions.
                        </p>
                        <button className="btn-premium" style={{ backgroundColor: 'white', color: 'var(--color-accent)', width: '100%', justifyContent: 'center' }}>
                            View Reports
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecruiterDashboard;
