import { useState, useEffect } from 'react';
import api from '../services/api';
import {
    Users,
    Building2,
    CheckCircle,
    Clock,
    Loader2,
    Filter,
    Search,
    Download,
    TrendingUp,
    ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: statsData } = await api.get('/dashboard/stats');
                setStats(statsData);
                const { data: companyData } = await api.get('/companies');
                setCompanies(companyData.slice(0, 5));
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleVerifyCompany = async (id) => {
        try {
            await api.put(`/companies/verify/${id}`);
            setCompanies(companies.map(c => c.id === id ? { ...c, isVerified: true } : c));
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <Loader2 className="animate-spin" color="var(--color-accent)" size={32} />
        </div>
    );

    const summaryCards = [
        { label: 'Total Students', value: stats?.students || 0, icon: Users, color: 'var(--color-accent)' },
        { label: 'Partner Companies', value: stats?.companies || 0, icon: Building2, color: 'var(--color-info)' },
        { label: 'Placement Drives', value: stats?.drives || 0, icon: Clock, color: 'var(--color-warning)' },
        { label: 'Placed Count', value: '482', icon: CheckCircle, color: 'var(--color-success)' },
    ];

    const chartData = [
        { name: 'Jan', placements: 40 },
        { name: 'Feb', placements: 60 },
        { name: 'Mar', placements: 85 },
        { name: 'Apr', placements: 120 },
        { name: 'May', placements: 150 },
        { name: 'Jun', placements: 210 },
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'var(--font-title)', letterSpacing: '-0.03em', marginBottom: '8px' }}>
                        System Overview
                    </h1>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem' }}>Centralized monitoring of the placement ecosystem</p>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <button className="btn-premium-outline">
                        <Download size={18} /> Export Data
                    </button>
                    <button className="btn-premium">
                        <Filter size={18} /> Analytics
                    </button>
                </div>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
                {summaryCards.map((card, idx) => (
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
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 700, fontFamily: 'var(--font-title)', marginBottom: '24px' }}>Placement Trends</h2>
                    <div className="glass-card" style={{ padding: '24px', height: '320px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="colorPlacements" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="var(--color-accent)" stopOpacity={0.1}/>
                                        <stop offset="95%" stopColor="var(--color-accent)" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="name" stroke="var(--color-text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: 'white', border: '1px solid var(--color-border)', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                                />
                                <Area type="monotone" dataKey="placements" stroke="var(--color-accent)" fillOpacity={1} fill="url(#colorPlacements)" strokeWidth={2} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    <div style={{ marginTop: '40px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, fontFamily: 'var(--font-title)' }}>Recent Partners</h2>
                            <button className="btn-premium-outline" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>View Directory</button>
                        </div>
                        <div className="glass-card" style={{ overflow: 'hidden' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                <thead style={{ backgroundColor: 'var(--color-bg-secondary)', borderBottom: '1px solid var(--color-border)' }}>
                                    <tr>
                                        <th style={{ padding: '16px 24px', fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Company</th>
                                        <th style={{ padding: '16px 24px', fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Industry</th>
                                        <th style={{ padding: '16px 24px', fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Status</th>
                                        <th style={{ padding: '16px 24px', fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {companies.map((company) => (
                                        <tr key={company.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                                            <td style={{ padding: '16px 24px' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                    <div style={{ width: '32px', height: '32px', backgroundColor: 'var(--color-bg-secondary)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: 'var(--color-primary)', fontSize: '0.8rem' }}>
                                                        {company.name?.[0] || 'C'}
                                                    </div>
                                                    <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{company.name}</span>
                                                </div>
                                            </td>
                                            <td style={{ padding: '16px 24px', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>{company.industry || 'Technology'}</td>
                                            <td style={{ padding: '16px 24px' }}>
                                                {company.isVerified ? (
                                                    <span className="badge badge-success">Verified</span>
                                                ) : (
                                                    <span className="badge badge-warning">Pending</span>
                                                )}
                                            </td>
                                            <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                                                {!company.isVerified ? (
                                                    <button onClick={() => handleVerifyCompany(company.id)} className="btn-premium-outline" style={{ padding: '6px 12px', fontSize: '0.75rem' }}>Approve</button>
                                                ) : (
                                                    <ChevronRight size={16} color="var(--color-text-muted)" />
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div style={{ flex: '1', minWidth: '0' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 700, fontFamily: 'var(--font-title)', marginBottom: '24px' }}>System Health</h2>
                    <div className="glass-card" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 600 }}>
                                <span>ERP Sync</span>
                                <span style={{ color: 'var(--color-success)' }}>Active</span>
                            </div>
                            <div style={{ height: '6px', backgroundColor: 'var(--color-bg-secondary)', borderRadius: '3px', overflow: 'hidden' }}>
                                <div style={{ height: '100%', backgroundColor: 'var(--color-success)', width: '94%' }}></div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 600 }}>
                                <span>API Latency</span>
                                <span style={{ color: 'var(--color-accent)' }}>120ms</span>
                            </div>
                            <div style={{ height: '6px', backgroundColor: 'var(--color-bg-secondary)', borderRadius: '3px', overflow: 'hidden' }}>
                                <div style={{ height: '100%', backgroundColor: 'var(--color-accent)', width: '78%' }}></div>
                            </div>
                        </div>
                        <button className="btn-premium" style={{ marginTop: '8px', justifyContent: 'center' }}>
                            <Search size={18} /> Performance Audit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
