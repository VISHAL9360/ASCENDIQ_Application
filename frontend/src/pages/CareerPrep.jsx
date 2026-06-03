import { useState, useEffect, useRef } from 'react';
import {
    BookOpen, Code, FileCheck, ExternalLink, Terminal, Award,
    PlayCircle, ChevronDown, ChevronUp, Timer, CheckCircle,
    XCircle, RotateCcw, Brain, Star, Briefcase
} from 'lucide-react';

// --- DATA ---
const questionBank = {
    'DSA & Coding': [
        { q: 'What is the time complexity of binary search?', a: 'O(log n) — binary search halves the search space at each step.' },
        { q: 'Explain the difference between Stack and Queue.', a: 'Stack is LIFO (Last In First Out). Queue is FIFO (First In First Out).' },
        { q: 'What is a Hash Map and its average time complexity?', a: 'A Hash Map stores key-value pairs. Average case: O(1) for get/put. Worst case: O(n).' },
        { q: 'What is Dynamic Programming?', a: 'DP solves complex problems by breaking them into overlapping subproblems and caching results (memoization/tabulation).' },
        { q: 'Explain BFS vs DFS.', a: 'BFS uses a queue and explores level by level. DFS uses a stack/recursion and explores as deep as possible before backtracking.' },
    ],
    'System Design': [
        { q: 'What is horizontal vs vertical scaling?', a: 'Vertical: adding more power to a single server. Horizontal: adding more servers. Horizontal is preferred for high availability.' },
        { q: 'What is a CDN and when would you use it?', a: 'Content Delivery Network — distributes static assets geographically close to users to reduce latency.' },
        { q: 'What is load balancing?', a: 'Distributing incoming requests across multiple servers to ensure no single server is overwhelmed.' },
        { q: 'Explain CAP theorem.', a: 'A distributed system can only guarantee 2 of 3: Consistency, Availability, Partition Tolerance.' },
        { q: 'What is database sharding?', a: 'Splitting a large database into smaller, faster pieces (shards) distributed across multiple servers.' },
    ],
    'HR & Behavioral': [
        { q: 'Tell me about yourself.', a: 'Structure: Present (current role/skills) → Past (relevant experience) → Future (why this company). Keep it under 2 minutes.' },
        { q: 'What is your biggest weakness?', a: 'Choose a real but improvable weakness. Show self-awareness and what you\'re doing to improve it.' },
        { q: 'Where do you see yourself in 5 years?', a: 'Show ambition aligned with the company\'s growth path. Mention skill development and leadership goals.' },
        { q: 'Why do you want to join this company?', a: 'Research the company — mention specific products, culture, or mission that attracted you. Be genuine.' },
        { q: 'Describe a time you handled conflict in a team.', a: 'Use STAR format: Situation, Task, Action, Result. Focus on communication and resolution.' },
    ],
    'MERN Stack': [
        { q: 'What is the virtual DOM in React?', a: 'A lightweight in-memory representation of the real DOM. React diffs it with the previous state and only updates what changed.' },
        { q: 'What are React hooks?', a: 'Functions that let you use state and lifecycle features in functional components. E.g., useState, useEffect, useContext.' },
        { q: 'What is middleware in Express.js?', a: 'Functions that have access to req, res, and next. Used for logging, auth, body parsing, error handling.' },
        { q: 'What is the difference between SQL and NoSQL?', a: 'SQL: relational, structured, ACID. NoSQL (like MongoDB): flexible schema, horizontally scalable, document/key-value based.' },
        { q: 'Explain JWT authentication.', a: 'Server issues a signed token on login. Client sends it in headers. Server verifies the signature — no session storage needed.' },
    ],
};

const mockQuestions = [
    ...questionBank['DSA & Coding'],
    ...questionBank['HR & Behavioral'],
    ...questionBank['MERN Stack'],
].sort(() => Math.random() - 0.5).slice(0, 8);

// --- MOCK INTERVIEW COMPONENT ---
const MockInterview = ({ onExit }) => {
    const [questions, setQuestions] = useState([]);
    const [idx, setIdx] = useState(0);
    const [timeLeft, setTimeLeft] = useState(90);
    const [userAnswer, setUserAnswer] = useState('');
    const [loadingQuestions, setLoadingQuestions] = useState(true);
    const [evaluating, setEvaluating] = useState(false);
    const [aiFeedback, setAiFeedback] = useState(null);
    const [scores, setScores] = useState([]);
    const [finished, setFinished] = useState(false);
    const timerRef = useRef(null);

    // Fetch real AI questions when the component opens!
    useEffect(() => {
        const fetchAIQuestions = async () => {
            try {
                // We ask for Software Developer questions
                const { data } = await api.get('/ai/interview/generate?role=Software Developer');
                const parsed = typeof data === 'string' ? JSON.parse(data) : data;
                setQuestions(parsed);
            } catch (err) {
                console.error("Could not fetch AI questions, using fallback.", err);
                setQuestions([
                    { id: 1, type: "Technical", question: "Explain the difference between optimistic locking and pessimistic locking in database design." }
                ]);
            } finally {
                setLoadingQuestions(false);
            }
        };
        fetchAIQuestions();
    }, []);

    // Timer countdown logic
    useEffect(() => {
        if (loadingQuestions || finished || questions.length === 0) return;
        timerRef.current = setInterval(() => {
            setTimeLeft(t => {
                if (t <= 1) { clearInterval(timerRef.current); return 0; }
                return t - 1;
            });
        }, 1000);
        return () => clearInterval(timerRef.current);
    }, [idx, loadingQuestions, finished, questions]);

    const submitAnswer = async () => {
        if (!userAnswer.trim()) return;
        clearInterval(timerRef.current);
        setEvaluating(true);
        try {
            const { data } = await api.post('/ai/interview/evaluate', {
                question: questions[idx].question,
                answer: userAnswer
            });
            const parsed = typeof data === 'string' ? JSON.parse(data) : data;
            setAiFeedback(parsed);
            setScores([...scores, parsed.score]);
        } catch (err) {
            console.error("Evaluation failed", err);
            setAiFeedback({ score: 7, feedback: "Good effort!", modelAnswer: "Study database indexing." });
            setScores([...scores, 7]);
        } finally {
            setEvaluating(false);
        }
    };

    const nextQuestion = () => {
        setAiFeedback(null);
        setUserAnswer('');
        if (idx + 1 >= questions.length) {
            setFinished(true);
        } else {
            setIdx(idx + 1);
            setTimeLeft(90);
        }
    };

    if (loadingQuestions) {
        return <div className="text-center py-20 text-slate-500 animate-pulse font-bold">🧠 Dynamic AI Interview Room Loading... Please wait</div>;
    }

    if (finished) {
        const avg = scores.length > 0 ? (scores.reduce((a, b) => a + b, 0) / scores.length) * 10 : 0;
        return (
            <div className="text-center space-y-6 py-12">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="text-green-600" size={40} />
                </div>
                <h2 className="text-3xl font-black">AI Interview Complete!</h2>
                <div className="inline-block bg-primary-50 rounded-2xl px-12 py-6">
                    <p className="text-6xl font-black text-primary-600">{Math.round(avg)}%</p>
                    <p className="text-slate-500 font-bold">Overall AI Score</p>
                </div>
                <div>
                    <button onClick={onExit} className="px-6 py-3 bg-slate-200 rounded-xl font-bold">Back to Hub</button>
                </div>
            </div>
        );
    }

    const q = questions[idx];

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex justify-between items-center">
                <p className="text-sm font-bold text-slate-500">Question {idx + 1} of {questions.length}</p>
                <div className="flex items-center gap-2">
                    <Timer size={18} className="text-slate-500" />
                    <span className="text-2xl font-black">{timeLeft}s</span>
                </div>
            </div>

            <div className="card p-8 space-y-6">
                <div className="p-3 bg-indigo-50 text-indigo-700 rounded-xl font-bold inline-block text-xs uppercase">{q.type}</div>
                <p className="text-xl font-bold text-slate-900">{q.question}</p>

                {!aiFeedback ? (
                    <div className="space-y-4">
                        <textarea
                            className="w-full h-32 p-4 border rounded-xl bg-slate-50 outline-none focus:border-primary-500"
                            placeholder="Type your answer here..."
                            value={userAnswer}
                            onChange={(e) => setUserAnswer(e.target.value)}
                            disabled={evaluating}
                        />
                        <button
                            onClick={submitAnswer}
                            disabled={evaluating || !userAnswer.trim()}
                            className="w-full py-3 bg-primary-600 text-white rounded-xl font-bold disabled:bg-slate-300"
                        >
                            {evaluating ? "AI is reviewing your answer..." : "Submit Answer to AI"}
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                            <p className="font-bold text-emerald-800">AI Score: {aiFeedback.score} / 10</p>
                            <p className="text-sm text-slate-700 mt-2"><strong>Feedback:</strong> {aiFeedback.feedback}</p>
                        </div>
                        <div className="p-4 bg-slate-50 border rounded-xl text-sm">
                            <p className="font-bold text-slate-500 mb-1">MODEL ANSWER</p>
                            <p className="text-slate-700">{aiFeedback.modelAnswer}</p>
                        </div>
                        <button onClick={nextQuestion} className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold">
                            {idx + 1 >= questions.length ? "Finish Interview" : "Next Question →"}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};


// --- QUESTION BANK COMPONENT ---
const QuestionBankView = () => {
    const [activeCategory, setActiveCategory] = useState('DSA & Coding');
    const [openIdx, setOpenIdx] = useState(null);

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap gap-3">
                {Object.keys(questionBank).map(cat => (
                    <button key={cat} onClick={() => { setActiveCategory(cat); setOpenIdx(null); }}
                        className={`px-4 py-2 rounded-xl font-bold text-sm transition-all ${activeCategory === cat ? 'bg-primary-600 text-white shadow-lg shadow-primary-100' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                        {cat}
                    </button>
                ))}
            </div>

            <div className="space-y-3">
                {questionBank[activeCategory].map((item, i) => (
                    <div key={i} className="card overflow-hidden">
                        <button onClick={() => setOpenIdx(openIdx === i ? null : i)}
                            className="w-full flex justify-between items-center p-5 text-left hover:bg-slate-50 transition-all">
                            <span className="font-bold text-slate-800">{item.q}</span>
                            {openIdx === i ? <ChevronUp size={18} className="text-primary-600 flex-shrink-0" /> : <ChevronDown size={18} className="text-slate-400 flex-shrink-0" />}
                        </button>
                        {openIdx === i && (
                            <div className="px-5 pb-5 border-t bg-primary-50">
                                <p className="text-slate-700 leading-relaxed pt-4">{item.a}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

import api from '../services/api';

// ... existing code ...

const CareerPrep = () => {
    const [mode, setMode] = useState('hub'); // 'hub' | 'mock' | 'questions' | 'resources'
    const [dbResources, setDbResources] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchResources();
    }, []);

    const fetchResources = async () => {
        setLoading(true);
        try {
            const { data } = await api.get('/resources');
            setDbResources(data);
        } catch (error) {
            console.error('Error fetching resources:', error);
        } finally {
            setLoading(false);
        }
    };

    if (mode === 'mock') return <MockInterview onExit={() => setMode('hub')} />;

    return (
        <div className="space-y-10 pb-20">
            <div>
                <h1 className="text-4xl font-black text-slate-900">Career Prep <span className="text-primary-600">Hub</span></h1>
                <p className="text-slate-500 text-lg">Your personalized toolkit for placement success.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <button onClick={() => setMode('mock')}
                    className="card p-8 text-left group hover:bg-primary-600 hover:text-white transition-all duration-300 hover:shadow-2xl hover:shadow-primary-100 hover:-translate-y-1">
                    <div className="w-14 h-14 bg-primary-100 group-hover:bg-white/20 rounded-2xl flex items-center justify-center mb-4 transition-all">
                        <PlayCircle className="text-primary-600 group-hover:text-white" size={28} />
                    </div>
                    <h3 className="text-xl font-black mb-2">Mock Interview</h3>
                    <p className="text-slate-500 group-hover:text-primary-100 text-sm">8 timed questions across DSA, HR & Tech. Get an instant score.</p>
                    <span className="mt-4 inline-block text-xs font-black uppercase tracking-widest text-primary-600 group-hover:text-white">Start Now →</span>
                </button>

                <button onClick={() => setMode('questions')}
                    className="card p-8 text-left group hover:bg-indigo-600 hover:text-white transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-100 hover:-translate-y-1">
                    <div className="w-14 h-14 bg-indigo-100 group-hover:bg-white/20 rounded-2xl flex items-center justify-center mb-4 transition-all">
                        <Brain className="text-indigo-600 group-hover:text-white" size={28} />
                    </div>
                    <h3 className="text-xl font-black mb-2">Question Bank</h3>
                    <p className="text-slate-500 group-hover:text-indigo-100 text-sm">Browse 20+ interview questions across DSA, System Design, HR & MERN.</p>
                    <span className="mt-4 inline-block text-xs font-black uppercase tracking-widest text-indigo-600 group-hover:text-white">Explore →</span>
                </button>

                <button onClick={() => setMode('resources')}
                    className="card p-8 text-left group hover:bg-emerald-600 hover:text-white transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-100 hover:-translate-y-1">
                    <div className="w-14 h-14 bg-emerald-100 group-hover:bg-white/20 rounded-2xl flex items-center justify-center mb-4 transition-all">
                        <BookOpen className="text-emerald-600 group-hover:text-white" size={28} />
                    </div>
                    <h3 className="text-xl font-black mb-2">Learning Resources</h3>
                    <p className="text-slate-500 group-hover:text-emerald-100 text-sm">Access curated materials, PDFs, and videos for comprehensive learning.</p>
                    <span className="mt-4 inline-block text-xs font-black uppercase tracking-widest text-emerald-600 group-hover:text-white">Browse Library →</span>
                </button>

                <a href="https://takeuforward.org/interviews/strivers-sde-sheet-top-coding-interview-problems/" target="_blank" rel="noreferrer"
                    className="card p-8 text-left group hover:bg-rose-600 hover:text-white transition-all duration-300 hover:shadow-2xl hover:shadow-rose-100 hover:-translate-y-1">
                    <div className="w-14 h-14 bg-rose-100 group-hover:bg-white/20 rounded-2xl flex items-center justify-center mb-4 transition-all">
                        <Code className="text-rose-600 group-hover:text-white" size={28} />
                    </div>
                    <h3 className="text-xl font-black mb-2">DSA Sheet</h3>
                    <p className="text-slate-500 group-hover:text-rose-100 text-sm">Striver's Top 100 SDE Sheet — the industry gold standard.</p>
                    <span className="mt-4 inline-block text-xs font-black uppercase tracking-widest text-rose-600 group-hover:text-white">Open →</span>
                </a>
            </div>

            {mode === 'resources' && (
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-black">Digital Resource Library</h2>
                        <button onClick={() => setMode('hub')} className="text-sm font-bold text-slate-400 hover:text-slate-700">✕ Close</button>
                    </div>

                    {loading ? (
                        <div className="text-center py-20 text-slate-500">Curating your resources...</div>
                    ) : dbResources.length === 0 ? (
                        <div className="glass-card p-12 text-center text-slate-500">
                            No resources available in the library yet. Check back soon!
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {dbResources.map(resource => (
                                <div key={resource.id} className="glass-card p-6 flex flex-col gap-4">
                                    <div className="flex justify-between items-start">
                                        <div className="p-3 bg-primary-50 rounded-xl">
                                            {resource.type === 'VIDEO' ? <PlayCircle size={20} className="text-primary-600" /> : <BookOpen size={20} className="text-primary-600" />}
                                        </div>
                                        <span className="badge badge-info">{resource.category}</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg mb-1">{resource.title}</h4>
                                        <p className="text-sm text-slate-500 line-clamp-2">{resource.description}</p>
                                    </div>
                                    <a
                                        href={resource.contentUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn-premium mt-auto"
                                        style={{ padding: '10px', fontSize: '0.8rem' }}
                                    >
                                        View Resource <ExternalLink size={14} />
                                    </a>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {mode === 'questions' && (
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-black">Interview Question Bank</h2>
                        <button onClick={() => setMode('hub')} className="text-sm font-bold text-slate-400 hover:text-slate-700">✕ Close</button>
                    </div>
                    <QuestionBankView />
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <a href="https://github.com/donnemartin/system-design-primer" target="_blank" rel="noreferrer"
                    className="card p-6 flex items-center gap-4 hover:shadow-lg transition-all group">
                    <div className="p-3 bg-slate-100 rounded-xl"><Terminal className="text-slate-600" size={24} /></div>
                    <div>
                        <h4 className="font-bold">System Design Primer</h4>
                        <p className="text-sm text-slate-500">Learn how to architect large-scale systems</p>
                    </div>
                    <ExternalLink size={16} className="ml-auto text-slate-300 group-hover:text-primary-600" />
                </a>
                <a href="https://leetcode.com/problemset/all/" target="_blank" rel="noreferrer"
                    className="card p-6 flex items-center gap-4 hover:shadow-lg transition-all group">
                    <div className="p-3 bg-yellow-50 rounded-xl"><Star className="text-yellow-500" size={24} /></div>
                    <div>
                        <h4 className="font-bold">LeetCode Practice</h4>
                        <p className="text-sm text-slate-500">Real interview coding problems</p>
                    </div>
                    <ExternalLink size={16} className="ml-auto text-slate-300 group-hover:text-primary-600" />
                </a>
                <a href="https://www.glassdoor.com/Interview/index.htm" target="_blank" rel="noreferrer"
                    className="card p-6 flex items-center gap-4 hover:shadow-lg transition-all group">
                    <div className="p-3 bg-green-50 rounded-xl"><Briefcase className="text-green-500" size={24} /></div>
                    <div>
                        <h4 className="font-bold">Glassdoor Reviews</h4>
                        <p className="text-sm text-slate-500">Real interview experiences by company</p>
                    </div>
                    <ExternalLink size={16} className="ml-auto text-slate-300 group-hover:text-primary-600" />
                </a>
                <a href="https://www.interviewbit.com/" target="_blank" rel="noreferrer"
                    className="card p-6 flex items-center gap-4 hover:shadow-lg transition-all group">
                    <div className="p-3 bg-blue-50 rounded-xl"><BookOpen className="text-blue-500" size={24} /></div>
                    <div>
                        <h4 className="font-bold">InterviewBit</h4>
                        <p className="text-sm text-slate-500">Structured interview preparation platform</p>
                    </div>
                    <ExternalLink size={16} className="ml-auto text-slate-300 group-hover:text-primary-600" />
                </a>
            </div>
        </div>
    );
};

export default CareerPrep;
