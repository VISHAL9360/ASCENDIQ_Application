import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, PlayCircle, Star, Target, Zap, ChevronRight, Loader2, RefreshCw, Award } from 'lucide-react';
import api from '../services/api';

const ROLES = ['Software Engineering', 'Data Science', 'Product Management', 'HR & Behavioral'];

const AIMockInterview = () => {
    const [phase, setPhase] = useState('select'); // 'select' | 'interview' | 'result'
    const [selectedRole, setSelectedRole] = useState('Software Engineering');
    const [loading, setLoading] = useState(false);

    const [questions, setQuestions] = useState([]);
    const [currentIdx, setCurrentIdx] = useState(0);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [scores, setScores] = useState([]);
    const [totalScore, setTotalScore] = useState(0);
    const [evaluatedCount, setEvaluatedCount] = useState(0);

    const chatEndRef = useRef(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, loading]);

    const startInterview = async () => {
        setLoading(true);
        try {
            const { data } = await api.get(`/ai/interview/generate?role=${encodeURIComponent(selectedRole)}`);
            const parsed = typeof data === 'string' ? JSON.parse(data) : data;
            if (!Array.isArray(parsed) || parsed.length === 0) throw new Error('No questions returned');
            setQuestions(parsed);
            setCurrentIdx(0);
            setMessages([{
                role: 'ai',
                content: `👋 Hello! I'm your AI Interviewer powered by Google Gemini.\n\nI have ${parsed.length} questions ready for your **${selectedRole}** interview.\n\n📌 **Question 1 of ${parsed.length}** [${parsed[0].type}]\n\n${parsed[0].question}`
            }]);
            setScores([]);
            setTotalScore(0);
            setEvaluatedCount(0);
            setPhase('interview');
        } catch (error) {
            console.error('Failed to start interview:', error);
            alert('Failed to generate interview questions. Please check that the backend is running and GEMINI_API_KEY is set.');
        } finally {
            setLoading(false);
        }
    };

    const handleSend = async () => {
        if (!input.trim() || loading) return;
        const currentQ = questions[currentIdx];
        const userAnswer = input.trim();
        setMessages(prev => [...prev, { role: 'user', content: userAnswer }]);
        setInput('');
        setLoading(true);

        try {
            const { data } = await api.post('/ai/interview/evaluate', {
                question: currentQ.question,
                answer: userAnswer
            });
            const evaluation = typeof data === 'string' ? JSON.parse(data) : data;
            const score = evaluation.score ?? 0;
            const newScores = [...scores, score];
            setScores(newScores);
            setTotalScore(prev => prev + score);
            setEvaluatedCount(prev => prev + 1);

            const isLast = currentIdx + 1 >= questions.length;
            let aiMsg = `📊 **Score: ${score}/10**\n\n💬 **Feedback:** ${evaluation.feedback}`;
            if (evaluation.modelAnswer) aiMsg += `\n\n✅ **Model Answer:** ${evaluation.modelAnswer}`;

            if (!isLast) {
                const nextQ = questions[currentIdx + 1];
                aiMsg += `\n\n─────────────────────\n\n📌 **Question ${currentIdx + 2} of ${questions.length}** [${nextQ.type}]\n\n${nextQ.question}`;
                setCurrentIdx(prev => prev + 1);
                setMessages(prev => [...prev, { role: 'ai', content: aiMsg }]);
            } else {
                aiMsg += `\n\n─────────────────────\n\n🎉 **Interview Complete!** Calculating your final score...`;
                setMessages(prev => [...prev, { role: 'ai', content: aiMsg }]);
                setTimeout(() => setPhase('result'), 1500);
            }
        } catch (error) {
            console.error('Evaluation failed:', error);
            setMessages(prev => [...prev, { role: 'ai', content: '⚠️ Error evaluating response. Please try again.' }]);
        } finally {
            setLoading(false);
        }
    };

    // --- Phase: SELECT ---
    if (phase === 'select') {
        return (
            <div style={{ padding: '32px', maxWidth: '860px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                    <div style={{ width: '72px', height: '72px', background: 'linear-gradient(135deg, var(--color-accent), var(--color-secondary, #7c3aed))', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                        <MessageSquare size={36} color="white" />
                    </div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '12px' }}>AI Mock Interview</h1>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', maxWidth: '520px', margin: '0 auto' }}>
                        Powered by <strong>Google Gemini</strong>. Real questions. Real AI feedback. Real scores.
                    </p>
                </div>

                <div className="glass-card" style={{ padding: '40px' }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '24px', textAlign: 'center' }}>
                        🎯 Select Your Interview Domain
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '36px' }}>
                        {ROLES.map(role => (
                            <button
                                key={role}
                                onClick={() => setSelectedRole(role)}
                                style={{
                                    padding: '20px', borderRadius: '16px', fontWeight: 700,
                                    border: `2px solid ${selectedRole === role ? 'var(--color-accent)' : 'var(--color-border)'}`,
                                    background: selectedRole === role ? 'var(--color-accent)' : 'var(--color-bg-secondary)',
                                    color: selectedRole === role ? 'white' : 'var(--color-text)',
                                    cursor: 'pointer', fontSize: '1rem', transition: 'all 0.2s'
                                }}
                            >
                                {role}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={startInterview}
                        disabled={loading}
                        className="btn-primary"
                        style={{ width: '100%', padding: '18px', fontSize: '1.1rem', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}
                    >
                        {loading ? <><Loader2 size={22} className="animate-spin" /> Generating Questions with Gemini AI...</> : <><PlayCircle size={22} /> Start Interview — {selectedRole}</>}
                    </button>
                </div>
            </div>
        );
    }

    // --- Phase: RESULT ---
    if (phase === 'result') {
        const avgScore = evaluatedCount > 0 ? Math.round((totalScore / (evaluatedCount * 10)) * 100) : 0;
        const grade = avgScore >= 80 ? { label: 'Excellent', color: '#22c55e' } :
            avgScore >= 60 ? { label: 'Good', color: '#3b82f6' } :
            avgScore >= 40 ? { label: 'Average', color: '#eab308' } :
            { label: 'Needs Improvement', color: '#ef4444' };

        return (
            <div style={{ padding: '32px', maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
                <div className="glass-card" style={{ padding: '48px' }}>
                    <div style={{ fontSize: '64px', marginBottom: '16px' }}>🎉</div>
                    <h1 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '8px' }}>Interview Complete!</h1>
                    <p style={{ color: 'var(--color-text-muted)', marginBottom: '40px' }}>{selectedRole} Interview Results</p>

                    <div style={{ width: '140px', height: '140px', borderRadius: '50%', background: `conic-gradient(${grade.color} ${avgScore * 3.6}deg, var(--color-bg-secondary) 0deg)`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px', boxShadow: `0 0 40px ${grade.color}40` }}>
                        <div style={{ width: '110px', height: '110px', borderRadius: '50%', background: 'var(--color-bg)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <span style={{ fontSize: '2rem', fontWeight: 900, color: grade.color }}>{avgScore}%</span>
                            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Overall</span>
                        </div>
                    </div>

                    <div style={{ display: 'inline-block', padding: '8px 24px', borderRadius: '30px', background: `${grade.color}20`, color: grade.color, fontWeight: 700, marginBottom: '32px', fontSize: '1.1rem' }}>
                        {grade.label}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '40px' }}>
                        <div style={{ padding: '16px', background: 'var(--color-bg-secondary)', borderRadius: '12px' }}>
                            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '4px' }}>Questions</p>
                            <p style={{ fontSize: '1.5rem', fontWeight: 800 }}>{questions.length}</p>
                        </div>
                        <div style={{ padding: '16px', background: 'var(--color-bg-secondary)', borderRadius: '12px' }}>
                            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '4px' }}>Total Score</p>
                            <p style={{ fontSize: '1.5rem', fontWeight: 800 }}>{totalScore}/{evaluatedCount * 10}</p>
                        </div>
                        <div style={{ padding: '16px', background: 'var(--color-bg-secondary)', borderRadius: '12px' }}>
                            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '4px' }}>Domain</p>
                            <p style={{ fontSize: '0.9rem', fontWeight: 700 }}>{selectedRole}</p>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                        <button onClick={() => { setPhase('select'); setMessages([]); }} className="btn-secondary" style={{ padding: '14px 32px', borderRadius: '12px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                            <RefreshCw size={18} /> Try Again
                        </button>
                        <button onClick={() => setPhase('interview')} className="btn-primary" style={{ padding: '14px 32px', borderRadius: '12px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                            <MessageSquare size={18} /> Review Answers
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // --- Phase: INTERVIEW ---
    const avgSoFar = evaluatedCount > 0 ? Math.round((totalScore / (evaluatedCount * 10)) * 100) : 0;

    return (
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', height: 'calc(100vh - 80px)', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '1.4rem', fontWeight: 800 }}>{selectedRole} — Live Interview</h1>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                        Question {Math.min(currentIdx + 1, questions.length)} of {questions.length} • Answered: {evaluatedCount}
                    </p>
                </div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <div style={{ padding: '8px 20px', background: 'var(--color-bg-secondary)', borderRadius: '30px', fontWeight: 700, display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <Target size={16} color="var(--color-accent)" /> {avgSoFar}%
                    </div>
                    <button onClick={() => setPhase('result')} className="btn-secondary" style={{ padding: '8px 18px', borderRadius: '30px' }}>
                        End & See Results
                    </button>
                </div>
            </div>

            <div className="glass-card" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <div style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {messages.map((msg, idx) => (
                        <div key={idx} style={{ display: 'flex', gap: '14px', flexDirection: msg.role === 'user' ? 'row-reverse' : 'row' }}>
                            <div style={{
                                width: '38px', height: '38px', borderRadius: '50%', flexShrink: 0,
                                background: msg.role === 'user' ? 'linear-gradient(135deg, var(--color-accent), var(--color-secondary, #7c3aed))' : 'var(--color-bg-secondary)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}>
                                {msg.role === 'user' ? <Star size={18} color="white" /> : <Zap size={18} color="var(--color-accent)" />}
                            </div>
                            <div style={{
                                padding: '16px 20px', borderRadius: '16px', maxWidth: '75%',
                                background: msg.role === 'user' ? 'linear-gradient(135deg, var(--color-accent), var(--color-secondary, #7c3aed))' : 'var(--color-bg-secondary)',
                                color: msg.role === 'user' ? 'white' : 'var(--color-text)',
                                whiteSpace: 'pre-wrap', lineHeight: 1.7
                            }}>
                                {msg.content}
                            </div>
                        </div>
                    ))}
                    {loading && (
                        <div style={{ display: 'flex', gap: '14px' }}>
                            <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'var(--color-bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Zap size={18} color="var(--color-accent)" />
                            </div>
                            <div style={{ padding: '16px 20px', borderRadius: '16px', background: 'var(--color-bg-secondary)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Loader2 size={16} className="animate-spin" color="var(--color-accent)" />
                                <span style={{ color: 'var(--color-text-muted)' }}>Gemini AI is thinking...</span>
                            </div>
                        </div>
                    )}
                    <div ref={chatEndRef} />
                </div>

                <div style={{ padding: '16px 20px', borderTop: '1px solid var(--color-border)', display: 'flex', gap: '12px' }}>
                    <input
                        type="text"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleSend()}
                        disabled={loading || phase === 'result'}
                        placeholder={phase === 'result' ? 'Interview complete.' : 'Type your answer and press Enter...'}
                        style={{
                            flex: 1, padding: '14px 22px', borderRadius: '30px',
                            border: '1px solid var(--color-border)', background: 'var(--color-bg)',
                            color: 'var(--color-text)', fontSize: '1rem', outline: 'none'
                        }}
                    />
                    <button
                        onClick={handleSend}
                        disabled={loading || !input.trim() || phase === 'result'}
                        className="btn-primary"
                        style={{ padding: '14px 28px', borderRadius: '30px', display: 'flex', gap: '8px', alignItems: 'center' }}
                    >
                        Send <ChevronRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AIMockInterview;
