import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import {
    User,
    FileText,
    Mail,
    Phone,
    Calendar,
    ChevronRight,
    CheckCircle,
    XCircle,
    Clock,
    Loader2,
    MoreVertical,
    Plus,
    IndianRupee,
    ArrowRight
} from 'lucide-react';

const ApplicationPipeline = () => {
    const { driveId } = useParams();
    const [applications, setApplications] = useState([]);
    const [drive, setDrive] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedApp, setSelectedApp] = useState(null);
    const [showInterviewModal, setShowInterviewModal] = useState(false);

    const stages = ['applied', 'shortlisted', 'interviewing', 'selected', 'offered', 'rejected'];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [driveRes, appsRes] = await Promise.all([
                    api.get(`/drives/${driveId}`),
                    api.get(`/applications/drive/${driveId}`)
                ]);
                setDrive(driveRes.data);
                setApplications(appsRes.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [driveId]);

    const handleUpdateStatus = async (appId, newStatus) => {
        try {
            await api.put(`/applications/${appId}/status`, { status: newStatus });
            setApplications(applications.map(app =>
                app._id === appId ? { ...app, status: newStatus } : app
            ));
        } catch (err) {
            alert('Failed to update status');
        }
    };

    if (loading) return <div className="text-center py-20"><Loader2 className="animate-spin mx-auto text-primary-600" size={40} /></div>;

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold uppercase">{drive?.jobRole}</h1>
                    <p className="text-slate-500 font-medium">{drive?.company?.name} • Recruitment Pipeline</p>
                </div>
                <div className="flex gap-3">
                    <button className="btn-primary-outline bg-white px-6">Edit Job</button>
                    <button className="btn-primary px-6">Export All</button>
                </div>
            </div>

            {/* Kanban-style Pipeline */}
            <div className="flex gap-6 overflow-x-auto pb-8 min-h-[70vh]">
                {stages.map(stage => {
                    const stageApps = applications.filter(app => app.status === stage);
                    return (
                        <div key={stage} className="flex-shrink-0 w-80 space-y-4">
                            <div className="flex justify-between items-center px-4 py-3 bg-white rounded-xl shadow-sm border border-slate-100">
                                <span className="font-black text-xs uppercase tracking-widest text-slate-500">{stage.replace('_', ' ')}</span>
                                <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full text-xs font-bold">{stageApps.length}</span>
                            </div>

                            <div className="space-y-4">
                                {stageApps.map(app => (
                                    <div key={app._id} className="card p-4 hover:shadow-lg transition-all cursor-default group border-t-2 border-slate-100 hover:border-primary-500 relative">
                                        <div className="flex justify-between items-start mb-3">
                                            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-bold">
                                                {app.student.name[0]}
                                            </div>
                                            <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="p-1 hover:bg-slate-100 rounded-lg text-slate-400"><MoreVertical size={16} /></button>
                                            </div>
                                        </div>

                                        <h4 className="font-bold text-slate-900 group-hover:text-primary-600 transition-colors uppercase truncate">{app.student.name}</h4>
                                        <p className="text-xs text-slate-500 mb-4 truncate">{app.student.email}</p>

                                        <div className="flex items-center gap-2 mb-4">
                                            <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-primary-500 transition-all duration-500"
                                                    style={{ width: `${(stages.indexOf(stage) + 1) * 100 / stages.length}%` }}
                                                ></div>
                                            </div>
                                            <span className="text-[10px] font-bold text-slate-400 capitalize">{stage}</span>
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <button
                                                onClick={() => {
                                                    setSelectedApp(app);
                                                    setShowInterviewModal(true);
                                                }}
                                                className="w-full py-1.5 bg-indigo-50 text-indigo-600 text-[10px] font-bold rounded-lg hover:bg-indigo-600 hover:text-white transition-all uppercase tracking-widest"
                                            >
                                                Schedule Interview
                                            </button>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleUpdateStatus(app._id, stages[stages.indexOf(stage) + 1] || stage)}
                                                    className="flex-1 py-1.5 bg-primary-50 text-primary-600 text-[10px] font-bold rounded-lg hover:bg-primary-600 hover:text-white transition-all uppercase tracking-widest"
                                                >
                                                    Advance
                                                </button>
                                                <button
                                                    onClick={() => handleUpdateStatus(app._id, 'rejected')}
                                                    className="px-2 py-1.5 bg-slate-50 text-slate-400 text-[10px] font-bold rounded-lg hover:bg-rose-50 hover:text-rose-600 transition-all uppercase tracking-widest"
                                                >
                                                    Reject
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {stageApps.length === 0 && (
                                    <div className="border-2 border-dashed border-slate-100 rounded-2xl h-24 flex items-center justify-center text-slate-300 text-sm font-medium italic">
                                        No candidates
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Interview Modal */}
            {showInterviewModal && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-[2rem] w-full max-w-lg p-10 animate-scale-in">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-bold">Schedule Interview</h2>
                            <button onClick={() => setShowInterviewModal(false)} className="p-2 hover:bg-slate-100 rounded-xl transition-all"><XCircle size={24} className="text-slate-400" /></button>
                        </div>
                        <form onSubmit={async (e) => {
                            e.preventDefault();
                            const data = new FormData(e.target);
                            try {
                                await api.post('/interviews', {
                                    applicationId: selectedApp._id,
                                    roundType: data.get('roundType'),
                                    scheduledDate: data.get('scheduledDate'),
                                    meetingLink: data.get('meetingLink'),
                                    interviewer: [data.get('interviewer')]
                                });
                                alert('Interview scheduled successfully!');
                                setShowInterviewModal(false);
                            } catch (err) {
                                alert('Failed to schedule interview');
                            }
                        }} className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-widest">Round Type</label>
                                <select name="roundType" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 font-bold text-slate-600">
                                    <option value="online_test">Online Test</option>
                                    <option value="technical">Technical Interview</option>
                                    <option value="hr">HR Interview</option>
                                    <option value="managerial">Managerial Round</option>
                                    <option value="final">Final Round</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-widest">Date & Time</label>
                                <input name="scheduledDate" type="datetime-local" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 font-bold" required />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-widest">Meeting Link</label>
                                <input name="meetingLink" type="url" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 font-bold" placeholder="https://zoom.us/j/..." />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-widest">Interviewer Name</label>
                                <input name="interviewer" type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 font-bold" placeholder="e.g. Sarah Connor" required />
                            </div>
                            <button type="submit" className="w-full btn-primary py-4 shadow-xl shadow-primary-200 font-black uppercase tracking-widest">Confirm Schedule</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ApplicationPipeline;
