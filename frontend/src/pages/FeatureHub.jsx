import React from 'react';
import { motion } from 'framer-motion';
import { 
    Sparkles, 
    ArrowRight, 
    Clock, 
    ShieldCheck, 
    Zap,
    Users,
    MessageSquare,
    Calendar,
    Award,
    CreditCard,
    LineChart
} from 'lucide-react';

const FeatureHub = ({ title, description, icon: Icon, color = 'var(--color-accent)' }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            <header>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <div style={{ 
                        width: '40px', height: '40px', backgroundColor: 'var(--color-bg-secondary)', 
                        color: color, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' 
                    }}>
                        <Icon size={24} />
                    </div>
                    <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Free Module</span>
                </div>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: 'var(--font-title)', letterSpacing: '-0.03em', marginBottom: '12px' }}>
                    {title}
                </h1>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', maxWidth: '600px' }}>
                    {description}
                </p>
            </header>

            <div className="glass-card" style={{ padding: '60px', textAlign: 'center', borderStyle: 'dashed' }}>
                <div style={{ 
                    width: '80px', height: '80px', backgroundColor: 'var(--color-bg-secondary)', 
                    color: 'var(--color-accent)', borderRadius: '20px', display: 'flex', alignItems: 'center', 
                    justifyContent: 'center', margin: '0 auto 32px' 
                }}>
                    <Zap size={40} className="animate-pulse" />
                </div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '16px' }}>Module In Implementation</h2>
                <p style={{ color: 'var(--color-text-muted)', maxWidth: '450px', margin: '0 auto 32px', lineHeight: 1.6 }}>
                    This free feature is currently being synchronized with the Spring Boot backend. You will have full access once the integration is complete.
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
                    <button className="btn-primary">
                        <Sparkles size={18} /> Join Beta Access
                    </button>
                    <button className="btn-secondary">
                        Documentation <ArrowRight size={18} />
                    </button>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                {[
                    { title: 'Real-time Sync', icon: Clock, desc: 'Instant data synchronization across all devices.' },
                    { title: 'Enterprise Security', icon: ShieldCheck, desc: 'Bank-grade encryption for sensitive career data.' },
                    { title: 'AI Insights', icon: Sparkles, desc: 'Predictive analytics based on historical hiring trends.' }
                ].map((info, idx) => (
                    <div key={idx} className="glass-card" style={{ padding: '24px', display: 'flex', gap: '16px' }}>
                        <div style={{ color: 'var(--color-accent)' }}><info.icon size={20} /></div>
                        <div>
                            <h4 style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '4px' }}>{info.title}</h4>
                            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>{info.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeatureHub;
