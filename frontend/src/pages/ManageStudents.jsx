import { useState, useEffect } from 'react';
import api from '../services/api';
import { User, GraduationCap, FileText, Check, X, Search, Loader2 } from 'lucide-react';

const ManageStudents = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const { data } = await api.get('/students');
                setStudents(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchStudents();
    }, []);

    const filteredStudents = students.filter(s =>
        s.user.name.toLowerCase().includes(search.toLowerCase()) ||
        s.rollNumber.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) return <div className="text-center py-20"><Loader2 className="animate-spin mx-auto text-primary-600" size={40} /></div>;

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Manage Students</h1>
                    <p className="text-slate-500">View and manage student eligibility and profiles</p>
                </div>
                <div className="relative w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search name or roll number..."
                        className="w-full pl-10 pr-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-primary-500"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            <div className="card overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-200">
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Student</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Roll/Batch</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Dept/CGPA</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Resume</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {filteredStudents.map((s) => (
                            <tr key={s._id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-bold">
                                            {s.user.name[0]}
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-900">{s.user.name}</p>
                                            <p className="text-xs text-slate-500">{s.user.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <p className="text-sm font-semibold text-slate-700">{s.rollNumber}</p>
                                    <p className="text-xs text-slate-500">{s.batch}</p>
                                </td>
                                <td className="px-6 py-4">
                                    <p className="text-sm text-slate-700">{s.department}</p>
                                    <div className="flex items-center gap-1">
                                        <GraduationCap size={14} className="text-slate-400" />
                                        <span className="text-sm font-bold text-primary-600">{s.cgpa}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${s.status === 'placed' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
                                        }`}>
                                        {s.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    {s.resume ? (
                                        <a
                                            href={`http://localhost:5000/${s.resume}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-primary-600 hover:text-primary-800 transition-colors inline-block p-2 bg-primary-50 rounded-lg"
                                        >
                                            <FileText size={18} />
                                        </a>
                                    ) : (
                                        <span className="text-slate-300">N/A</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageStudents;
