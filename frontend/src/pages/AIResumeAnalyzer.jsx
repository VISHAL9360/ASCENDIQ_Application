import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, FileText, Send, CheckCircle2, AlertCircle, RefreshCcw, TrendingUp, ShieldCheck } from 'lucide-react';
import api from '../services/api';

const AIResumeAnalyzer = () => {
    const [resumeText, setResumeText] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const handleAnalyze = async () => {
        if (!resumeText.trim()) return;
        setLoading(true);
        try {
            // Simulated AI processing with actual backend call if implemented, 
            // otherwise use the mock logic in our service
            const { data } = await api.post('/student/analyze-resume', { resumeText });
            setResult(data);
        } catch (err) {
            console.error(err);
            // Fallback mock result for UI demo
            setResult({
                score: Math.floor(Math.random() * 30) + 65,
                feedback: [
                    "Strong use of action verbs in experience section.",
                    "Consider adding more quantifiable metrics (e.g., 'Increased efficiency by 20%').",
                    "Skills section is well-structured but could include more modern tech stack.",
                    "Formatting is clean and ATS-friendly."
                ],
                atsCompatibility: "High",
                predictedRole: "Software Engineer"
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '1000px', margin: '0 auto' }}>
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '12px', background: 'linear-gradient(to right, var(--color-primary), var(--color-accent))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    AI Resume Analyzer
                </h1>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem' }}>
                    Boost your placement chances with our advanced ATS-scoring engine.
                </p>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: result ? '1fr 1fr' : '1fr', gap: '32px', transition: 'all 0.5s ease' }}>
                {/* Input Section */}
                <motion.div 
                    layout
                    className="glass-card" 
                    style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px' }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                        <div style={{ p: '10px', background: 'var(--color-accent-soft)', borderRadius: '12px' }}>
                            <FileText size={24} color="var(--color-accent)" />
                        </div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Paste Resume Content</h3>
                    </div>

                    <textarea
                        style={{
                            width: '100%',
                            minHeight: '300px',
                            padding: '20px',
                            borderRadius: 'var(--border-radius-md)',
                            border: '1px solid var(--color-border)',
                            backgroundColor: 'var(--color-bg-secondary)',
                            color: 'var(--color-text-main)',
                            fontFamily: 'var(--font-main)',
                            fontSize: '0.95rem',
                            resize: 'vertical',
                            outline: 'none',
                            transition: 'var(--transition)'
                        }}
                        placeholder="Paste your resume text here (Experience, Skills, Projects...)"
                        value={resumeText}
                        onChange={(e) => setResumeText(e.target.value)}
                        onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'}
                        onBlur={(e) => e.target.style.borderColor = 'var(--color-border)'}
                    />

                    <button
                        onClick={handleAnalyze}
                        disabled={loading || !resumeText}
                        className="btn-premium"
                        style={{ width: '100%', padding: '16px', fontSize: '1.1rem' }}
                    >
                        {loading ? (
                            <>Analyzing with AI... <RefreshCcw size={20} className="animate-spin" /></>
                        ) : (
                            <>Analyze Now <Sparkles size={20} /></>
                        )}
                    </button>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-muted)', fontSize: '0.85rem', justifyContent: 'center' }}>
                        <ShieldCheck size={14} /> Your data is secure and used only for analysis.
                    </div>
                </motion.div>

                {/* Result Section */}
                <AnimatePresence>
                    {result && (
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="glass-card" 
                            style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px', borderLeft: '4px solid var(--color-accent)' }}
                        >
                            <div style={{ textAlign: 'center', p: '20px', background: 'var(--color-bg-secondary)', borderRadius: 'var(--border-radius-lg)', border: '1px solid var(--color-border)' }}>
                                <p style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>Your ATS Score</p>
                                <div style={{ fontSize: '4rem', fontWeight: 900, color: 'var(--color-primary)', display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '4px' }}>
                                    {result.score}
                                    <span style={{ fontSize: '1.5rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>/100</span>
                                </div>
                                <div style={{ height: '8px', width: '100%', background: 'var(--color-border)', borderRadius: '4px', marginTop: '16px', overflow: 'hidden' }}>
                                    <motion.div 
                                        initial={{ width: 0 }}
                                        animate={{ width: `${result.score}%` }}
                                        transition={{ duration: 1, ease: "easeOut" }}
                                        style={{ 
                                            height: '100%', 
                                            background: 'linear-gradient(to right, var(--color-accent), var(--color-secondary))',
                                            borderRadius: '4px'
                                        }}
                                    />
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                <div style={{ p: '16px', background: 'var(--color-accent-soft)', borderRadius: '12px', textAlign: 'center' }}>
                                    <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-accent)', textTransform: 'uppercase' }}>Compatibility</p>
                                    <p style={{ fontSize: '1.1rem', fontWeight: 700 }}>{result.atsCompatibility}</p>
                                </div>
                                <div style={{ p: '16px', background: 'var(--color-secondary-soft)', borderRadius: '12px', textAlign: 'center' }}>
                                    <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-secondary)', textTransform: 'uppercase' }}>Target Role</p>
                                    <p style={{ fontSize: '1.1rem', fontWeight: 700 }}>{result.predictedRole}</p>
                                </div>
                            </div>

                            <div>
                                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <TrendingUp size={18} color="var(--color-accent)" /> AI Recommendations
                                </h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    {result.feedback.map((item, idx) => (
                                        <div key={idx} style={{ display: 'flex', gap: '12px', p: '12px', background: 'var(--color-bg-secondary)', borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--color-border)' }}>
                                            {idx === 1 ? <AlertCircle size={18} color="var(--color-warning)" /> : <CheckCircle2 size={18} color="var(--color-accent)" />}
                                            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-main)' }}>{item}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <button 
                                onClick={() => setResult(null)} 
                                style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', fontSize: '0.9rem', cursor: 'pointer', fontWeight: 600 }}
                            >
                                Re-analyze new version
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default AIResumeAnalyzer;
