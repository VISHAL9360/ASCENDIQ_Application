import { useState, useEffect } from 'react';
import api from '../services/api';
import {
    Building2,
    Globe,
    Mail,
    CheckCircle,
    XCircle,
    Search,
    Loader2,
    Plus,
    ExternalLink
} from 'lucide-react';

const ManageCompanies = () => {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const { data } = await api.get('/companies');
                setCompanies(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchCompanies();
    }, []);

    const handleVerify = async (id) => {
        try {
            await api.put(`/admin/verify-company/${id}`);
            setCompanies(companies.map(c => c._id === id ? { ...c, isVerified: true } : c));
        } catch (err) {
            alert('Verification failed');
        }
    };

    const filteredCompanies = companies.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.industry?.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) return <div className="text-center py-20"><Loader2 className="animate-spin mx-auto text-primary-600" size={40} /></div>;

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Partner Companies</h1>
                    <p className="text-slate-500">Manage and verify company accounts</p>
                </div>
                <div className="relative w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search companies..."
                        className="w-full pl-10 pr-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-primary-500"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCompanies.map((company) => (
                    <div key={company._id} className="card group hover:shadow-lg transition-all border-t-4 border-slate-100 hover:border-primary-500">
                        <div className="flex justify-between items-start mb-6">
                            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center font-black text-2xl text-slate-400 group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors">
                                {company.name[0]}
                            </div>
                            {company.isVerified ? (
                                <span className="flex items-center gap-1 bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                                    <CheckCircle size={12} /> Verified
                                </span>
                            ) : (
                                <span className="bg-amber-50 text-amber-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                                    Pending
                                </span>
                            )}
                        </div>

                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary-600 transition-colors uppercase truncate">
                            {company.name}
                        </h3>
                        <p className="text-slate-500 text-sm font-medium mb-4 flex items-center gap-2">
                            <Building2 size={14} /> {company.industry || 'Technology'}
                        </p>

                        <div className="space-y-3 mb-6">
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                <Mail size={16} className="text-slate-400" />
                                <span className="truncate">{company.contactEmail}</span>
                            </div>
                            {company.website && (
                                <a href={company.website} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-primary-600 hover:underline">
                                    <Globe size={16} /> <span className="truncate">{company.website}</span>
                                </a>
                            )}
                        </div>

                        {!company.isVerified && (
                            <button
                                onClick={() => handleVerify(company._id)}
                                className="w-full py-3 bg-primary-600 text-white rounded-xl font-bold hover:bg-primary-700 shadow-lg shadow-primary-100 transition-all flex items-center justify-center gap-2 text-sm"
                            >
                                <CheckCircle size={18} /> Verify Company
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageCompanies;
