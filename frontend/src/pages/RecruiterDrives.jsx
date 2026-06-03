import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { useForm } from 'react-hook-form';
import { Plus, Briefcase, IndianRupee, MapPin, Calendar, Clock, Loader2, CheckCircle, ArrowRight } from 'lucide-react';

const RecruiterDrives = () => {
    const [drives, setDrives] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [companies, setCompanies] = useState([]);

    const [showAddCompany, setShowAddCompany] = useState(false);
    const [newCompany, setNewCompany] = useState({ name: '', industry: '', website: '' });

    const { register, handleSubmit, reset } = useForm();

    const handleAddCompany = async () => {
        if (!newCompany.name.trim()) return alert('Company name is required');
        try {
            const { data } = await api.post('/companies', newCompany);
            setCompanies([...companies, data]);
            setNewCompany({ name: '', industry: '', website: '' });
            setShowAddCompany(false);
            alert(`Company "${data.name}" added! Now select it from the dropdown.`);
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to add company');
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [drivesRes, companiesRes] = await Promise.all([
                    api.get('/drives'),
                    api.get('/companies')
                ]);
                setDrives(drivesRes.data);
                setCompanies(companiesRes.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const onSubmit = async (data) => {
        try {
            const { data: newDrive } = await api.post('/drives', data);
            setDrives([newDrive, ...drives]);
            setShowModal(false);
            reset();
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to create drive');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this drive?')) return;
        try {
            await api.delete(`/drives/${id}`);
            setDrives(drives.filter(d => d._id !== id));
        } catch (err) {
            alert('Failed to delete drive');
        }
    };

    if (loading) return <div className="text-center py-20"><Loader2 className="animate-spin mx-auto text-primary-600" size={40} /></div>;

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Manage Drives</h1>
                    <p className="text-slate-500">Post and manage your placement drives</p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="btn-primary flex items-center gap-2"
                >
                    <Plus size={20} /> Post New Drive
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {drives.map((drive) => (
                    <div key={drive._id} className="card hover:shadow-lg transition-all border-l-4 border-primary-500">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 uppercase">{drive.jobRole}</h3>
                                <p className="text-slate-500 font-medium">{drive.company.name}</p>
                            </div>
                            <span className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                                {drive.status}
                            </span>
                        </div>

                        <div className="space-y-2 mb-6">
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                <IndianRupee size={16} /> <span>{drive.salaryPackage}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                <Calendar size={16} /> <span>{new Date(drive.driveDate).toLocaleDateString()}</span>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <Link
                                to={`/recruiter/pipeline/${drive._id}`}
                                className="flex-1 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary-100"
                            >
                                View Pipeline <ArrowRight size={16} />
                            </Link>
                            <button
                                onClick={() => handleDelete(drive._id)}
                                className="flex-1 py-2 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-100 text-sm font-bold transition-all"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b sticky top-0 bg-white">
                            <h2 className="text-2xl font-bold">Post New Drive</h2>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="col-span-2">
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Select Company</label>
                                    <div className="flex gap-2">
                                        <select {...register('companyId', { required: true })} className="flex-1 p-3 border rounded-xl">
                                            <option value="">{companies.length === 0 ? '⚠ No companies yet — add one below' : 'Choose Company'}</option>
                                            {companies.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                                        </select>
                                        <button type="button" onClick={() => setShowAddCompany(!showAddCompany)}
                                            className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-primary-50 hover:text-primary-700 text-sm whitespace-nowrap">
                                            + Add Company
                                        </button>
                                    </div>
                                    {showAddCompany && (
                                        <div className="mt-3 p-4 bg-slate-50 rounded-xl space-y-3 border">
                                            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Quick Add Company</p>
                                            <input value={newCompany.name} onChange={e => setNewCompany({ ...newCompany, name: e.target.value })}
                                                className="w-full p-2 border rounded-lg text-sm" placeholder="Company Name *" />
                                            <input value={newCompany.industry} onChange={e => setNewCompany({ ...newCompany, industry: e.target.value })}
                                                className="w-full p-2 border rounded-lg text-sm" placeholder="Industry (e.g. IT, Finance)" />
                                            <input value={newCompany.website} onChange={e => setNewCompany({ ...newCompany, website: e.target.value })}
                                                className="w-full p-2 border rounded-lg text-sm" placeholder="Website URL" />
                                            <button type="button" onClick={handleAddCompany}
                                                className="w-full py-2 bg-primary-600 text-white rounded-lg font-bold text-sm hover:bg-primary-700">
                                                Save Company
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Job Role</label>
                                    <input {...register('jobRole')} required className="w-full p-3 border rounded-xl" placeholder="Software Engineer" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Salary Package</label>
                                    <input {...register('salaryPackage')} required className="w-full p-3 border rounded-xl" placeholder="12 LPA" />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Description</label>
                                    <textarea {...register('jobDescription')} required className="w-full p-3 border rounded-xl h-32" placeholder="Describe the role..."></textarea>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Drive Date</label>
                                    <input {...register('driveDate')} type="date" required className="w-full p-3 border rounded-xl" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Deadline</label>
                                    <input {...register('deadline')} type="date" required className="w-full p-3 border rounded-xl" />
                                </div>
                            </div>
                            <div className="flex gap-4 pt-4">
                                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold">Cancel</button>
                                <button type="submit" className="flex-1 btn-primary py-3">Publish Drive</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RecruiterDrives;
