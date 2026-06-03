import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Users, Video, Loader2 } from 'lucide-react';
import api from '../services/api';

const TYPE_COLORS = {
    'Placement Drive': { bg: 'rgba(59,130,246,0.12)', color: '#3b82f6' },
    'Workshop': { bg: 'rgba(168,85,247,0.12)', color: '#a855f7' },
    'default': { bg: 'rgba(34,197,94,0.12)', color: '#22c55e' },
};

const EventCalendar = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        api.get('/features/events').then(({ data }) => setEvents(data)).catch(console.error).finally(() => setLoading(false));
    }, []);

    const types = ['All', ...new Set(events.map(e => e.type).filter(Boolean))];
    const filtered = filter === 'All' ? events : events.filter(e => e.type === filter);

    const handleRegister = (eventId) => {
        setEvents(prev => prev.map(e => {
            if (e.id === eventId) {
                return { ...e, isRegistered: true, attendees: (e.attendees || 0) + 1 };
            }
            return e;
        }));
        alert("You have successfully registered for this event! You will receive an email confirmation shortly.");
    };

    return (
        <div style={{ padding: '24px' }}>
            <div style={{ marginBottom: '28px' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '8px' }}>Event Calendar</h1>
                <p style={{ color: 'var(--color-text-muted)' }}>All upcoming placement drives, workshops, and seminars on campus.</p>
            </div>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '28px' }}>
                {types.map(type => (
                    <button key={type} onClick={() => setFilter(type)}
                        style={{ padding: '8px 20px', borderRadius: '30px', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', transition: 'all 0.2s',
                            border: `2px solid ${filter === type ? 'var(--color-accent)' : 'var(--color-border)'}`,
                            background: filter === type ? 'var(--color-accent)' : 'transparent',
                            color: filter === type ? 'white' : 'var(--color-text-muted)' }}>
                        {type}
                    </button>
                ))}
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '60px', color: 'var(--color-text-muted)' }}>
                    <Loader2 size={32} className="animate-spin" style={{ margin: '0 auto 16px' }} />
                    <p>Loading events...</p>
                </div>
            ) : filtered.length === 0 ? (
                <div className="glass-card" style={{ padding: '60px', textAlign: 'center' }}>
                    <Calendar size={48} style={{ color: 'var(--color-text-muted)', margin: '0 auto 16px' }} />
                    <h3 style={{ fontWeight: 700 }}>No Events Found</h3>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {filtered.map(event => {
                        const style = TYPE_COLORS[event.type] || TYPE_COLORS['default'];
                        const isOnline = (event.location || '').toLowerCase().includes('online');
                        return (
                            <div key={event.id} className="glass-card" style={{ padding: '24px', display: 'flex', gap: '24px', alignItems: 'center' }}>
                                <div style={{ minWidth: '76px', height: '76px', background: 'var(--color-bg-secondary)', borderRadius: '14px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                    <span style={{ color: 'var(--color-accent)', fontWeight: 800, fontSize: '0.75rem', textTransform: 'uppercase' }}>{(event.date || '').split(' ')[0]}</span>
                                    <span style={{ fontSize: '1.7rem', fontWeight: 900, lineHeight: 1 }}>{(event.date || '').split(' ')[1] || '—'}</span>
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px', flexWrap: 'wrap' }}>
                                        <h3 style={{ fontWeight: 800 }}>{event.title}</h3>
                                        <span style={{ padding: '3px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700, background: style.bg, color: style.color }}>{event.type}</span>
                                    </div>
                                    <div style={{ display: 'flex', gap: '20px', color: 'var(--color-text-muted)', fontSize: '0.9rem', flexWrap: 'wrap' }}>
                                        <span style={{ display: 'flex', gap: '6px', alignItems: 'center' }}><Clock size={14} /> {event.time || 'TBA'}</span>
                                        <span style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>{isOnline ? <Video size={14} /> : <MapPin size={14} />} {event.location || 'TBA'}</span>
                                        {event.attendees && <span style={{ display: 'flex', gap: '6px', alignItems: 'center' }}><Users size={14} /> {event.attendees} Registered</span>}
                                    </div>
                                </div>
                                <button 
                                    onClick={() => !event.isRegistered && handleRegister(event.id)}
                                    className={event.isRegistered ? "btn-secondary" : "btn-primary"} 
                                    style={{ padding: '12px 24px', borderRadius: '30px', flexShrink: 0, opacity: event.isRegistered ? 0.7 : 1 }}
                                >
                                    {event.isRegistered ? 'Registered ✓' : 'Register'}
                                </button>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default EventCalendar;
