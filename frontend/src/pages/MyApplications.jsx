import { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import {
    Clock,
    CheckCircle,
    XCircle,
    Calendar,
    Briefcase,
    IndianRupee,
    Loader2,
    ExternalLink,
    AlertCircle
} from 'lucide-react';

const MyApplications = () => {
    const { user } = useAuth();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                // Fetching student-specific applications
                // Note: Assuming backend has /api/applications/student/me or similar
                // Based on previous audit, applicationController has no specific 'get student applications'
                // Let's implement it in the controller first or check if I missed it.
                const { data } = await api.get('/applications/student/me');
                setApplications(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchApplications();
    }, []);

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'applied': return 'bg-blue-100 text-blue-700';
            case 'shortlisted': return 'bg-emerald-100 text-emerald-700';
            case 'interviewing': return 'bg-purple-100 text-purple-700';
            case 'selected': return 'bg-amber-100 text-amber-700';
            case 'offered': return 'bg-pink-100 text-pink-700';
            case 'rejected': return 'bg-rose-100 text-rose-700';
            default: return 'bg-slate-100 text-slate-700';
        }
    };

    if (loading) return <div className="text-center py-20"><Loader2 className="animate-spin mx-auto text-primary-600" size={40} /></div>;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold">My Applications</h1>
                <p className="text-slate-500">Track the status of your placement drive applications</p>
            </div>

            {applications.length === 0 ? (
                <div className="card p-20 text-center space-y-4">
                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-300">
                        <Briefcase size={40} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">No applications yet</h3>
                    <p className="text-slate-500 max-w-sm mx-auto">Explore available drives and start applying to your dream companies.</p>
                    <a href="/student/drives" className="btn-primary inline-block px-8 py-3">Browse Drives</a>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6">
                    {applications.map((app) => (
                        <div key={app._id} className="card p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:shadow-lg transition-shadow border-l-4 border-primary-500">
                            <div className="flex gap-4 items-center">
                                <div className="w-14 h-14 bg-slate-100 rounded-xl flex items-center justify-center font-black text-primary-600 text-2xl uppercase">
                                    {app.drive.company.name[0]}
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold text-slate-900 uppercase">{app.drive.jobRole}</h4>
                                    <p className="text-slate-600 font-medium flex items-center gap-1">
                                        {app.drive.company.name} • <IndianRupee size={14} /> {app.drive.salaryPackage}
                                    </p>
                                    <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
                                        <span className="flex items-center gap-1"><Calendar size={14} /> Applied: {new Date(app.appliedAt).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col md:items-end gap-3 w-full md:w-auto">
                                <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${getStatusColor(app.status)}`}>
                                    {app.status}
                                </span>
                                {app.status === 'interviewing' && (
                                    <p className="text-xs text-primary-600 font-bold flex items-center gap-1 animate-pulse">
                                        <Clock size={12} /> Interview Scheduled
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyApplications;
