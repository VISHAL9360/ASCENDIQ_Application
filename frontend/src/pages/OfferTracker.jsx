import React, { useState, useEffect } from 'react';
import { CreditCard, CheckCircle, XCircle, Clock, Building, Briefcase, MapPin, Plus, Loader2, X, IndianRupee } from 'lucide-react';
import api from '../services/api';

const STATUS_OPTIONS = ['Accepted', 'Pending', 'Declined'];

const OfferTracker = () => {
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState({ company: '', role: '', ctc: '', status: 'Pending', date: '', location: '' });

    useEffect(() => { fetchOffers(); }, []);

    const fetchOffers = async () => {
        setLoading(true);
        try {
            const { data } = await api.get('/features/offers');
            setOffers(data);
        } catch (err) {
            console.error('Failed to fetch offers:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleAddOffer = async () => {
        if (!form.company || !form.role || !form.ctc) return alert('Company, Role, and CTC are required.');
        setSaving(true);
        try {
            const { data } = await api.post('/features/offers', form);
            setOffers(prev => [...prev, data]);
            setShowModal(false);
            setForm({ company: '', role: '', ctc: '', status: 'Pending', date: '', location: '' });
        } catch (err) {
            console.error('Failed to add offer:', err);
            alert('Failed to add offer. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    const getStatusStyle = (status) => {
        if (status === 'Accepted') return { bg: 'rgba(34,197,94,0.12)', color: '#22c55e', Icon: CheckCircle };
        if (status === 'Declined') return { bg: 'rgba(239,68,68,0.12)', color: '#ef4444', Icon: XCircle };
        return { bg: 'rgba(234,179,8,0.12)', color: '#eab308', Icon: Clock };
    };

    const stats = {
        total: offers.length,
        accepted: offers.filter(o => o.status === 'Accepted').length,
        pending: offers.filter(o => o.status === 'Pending').length,
    };

    return (
        <div style={{ padding: '24px' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '8px' }}>Offer Tracker</h1>
                    <p style={{ color: 'var(--color-text-muted)' }}>Track your job offers, compare CTCs, and manage your placement journey.</p>
                </div>
                <button onClick={() => setShowModal(true)} className="btn-primary" style={{ display: 'flex', gap: '8px', alignItems: 'center', padding: '12px 24px', borderRadius: '12px' }}>
                    <Plus size={18} /> Add New Offer
                </button>
            </div>

            {/* Stats Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '32px' }}>
                {[
                    { label: 'Total Offers', value: stats.total, color: '#3b82f6' },
                    { label: 'Accepted', value: stats.accepted, color: '#22c55e' },
                    { label: 'Pending', value: stats.pending, color: '#eab308' },
                ].map(s => (
                    <div key={s.label} className="glass-card" style={{ padding: '24px', textAlign: 'center' }}>
                        <p style={{ fontSize: '2.5rem', fontWeight: 900, color: s.color, marginBottom: '4px' }}>{s.value}</p>
                        <p style={{ color: 'var(--color-text-muted)', fontWeight: 600 }}>{s.label}</p>
                    </div>
                ))}
            </div>

            {/* Offer Cards */}
            {loading ? (
                <div style={{ textAlign: 'center', padding: '60px', color: 'var(--color-text-muted)' }}>
                    <Loader2 size={32} className="animate-spin" style={{ margin: '0 auto 16px' }} />
                    <p>Loading your offers...</p>
                </div>
            ) : offers.length === 0 ? (
                <div className="glass-card" style={{ padding: '60px', textAlign: 'center' }}>
                    <CreditCard size={48} style={{ color: 'var(--color-text-muted)', margin: '0 auto 16px' }} />
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '8px' }}>No Offers Yet</h3>
                    <p style={{ color: 'var(--color-text-muted)', marginBottom: '24px' }}>Click "Add New Offer" to track your first placement offer.</p>
                    <button onClick={() => setShowModal(true)} className="btn-primary" style={{ padding: '12px 28px', borderRadius: '12px' }}>Add Your First Offer</button>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
                    {offers.map(offer => {
                        const { bg, color, Icon } = getStatusStyle(offer.status);
                        return (
                            <div key={offer.id} className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                                        <div style={{ width: '48px', height: '48px', background: 'var(--color-bg-secondary)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Building size={22} color="var(--color-accent)" />
                                        </div>
                                        <div>
                                            <h3 style={{ fontWeight: 800, fontSize: '1.1rem' }}>{offer.company}</h3>
                                            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', display: 'flex', gap: '4px', alignItems: 'center' }}>
                                                <Briefcase size={13} /> {offer.role}
                                            </p>
                                        </div>
                                    </div>
                                    <span style={{ padding: '5px 14px', borderRadius: '20px', background: bg, color, fontWeight: 700, fontSize: '0.8rem', display: 'flex', gap: '5px', alignItems: 'center' }}>
                                        <Icon size={13} /> {offer.status}
                                    </span>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', background: 'var(--color-bg-secondary)', borderRadius: '12px', padding: '16px' }}>
                                    <div>
                                        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600, marginBottom: '4px' }}>CTC PACKAGE</p>
                                        <p style={{ fontWeight: 800, fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '2px' }}>
                                            <IndianRupee size={15} /> {offer.ctc}
                                        </p>
                                    </div>
                                    <div>
                                        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600, marginBottom: '4px' }}>OFFER DATE</p>
                                        <p style={{ fontWeight: 700 }}>{offer.date || '—'}</p>
                                    </div>
                                    {offer.location && (
                                        <div style={{ gridColumn: '1/-1' }}>
                                            <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600, marginBottom: '4px' }}>LOCATION</p>
                                            <p style={{ fontWeight: 600, display: 'flex', gap: '4px', alignItems: 'center' }}>
                                                <MapPin size={13} /> {offer.location}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Add Offer Modal */}
            {showModal && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
                    <div className="glass-card" style={{ width: '100%', maxWidth: '500px', padding: '32px', borderRadius: '24px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                            <h2 style={{ fontWeight: 800, fontSize: '1.4rem' }}>Add New Offer</h2>
                            <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)' }}><X size={22} /></button>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {[
                                { label: 'Company Name *', key: 'company', placeholder: 'e.g. Google' },
                                { label: 'Role *', key: 'role', placeholder: 'e.g. Software Engineer' },
                                { label: 'CTC Package *', key: 'ctc', placeholder: 'e.g. 18 LPA' },
                                { label: 'Location', key: 'location', placeholder: 'e.g. Bangalore' },
                                { label: 'Offer Date', key: 'date', placeholder: 'e.g. 2025-12-01' },
                            ].map(f => (
                                <div key={f.key}>
                                    <label style={{ display: 'block', fontWeight: 700, fontSize: '0.85rem', marginBottom: '6px', color: 'var(--color-text-muted)' }}>{f.label}</label>
                                    <input
                                        value={form[f.key]}
                                        onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                                        placeholder={f.placeholder}
                                        style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid var(--color-border)', background: 'var(--color-bg)', color: 'var(--color-text)', fontSize: '1rem', boxSizing: 'border-box' }}
                                    />
                                </div>
                            ))}
                            <div>
                                <label style={{ display: 'block', fontWeight: 700, fontSize: '0.85rem', marginBottom: '6px', color: 'var(--color-text-muted)' }}>Status</label>
                                <select
                                    value={form.status}
                                    onChange={e => setForm(p => ({ ...p, status: e.target.value }))}
                                    style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid var(--color-border)', background: 'var(--color-bg)', color: 'var(--color-text)', fontSize: '1rem' }}
                                >
                                    {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>
                            <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                                <button onClick={() => setShowModal(false)} className="btn-secondary" style={{ flex: 1, padding: '14px', borderRadius: '12px' }}>Cancel</button>
                                <button onClick={handleAddOffer} disabled={saving} className="btn-primary" style={{ flex: 1, padding: '14px', borderRadius: '12px', display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'center' }}>
                                    {saving ? <><Loader2 size={18} className="animate-spin" /> Saving...</> : <><Plus size={18} /> Add Offer</>}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OfferTracker;
