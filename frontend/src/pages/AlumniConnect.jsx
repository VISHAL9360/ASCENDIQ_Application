import React, { useState, useEffect } from 'react';
import { Users, Search, MapPin, Building, Linkedin, Loader2, GraduationCap } from 'lucide-react';
import api from '../services/api';

const COLORS = ['#3b82f6','#a855f7','#22c55e','#f59e0b','#ef4444','#06b6d4'];

const AlumniConnect = () => {
    const [alumni, setAlumni] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        api.get('/features/alumni').then(({ data }) => setAlumni(data)).catch(console.error).finally(() => setLoading(false));
    }, []);

    const filtered = alumni.filter(a =>
        (a.name || '').toLowerCase().includes(search.toLowerCase()) ||
        (a.company || '').toLowerCase().includes(search.toLowerCase()) ||
        (a.role || '').toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div style={{ padding: '24px' }}>
            <div style={{ marginBottom: '28px' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '8px' }}>Alumni Connect</h1>
                <p style={{ color: 'var(--color-text-muted)' }}>Connect with alumni from your college now working at top companies. Get mentorship, referrals, and guidance.</p>
            </div>

            <div style={{ position: 'relative', marginBottom: '32px', maxWidth: '480px' }}>
                <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search by name, company, or role..."
                    style={{ width: '100%', padding: '12px 16px 12px 46px', borderRadius: '30px', border: '1px solid var(--color-border)', background: 'var(--color-bg-secondary)', color: 'var(--color-text)', fontSize: '1rem', boxSizing: 'border-box' }}
                />
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '60px', color: 'var(--color-text-muted)' }}>
                    <Loader2 size={32} className="animate-spin" style={{ margin: '0 auto 16px' }} />
                    <p>Loading alumni network...</p>
                </div>
            ) : filtered.length === 0 ? (
                <div className="glass-card" style={{ padding: '60px', textAlign: 'center' }}>
                    <Users size={48} style={{ color: 'var(--color-text-muted)', margin: '0 auto 16px' }} />
                    <h3 style={{ fontWeight: 700, marginBottom: '8px' }}>No Alumni Found</h3>
                    <p style={{ color: 'var(--color-text-muted)' }}>Try a different search term.</p>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                    {filtered.map((person, idx) => {
                        const color = COLORS[idx % COLORS.length];
                        const initials = (person.name || 'A').split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
                        return (
                            <div key={person.id} className="glass-card" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'center' }}>
                                <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: `${color}20`, border: `3px solid ${color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', fontSize: '1.4rem', fontWeight: 900, color }}>
                                    {initials}
                                </div>
                                <div>
                                    <h3 style={{ fontWeight: 800, fontSize: '1.1rem', marginBottom: '4px' }}>{person.name}</h3>
                                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                                        <Building size={14} /> {person.role} at {person.company}
                                    </p>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
                                    {person.batch && <span style={{ display: 'flex', gap: '4px', alignItems: 'center' }}><GraduationCap size={14} /> Batch {person.batch}</span>}
                                    {person.location && <span style={{ display: 'flex', gap: '4px', alignItems: 'center' }}><MapPin size={14} /> {person.location}</span>}
                                </div>
                                <a 
                                    href={person.linkedinUrl || '#'} 
                                    target={person.linkedinUrl ? "_blank" : "_self"} 
                                    rel="noopener noreferrer"
                                    className="btn-primary" 
                                    style={{ padding: '10px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '0.9rem', textDecoration: 'none' }}>
                                    <Linkedin size={16} /> Connect
                                </a>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default AlumniConnect;
