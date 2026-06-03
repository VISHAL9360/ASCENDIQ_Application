import { useState, useEffect } from 'react';
import api from '../services/api';
import {
    Briefcase,
    Calendar,
    Clock,
    CheckCircle,
    XCircle,
    Loader2,
    Search,
    Filter,
    Plus,
    Building2,
    IndianRupee,
    TrendingUp
} from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDrives = () => {
    const [drives, setDrives] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchDrives = async () => {
            try {
                const { data } = await api.get('/drives');
                setDrives(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchDrives();
    }, []);

    const handleVerifyDrive = async (id) => {
        try {
            await api.put(`/admin/verify-drive/${id}`);
            setDrives(drives.map(d => d._id === id ? { ...d, status: 'active' } : d));
        } catch (err) {
            alert('Drive verification failed');
        }
    };

    const handleDeleteDrive = async (id) => {
        if (!window.confirm('Are you sure you want to delete this drive?')) return;
        try {
            await api.delete(`/drives/${id}`);
            setDrives(drives.filter(d => d._id !== id));
        } catch (err) {
            alert('Failed to delete drive');
        }
    };

    const filteredDrives = drives.filter(d =>
        d.jobRole.toLowerCase().includes(search.toLowerCase()) ||
        d.company.name.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) return <div className="text-center py-20"><Loader2 className="animate-spin mx-auto text-primary-600" size={40} /></div>;

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Placement Oversight</h1>
                    <p className="text-slate-500">Post, manage and audit recruitment drives</p>
                </div>
                <div className="relative w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search drives or companies..."
                        className="w-full pl-10 pr-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-primary-500"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {filteredDrives.map((drive) => (
                    <div key={drive._id} className="card group hover:shadow-lg transition-all border-l-4 border-slate-200 hover:border-primary-500 p-6">
                        <div className="flex flex-col md:flex-row justify-between gap-6">
                            <div className="flex gap-4">
                                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center font-black text-2xl text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-all uppercase">
                                    {drive.company.name[0]}
                                </div>
                                <div className="space-y-1">
                                    <h3 className="text-xl font-bold text-slate-900 uppercase group-hover:text-primary-600 transition-colors">
                                        {drive.jobRole}
                                    </h3>
                                    <p className="text-slate-600 font-bold text-sm flex items-center gap-2">
                                        <Building2 size={16} /> {drive.company.name}
                                    </p>
                                    <div className="flex flex-wrap gap-4 mt-2">
                                        <span className="flex items-center gap-1 text-xs text-slate-400">
                                            <Calendar size={14} /> {new Date(drive.driveDate).toLocaleDateString()}
                                        </span>
                                        <span className="flex items-center gap-1 text-xs text-slate-400">
                                            <Clock size={14} /> Deadline: {new Date(drive.deadline).toLocaleDateString()}
                                        </span>
                                        <span className="flex items-center gap-1 text-xs text-primary-600 font-bold uppercase tracking-widest">
                                            <IndianRupee size={14} /> {drive.salaryPackage} package
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-row md:flex-col justify-end items-center md:items-end gap-3 min-w-[150px]">
                                <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${drive.status === 'active' ? 'bg-emerald-100 text-emerald-700' :
                                        drive.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-700'
                                    }`}>
                                    {drive.status}
                                </span>

                                <div className="flex gap-2">
                                    {drive.status === 'pending' && (
                                        <button
                                            onClick={() => handleVerifyDrive(drive._id)}
                                            className="p-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-600 hover:text-white transition-all"
                                            title="Approve Drive"
                                        >
                                            <CheckCircle size={18} />
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleDeleteDrive(drive._id)}
                                        className="p-2 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-600 hover:text-white transition-all"
                                        title="Delete Drive"
                                    >
                                        <XCircle size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-slate-50 flex justify-between items-center">
                            <div className="flex items-center gap-2 text-primary-600 font-bold text-xs uppercase tracking-widest">
                                <Users size={16} /> {drive.applicants?.length || 0} Registered Candidates
                            </div>
                            <Link
                                to={`/recruiter/pipeline/${drive._id}`}
                                className="text-slate-400 hover:text-primary-600 font-bold text-xs uppercase tracking-widest flex items-center gap-1 transition-colors"
                            >
                                Audit Pipeline <TrendingUp size={16} />
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminDrives;
