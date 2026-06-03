import { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import {
    Briefcase,
    Calendar,
    Users,
    TrendingUp,
    Loader2,
    CheckCircle2,
    ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const StudentDashboard = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState(null);
    const [jobs, setJobs] = useState([]);
    const [aiInsights, setAiInsights] = useState(null);
    const [loadingInsights, setLoadingInsights] = useState(true);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: statsData } = await api.get('/dashboard/stats');
                setStats(statsData);
                const { data: jobsData } = await api.get('/drives');
                setJobs(jobsData.slice(0, 5));

                // Fetch real AI insights!
                const { data: insightsData } = await api.get('/ai/career-insights');
                const parsed = typeof insightsData === 'string' ? JSON.parse(insightsData) : insightsData;
                setAiInsights(parsed);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
                setLoadingInsights(false);
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
        { label: 'Total Applications', value: stats?.applied || 0, icon: Briefcase, color: 'var(--color-accent)' },
        { label: 'Upcoming Drives', value: stats?.drives || 0, icon: Calendar, color: 'var(--color-info)' },
        { label: 'Interview Invites', value: stats?.shortlisted || 0, icon: Users, color: 'var(--color-success)' },
        { label: 'Profile Strength', value: '85%', icon: TrendingUp, color: 'var(--color-primary)' },
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            <header>
                <h1 style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'var(--font-title)', letterSpacing: '-0.03em', marginBottom: '8px' }}>
                    Welcome back, {user?.name || 'Student'}
                </h1>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem' }}>Here's what's happening with your placement progress.</p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
                {statCards.map((card, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="glass-card"
                        style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '20px' }}
                    >
                        <div style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '10px',
                            backgroundColor: card.color === 'var(--color-accent)' ? 'var(--color-accent-soft)' : 'var(--color-bg-secondary)',
                            color: card.color,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <card.icon size={24} />
                        </div>
                        <div>
                            <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: '4px' }}>{card.label}</p>
                            <p style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-primary)' }}>{card.value}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px' }}>
                <div style={{ flex: '2', minWidth: '0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, fontFamily: 'var(--font-title)' }}>Recommended Drives</h2>
                        <Link to="/student/drives" style={{ color: 'var(--color-accent)', fontWeight: 600, textDecoration: 'none', fontSize: '0.9rem' }}>View all drives</Link>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {jobs.map((job) => (
                            <div key={job.id} className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                    <div style={{ width: '40px', height: '40px', backgroundColor: 'var(--color-bg-secondary)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: 'var(--color-primary)' }}>
                                        {job.jobRole?.[0] || 'D'}
                                    </div>
                                    <div>
                                        <h4 style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--color-primary)' }}>{job.jobRole || job.title}</h4>
                                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>{job.companyName || 'Corporate Partner'} • {job.location || 'Remote'}</p>
                                    </div>
                                </div>
                                <Link to={`/student/drives/${job.id}`} className="btn-premium-outline" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
                                    Apply Now
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>

                <div style={{ flex: '1', minWidth: '0' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 700, fontFamily: 'var(--font-title)', marginBottom: '24px' }}>AI Career Insights</h2>
                    <div className="glass-card" style={{ padding: '32px', backgroundColor: 'var(--color-primary)', color: 'white' }}>
                        <TrendingUp size={32} style={{ marginBottom: '20px', opacity: 0.8 }} />
                        {loadingInsights ? (
                            <p className="animate-pulse">AI is calculating your stats...</p>
                        ) : (
                            <>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '12px' }}>
                                    Profile Score: {aiInsights?.profileScore || 50}
                                </h3>
                                <p style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.85)', lineHeight: 1.6, marginBottom: '20px' }}>
                                    {aiInsights?.analysis}
                                </p>
                                <div style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.95)', borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '12px' }}>
                                    <p style={{ fontWeight: 700, marginBottom: '6px' }}>⚡ AI Recommendations:</p>
                                    <ul style={{ paddingLeft: '16px', listStyleType: 'disc', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                        {aiInsights?.tips?.map((tip, index) => (
                                            <li key={index}>{tip}</li>
                                        ))}
                                    </ul>
                                </div>
                            </>
                        )}
                    </div>


                    <div className="glass-card" style={{ padding: '24px', marginTop: '24px' }}>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px' }}>Upcoming Deadlines</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                                <CheckCircle2 size={18} color="var(--color-success)" />
                                <div>
                                    <p style={{ fontSize: '0.9rem', fontWeight: 600 }}>TCS NQT Registration</p>
                                    <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Due in 2 days</p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                                <CheckCircle2 size={18} color="var(--color-text-muted)" />
                                <div>
                                    <p style={{ fontSize: '0.9rem', fontWeight: 600 }}>Mock Interview #3</p>
                                    <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Scheduled for Tomorrow</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;
