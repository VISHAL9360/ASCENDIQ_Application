import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { 
    Calendar, 
    Clock, 
    Video, 
    MapPin, 
    CheckCircle2, 
    AlertCircle, 
    ExternalLink,
    Search,
    Filter,
    ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';

const MyInterviews = () => {
    const { user } = useAuth();
    const [interviews, setInterviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // all, upcoming, completed

    useEffect(() => {
        fetchInterviews();
    }, [user]);

    const fetchInterviews = async () => {
        try {
            const { data } = await api.get(`/student/interviews/me?studentId=${user.id}`);
            setInterviews(data);
        } catch (error) {
            console.error('Error fetching interviews:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredInterviews = interviews.filter(item => {
        if (filter === 'all') return true;
        if (filter === 'upcoming') return item.status === 'Scheduled' || item.status === 'Rescheduled';
        if (filter === 'completed') return item.status === 'Completed';
        return true;
    });

    const getStatusColor = (status) => {
        switch (status) {
            case 'Scheduled': return 'badge-info';
            case 'Completed': return 'badge-success';
            case 'Cancelled': return 'badge-danger';
            case 'Rescheduled': return 'badge-warning';
            default: return '';
        }
    };

    return (
        <div style={{ spaceY: '32px' }}>
            <div style={{ marginBottom: '32px' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--color-primary)', fontFamily: 'var(--font-title)', letterSpacing: '-0.02em' }}>
                    My <span style={{ color: 'var(--color-accent)' }}>Interviews</span>
                </h1>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem' }}>Manage your scheduled interview rounds and assessments.</p>
            </div>

            {/* Filters */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '32px' }}>
                {['all', 'upcoming', 'completed'].map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        style={{
                            padding: '8px 16px',
                            borderRadius: '20px',
                            border: '1px solid var(--color-border)',
                            backgroundColor: filter === f ? 'var(--color-primary)' : 'white',
                            color: filter === f ? 'white' : 'var(--color-text-muted)',
                            fontWeight: 600,
                            fontSize: '0.9rem',
                            cursor: 'pointer',
                            transition: 'var(--transition)',
                            textTransform: 'capitalize'
                        }}
                    >
                        {f}
                    </button>
                ))}
            </div>

            {loading ? (
                <div style={{ padding: '60px', textAlign: 'center', color: 'var(--color-text-muted)' }}>Loading your interview schedule...</div>
            ) : filteredInterviews.length === 0 ? (
                <div className="glass-card" style={{ padding: '80px 40px', textAlign: 'center' }}>
                    <div style={{ width: '64px', height: '64px', backgroundColor: 'var(--color-bg-secondary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                        <Calendar size={32} style={{ color: 'var(--color-text-muted)' }} />
                    </div>
                    <h3 style={{ fontWeight: 700, fontSize: '1.2rem', marginBottom: '8px' }}>No interviews found</h3>
                    <p style={{ color: 'var(--color-text-muted)', maxWidth: '400px', margin: '0 auto' }}>You don't have any interviews {filter === 'all' ? 'scheduled' : filter} at the moment.</p>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {filteredInterviews.map((interview, index) => (
                        <motion.div
                            key={interview.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="glass-card"
                            style={{ padding: '24px', display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: '32px', alignItems: 'center' }}
                        >
                            <div style={{ 
                                width: '60px', height: '60px', backgroundColor: 'var(--color-primary-soft)', 
                                borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' 
                            }}>
                                <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--color-primary)', textTransform: 'uppercase' }}>
                                    {new Date(interview.interviewTime).toLocaleString('default', { month: 'short' })}
                                </span>
                                <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                                    {new Date(interview.interviewTime).getDate()}
                                </span>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <h3 style={{ fontWeight: 700, fontSize: '1.1rem' }}>{interview.interviewType} Interview</h3>
                                    <span className={`badge ${getStatusColor(interview.status)}`}>{interview.status}</span>
                                </div>
                                <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                                        <Clock size={16} /> {new Date(interview.interviewTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                                        {interview.location.startsWith('http') ? <Video size={16} /> : <MapPin size={16} />}
                                        {interview.location.startsWith('http') ? 'Online Meeting' : interview.location}
                                    </div>
                                </div>
                                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                                    <strong>Company:</strong> {interview.application.jobPosting.company.name}
                                </p>
                            </div>

                            <div style={{ display: 'flex', gap: '12px' }}>
                                {interview.location.startsWith('http') && (
                                    <a 
                                        href={interview.location} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="btn-premium"
                                        style={{ padding: '10px 20px', fontSize: '0.85rem' }}
                                    >
                                        Join Meeting <ExternalLink size={14} />
                                    </a>
                                )}
                                <button className="btn-premium-outline" style={{ padding: '10px 20px', fontSize: '0.85rem' }}>
                                    View Details
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            <div style={{ marginTop: '48px', padding: '32px', backgroundColor: 'var(--color-bg-secondary)', borderRadius: 'var(--border-radius-lg)', display: 'flex', alignItems: 'center', gap: '24px' }}>
                <div style={{ width: '48px', height: '48px', backgroundColor: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <AlertCircle size={24} style={{ color: 'var(--color-accent)' }} />
                </div>
                <div>
                    <h4 style={{ fontWeight: 700, marginBottom: '4px' }}>Interview Guidelines</h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                        Ensure you have a stable internet connection for online interviews. Join the meeting at least 5 minutes before the scheduled time. 
                        Keep your resume and necessary documents ready.
                    </p>
                </div>
                <ChevronRight style={{ marginLeft: 'auto', color: 'var(--color-text-muted)' }} />
            </div>
        </div>
    );
};

export default MyInterviews;
