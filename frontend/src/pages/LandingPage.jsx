import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    CheckCircle,
    Users,
    Building2,
    ArrowRight,
    TrendingUp,
    Briefcase,
    Zap,
    ShieldCheck,
    Globe,
    BarChart3,
    Sparkles,
    Calendar,
    MessageSquare,
    Award,
    Cpu,
    PieChart,
    Lock
} from 'lucide-react';

const LandingPage = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg-primary)', color: 'var(--color-text-main)', fontFamily: 'var(--font-main)' }}>
            
            {/* Navigation */}
            <nav style={{ 
                height: 'var(--header-height)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between', 
                padding: '0 40px',
                borderBottom: '1px solid var(--color-border)',
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                zIndex: 100
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div className="logo-icon" style={{ width: '32px', height: '32px', fontSize: '0.8rem', borderRadius: '8px' }}>NH</div>
                    <span style={{ fontWeight: 700, fontSize: '1.1rem', letterSpacing: '-0.02em' }}>Next Hire</span>
                </div>
                <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
                    <a href="#features" style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--color-text-muted)', textDecoration: 'none' }}>Solutions</a>
                    <a href="#how-it-works" style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--color-text-muted)', textDecoration: 'none' }}>Methodology</a>
                    <a href="#security" style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--color-text-muted)', textDecoration: 'none' }}>Security</a>
                    <Link to="/login" style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-primary)', textDecoration: 'none' }}>Sign In</Link>
                    <Link to="/register" className="btn-premium" style={{ padding: '8px 16px', borderRadius: '8px' }}>
                        Join Now
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <header style={{ 
                padding: '180px 20px 120px',
                textAlign: 'center',
                maxWidth: '1200px',
                margin: '0 auto'
            }}>
                <motion.div variants={containerVariants} initial="hidden" animate="visible">
                    <motion.div variants={itemVariants} style={{ 
                        display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'var(--color-bg-secondary)', 
                        padding: '6px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-accent)', 
                        marginBottom: '32px', border: '1px solid var(--color-border)'
                    }}>
                        <Sparkles size={14} />
                        New: AI Mock Interviews now live
                    </motion.div>
                    
                    <motion.h1 variants={itemVariants} style={{ 
                        fontSize: 'clamp(3.5rem, 8vw, 6rem)', marginBottom: '24px', color: 'var(--color-primary)', 
                        lineHeight: 1, fontWeight: 800, fontFamily: 'var(--font-title)', letterSpacing: '-0.04em'
                    }}>
                        The operating system for <br /> 
                        <span style={{ color: 'var(--color-accent)' }}>university placements.</span>
                    </motion.h1>

                    <motion.p variants={itemVariants} style={{ 
                        fontSize: '1.25rem', color: 'var(--color-text-muted)', maxWidth: '650px', 
                        margin: '0 auto 48px', lineHeight: 1.6, fontWeight: 400
                    }}>
                        A unified platform that automates the entire placement lifecycle—from AI resume parsing to final offer management.
                    </motion.p>

                    <motion.div variants={itemVariants} style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                        <Link to="/register" className="btn-premium" style={{ padding: '14px 28px', fontSize: '1rem' }}>
                            Start Your Journey <ArrowRight size={18} />
                        </Link>
                        <Link to="/login" className="btn-premium-outline" style={{ padding: '14px 28px', fontSize: '1rem' }}>
                            Schedule Demo
                        </Link>
                    </motion.div>
                </motion.div>
            </header>

            {/* Core Solutions Grid */}
            <section id="features" style={{ padding: '100px 40px', backgroundColor: 'var(--color-bg-secondary)' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: 'var(--font-title)', letterSpacing: '-0.02em' }}>Enterprise-Grade Solutions</h2>
                        <p style={{ color: 'var(--color-text-muted)', marginTop: '12px' }}>Modular features designed for the complexities of modern campus recruitment.</p>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
                        {[
                            { title: 'AI Resume Engine', icon: Cpu, desc: 'Advanced parsing and ATS-matching for instant candidate ranking.' },
                            { title: 'Interactive Interviews', icon: MessageSquare, desc: 'AI-driven mock simulations with behavioral and technical feedback.' },
                            { title: 'Smart Pipelines', icon: TrendingUp, desc: 'End-to-end drive management with real-time status tracking.' },
                            { title: 'Alumni Bridge', icon: Users, desc: 'Connect students with placed seniors for mentorship and referrals.' },
                            { title: 'Certificate Vault', icon: Award, desc: 'Secure, verified storage for student achievements and skills.' },
                            { title: 'Event Hub', icon: Calendar, desc: 'Centralized schedule for drive dates, tests, and webinars.' },
                            { title: 'Offer Insights', icon: PieChart, desc: 'Comprehensive analytics on package distributions and hiring trends.' },
                            { title: 'Verified Profiles', icon: ShieldCheck, desc: 'Authenticated student data for 100% recruiter confidence.' },
                        ].map((feature, i) => (
                            <motion.div key={i} whileHover={{ y: -5 }} className="glass-card" style={{ padding: '32px', backgroundColor: 'white', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <div style={{ color: 'var(--color-accent)' }}><feature.icon size={24} /></div>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, fontFamily: 'var(--font-title)' }}>{feature.title}</h3>
                                <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.6, fontSize: '0.9rem' }}>{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section id="how-it-works" style={{ padding: '120px 40px' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '80px', alignItems: 'center' }}>
                        <div>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: 'var(--font-title)', letterSpacing: '-0.03em', marginBottom: '32px' }}>
                                From Campus to <br /> Career, <span style={{ color: 'var(--color-accent)' }}>Automated.</span>
                            </h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                                {[
                                    { step: '01', title: 'Profile Enrichment', desc: 'Students build AI-enhanced profiles that automatically highlight their strengths.' },
                                    { step: '02', title: 'Smart Matching', desc: 'Our engine matches candidates to roles based on skill overlap and company history.' },
                                    { step: '03', title: 'Seamless Hiring', desc: 'Recruiters manage the entire interview lifecycle within a single, clean interface.' }
                                ].map((step, i) => (
                                    <div key={i} style={{ display: 'flex', gap: '24px' }}>
                                        <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-accent-soft)', fontFamily: 'var(--font-title)' }}>{step.step}</span>
                                        <div>
                                            <h4 style={{ fontWeight: 700, marginBottom: '8px', fontSize: '1.1rem' }}>{step.title}</h4>
                                            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>{step.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="glass-card" style={{ padding: '40px', backgroundColor: 'var(--color-bg-secondary)', border: 'none', position: 'relative', overflow: 'hidden' }}>
                            <motion.div 
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
                            >
                                <div className="glass" style={{ padding: '20px', borderRadius: '12px', display: 'flex', gap: '16px', alignItems: 'center' }}>
                                    <div style={{ width: '40px', height: '40px', backgroundColor: 'var(--color-accent-soft)', borderRadius: '8px' }}></div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ height: '10px', backgroundColor: 'var(--color-border)', width: '40%', marginBottom: '8px', borderRadius: '4px' }}></div>
                                        <div style={{ height: '10px', backgroundColor: 'var(--color-border)', width: '80%', borderRadius: '4px' }}></div>
                                    </div>
                                </div>
                                <div className="glass" style={{ padding: '24px', borderRadius: '16px', backgroundColor: 'var(--color-primary)', color: 'white', boxShadow: '0 20px 40px rgba(79, 70, 229, 0.3)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                                        <Sparkles size={24} />
                                        <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>AI ANALYSIS ACTIVE</span>
                                    </div>
                                    <div style={{ height: '12px', backgroundColor: 'rgba(255,255,255,0.2)', width: '100%', marginBottom: '12px', borderRadius: '6px' }}>
                                        <motion.div 
                                            initial={{ width: 0 }}
                                            animate={{ width: '85%' }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                            style={{ height: '100%', backgroundColor: 'white', borderRadius: '6px' }}
                                        ></motion.div>
                                    </div>
                                    <p style={{ fontSize: '0.9rem', fontWeight: 600 }}>ATS Compatibility: 85%</p>
                                </div>
                                <div className="glass" style={{ padding: '20px', borderRadius: '12px', display: 'flex', gap: '16px', alignItems: 'center', opacity: 0.6 }}>
                                    <div style={{ width: '40px', height: '40px', backgroundColor: 'var(--color-border)', borderRadius: '8px' }}></div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ height: '10px', backgroundColor: 'var(--color-border)', width: '60%', marginBottom: '8px', borderRadius: '4px' }}></div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Security Section */}
            <section id="security" style={{ padding: '100px 40px', backgroundColor: 'var(--color-primary)', color: 'white' }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
                    <div style={{ display: 'inline-flex', padding: '12px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', marginBottom: '24px' }}>
                        <Lock size={32} />
                    </div>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: 'var(--font-title)', marginBottom: '24px' }}>Bank-Grade Security</h2>
                    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 48px' }}>
                        We prioritize data privacy with end-to-end encryption, GDPR compliance, and multi-tenant isolation.
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px' }}>
                        {['AES-256 Encryption', 'ISO 27001 Certified', 'SSO Integration', '24/7 Monitoring'].map((item, i) => (
                            <div key={i} style={{ padding: '24px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', fontSize: '0.9rem', fontWeight: 600 }}>
                                {item}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Bar */}
            <section style={{ padding: '100px 40px' }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px' }}>
                    {[
                        { label: 'Placements Delivered', value: '12,400+' },
                        { label: 'Active Companies', value: '850+' },
                        { label: 'Average Package', value: '₹14.2 LPA' },
                        { label: 'Success Rate', value: '98.4%' }
                    ].map((stat, i) => (
                        <div key={i} style={{ textAlign: 'center' }}>
                            <p style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--color-primary)', letterSpacing: '-0.03em', marginBottom: '8px', fontFamily: 'var(--font-title)' }}>{stat.value}</p>
                            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{stat.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer style={{ padding: '80px 40px', borderTop: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-primary)' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '40px' }}>
                    <div style={{ maxWidth: '300px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                            <div className="logo-icon" style={{ width: '28px', height: '28px', fontSize: '0.7rem' }}>NH</div>
                            <span style={{ fontWeight: 700, fontSize: '1rem' }}>Next Hire</span>
                        </div>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                            Transforming university placements through clean design and intelligent automation.
                        </p>
                    </div>
                    <div style={{ display: 'flex', gap: '80px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <span style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '8px' }}>Product</span>
                            <a href="#" style={{ color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>Features</a>
                            <a href="#" style={{ color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>Security</a>
                            <a href="#" style={{ color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>Enterprise</a>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <span style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '8px' }}>Company</span>
                            <a href="#" style={{ color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>About</a>
                            <a href="#" style={{ color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>Careers</a>
                            <a href="#" style={{ color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>Contact</a>
                        </div>
                    </div>
                </div>
                <div style={{ maxWidth: '1200px', margin: '40px auto 0', paddingTop: '40px', borderTop: '1px solid var(--color-border)', textAlign: 'center' }}>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>© 2026 Next Hire. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
