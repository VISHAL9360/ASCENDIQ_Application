import React, { useState, useEffect } from 'react';
import { Award, CheckCircle, Clock, Plus, Loader2, X, ShieldCheck } from 'lucide-react';
import api from '../services/api';

const CertificateVault = () => {
    const [certs, setCerts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState({ name: '', issuer: '', date: '' });

    useEffect(() => {
        api.get('/features/certificates').then(({ data }) => setCerts(data)).catch(console.error).finally(() => setLoading(false));
    }, []);

    const handleAdd = async () => {
        if (!form.name || !form.issuer) return alert('Certificate name and issuer are required.');
        setSaving(true);
        try {
            const { data } = await api.post('/features/certificates', form);
            setCerts(prev => [...prev, data]);
            setShowModal(false);
            setForm({ name: '', issuer: '', date: '' });
        } catch (err) {
            console.error(err);
            alert('Failed to add certificate. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    const verified = certs.filter(c => c.status === 'Verified').length;

    return (
        <div style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '8px' }}>Certificate Vault</h1>
                    <p style={{ color: 'var(--color-text-muted)' }}>Securely store and verify your academic and professional certifications.</p>
                </div>
                <button onClick={() => setShowModal(true)} className="btn-primary" style={{ display: 'flex', gap: '8px', alignItems: 'center', padding: '12px 24px', borderRadius: '12px' }}>
                    <Plus size={18} /> Add Certificate
                </button>
            </div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '32px' }}>
                {[
                    { label: 'Total', value: certs.length, color: '#3b82f6' },
                    { label: 'Verified', value: verified, color: '#22c55e' },
                    { label: 'Pending', value: certs.length - verified, color: '#eab308' },
                ].map(s => (
                    <div key={s.label} className="glass-card" style={{ padding: '20px', textAlign: 'center' }}>
                        <p style={{ fontSize: '2rem', fontWeight: 900, color: s.color }}>{s.value}</p>
                        <p style={{ color: 'var(--color-text-muted)', fontWeight: 600, fontSize: '0.9rem' }}>{s.label}</p>
                    </div>
                ))}
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '60px', color: 'var(--color-text-muted)' }}>
                    <Loader2 size={32} className="animate-spin" style={{ margin: '0 auto 16px' }} />
                    <p>Loading your certificates...</p>
                </div>
            ) : certs.length === 0 ? (
                <div className="glass-card" style={{ padding: '60px', textAlign: 'center' }}>
                    <Award size={48} style={{ color: 'var(--color-text-muted)', margin: '0 auto 16px' }} />
                    <h3 style={{ fontWeight: 700, marginBottom: '8px' }}>No Certificates Yet</h3>
                    <p style={{ color: 'var(--color-text-muted)', marginBottom: '24px' }}>Add your first certificate to build your verified profile.</p>
                    <button onClick={() => setShowModal(true)} className="btn-primary" style={{ padding: '12px 28px', borderRadius: '12px' }}>Add Certificate</button>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
                    {certs.map(cert => {
                        const isVerified = cert.status === 'Verified';
                        return (
                            <div key={cert.id} className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', borderLeft: `4px solid ${isVerified ? '#22c55e' : '#eab308'}` }}>
                                <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                                    <div style={{ width: '48px', height: '48px', background: isVerified ? 'rgba(34,197,94,0.12)' : 'rgba(234,179,8,0.12)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        <Award size={24} color={isVerified ? '#22c55e' : '#eab308'} />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <h3 style={{ fontWeight: 800, fontSize: '1rem', marginBottom: '4px' }}>{cert.name}</h3>
                                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>{cert.issuer}</p>
                                    </div>
                                    <span style={{
                                        padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700, display: 'flex', gap: '4px', alignItems: 'center',
                                        background: isVerified ? 'rgba(34,197,94,0.12)' : 'rgba(234,179,8,0.12)',
                                        color: isVerified ? '#22c55e' : '#eab308'
                                    }}>
                                        {isVerified ? <CheckCircle size={12} /> : <Clock size={12} />} {cert.status}
                                    </span>
                                </div>
                                {cert.date && (
                                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>📅 Issued: {cert.date}</p>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Add Certificate Modal */}
            {showModal && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
                    <div className="glass-card" style={{ width: '100%', maxWidth: '460px', padding: '32px', borderRadius: '24px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                            <h2 style={{ fontWeight: 800, fontSize: '1.4rem' }}>Add Certificate</h2>
                            <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)' }}><X size={22} /></button>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {[
                                { label: 'Certificate Name *', key: 'name', placeholder: 'e.g. AWS Certified Solutions Architect' },
                                { label: 'Issuing Organization *', key: 'issuer', placeholder: 'e.g. Amazon Web Services' },
                                { label: 'Issue Date', key: 'date', placeholder: 'e.g. 2025-06-01' },
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
                            <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                                <button onClick={() => setShowModal(false)} className="btn-secondary" style={{ flex: 1, padding: '14px', borderRadius: '12px' }}>Cancel</button>
                                <button onClick={handleAdd} disabled={saving} className="btn-primary" style={{ flex: 1, padding: '14px', borderRadius: '12px', display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'center' }}>
                                    {saving ? <><Loader2 size={18} className="animate-spin" /> Saving...</> : <><ShieldCheck size={18} /> Add & Verify</>}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CertificateVault;
