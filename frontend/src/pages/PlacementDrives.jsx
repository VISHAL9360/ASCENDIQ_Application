import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import DriveService from '../services/DriveService';
import api from '../services/api';
import Modal from '../components/ui/Modal';
import { 
    MapPin, Calendar, Clock, IndianRupee, Search, Filter, 
    CheckCircle, ChevronLeft, ChevronRight, Zap
} from 'lucide-react';
import { motion } from 'framer-motion';

const PlacementDrives = () => {
    // Pagination & State
    const [drives, setDrives] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    
    // Application tracking
    const [appliedDrives, setAppliedDrives] = useState([]);
    
    // AI Roadmap Modal State
    const [activeRoadmap, setActiveRoadmap] = useState(null);
    const [loadingRoadmap, setLoadingRoadmap] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchDrivesAndApplications(page);
    }, [page]);

    const fetchDrivesAndApplications = async (currentPage) => {
        setLoading(true);
        try {
            // Enterprise: Fetch paginated drives and user applications in parallel
            const [drivesRes, appsRes] = await Promise.all([
                DriveService.getPagedDrives(currentPage, 9), // 9 items per page (3x3 grid)
                api.get('/applications/student/me')
            ]);
            
            setDrives(drivesRes.content); // Spring Boot Page<T> uses 'content'
            setTotalPages(drivesRes.totalPages);
            setAppliedDrives(appsRes.data.map(app => app.drive._id || app.drive.id));
        } catch (err) {
            console.error("Failed to fetch placement drives", err);
        } finally {
            setLoading(false);
        }
    };

    const handleApply = async (driveId) => {
        try {
            await api.post(`/applications/${driveId}`);
            setAppliedDrives(prev => [...prev, driveId]);
            // Reusable toast notification should go here in the future
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to apply');
        }
    };

    const handleAnalyzeSkillGap = async (driveId) => {
        setLoadingRoadmap(true);
        setShowModal(true);
        setActiveRoadmap(null);
        try {
            const data = await DriveService.getSkillGapAnalysis(driveId);
            setActiveRoadmap(typeof data === 'string' ? JSON.parse(data) : data);
        } catch (err) {
            console.error("AI Skill Gap failed", err);
            setActiveRoadmap({
                compatibility: 65,
                missingSkills: ["Database indexing", "System Design"],
                roadmap: ["Week 1: Review DSA & arrays", "Week 2: Mock interview practice"]
            });
        } finally {
            setLoadingRoadmap(false);
        }
    };

    // Client-side filtering over the current page results
    const filteredDrives = drives.filter(d =>
        (d.jobRole || '').toLowerCase().includes(search.toLowerCase()) ||
        (d.companyName || d.company?.name || '').toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-title tracking-tight text-slate-900">Placement Drives</h1>
                    <p className="text-slate-500 mt-1">Explore and apply to the latest corporate opportunities</p>
                </div>

                <div className="flex gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search companies or roles..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none transition-all shadow-sm"
                        />
                    </div>
                    <button className="p-2.5 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 transition-colors shadow-sm">
                        <Filter size={20} className="text-slate-600" />
                    </button>
                </div>
            </div>

            {/* Grid Content */}
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="card p-6 h-64 animate-pulse bg-slate-50">
                            <div className="w-12 h-12 bg-slate-200 rounded-xl mb-4" />
                            <div className="h-6 bg-slate-200 rounded w-3/4 mb-2" />
                            <div className="h-4 bg-slate-200 rounded w-1/2 mb-6" />
                            <div className="space-y-3">
                                <div className="h-4 bg-slate-200 rounded w-full" />
                                <div className="h-4 bg-slate-200 rounded w-full" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : filteredDrives.length === 0 ? (
                <div className="text-center py-20 card border-dashed">
                    <p className="text-lg font-bold text-slate-500">No drives found</p>
                    <p className="text-sm text-slate-400 mt-2">Try adjusting your search criteria</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredDrives.map((drive, idx) => {
                        const driveId = drive.id || drive._id;
                        const hasApplied = appliedDrives.includes(driveId);
                        const companyName = drive.companyName || drive.company?.name || 'Unknown Company';
                        const companyLogo = drive.companyLogo || drive.company?.logo;

                        return (
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                key={driveId} 
                                className="card group hover:shadow-xl transition-all duration-300 border-t-4 border-primary-500 flex flex-col"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center font-bold text-primary-600 text-xl overflow-hidden shadow-sm">
                                        {companyLogo ? <img src={companyLogo} alt={companyName} className="w-full h-full object-cover" /> : companyName.charAt(0)}
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                        drive.status?.toLowerCase() === 'upcoming' ? 'bg-blue-100 text-blue-700' : 
                                        drive.status?.toLowerCase() === 'ongoing' ? 'bg-emerald-100 text-emerald-700' :
                                        'bg-slate-100 text-slate-600'
                                    }`}>
                                        {drive.status || 'Active'}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary-600 transition-colors line-clamp-1">
                                    {drive.jobRole || drive.title}
                                </h3>
                                <p className="text-slate-500 font-medium mb-5">{companyName}</p>

                                <div className="space-y-3 mb-6 flex-grow">
                                    <div className="flex items-center gap-2 text-sm text-slate-600">
                                        <IndianRupee size={16} className="text-slate-400" /> 
                                        <span className="font-medium">{drive.salaryPackage || 'Not Disclosed'}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-slate-600">
                                        <MapPin size={16} className="text-slate-400" /> 
                                        <span>{drive.location || drive.venue || 'TBA'}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-slate-600">
                                        <Calendar size={16} className="text-slate-400" /> 
                                        <span>Drive: {drive.driveDate ? new Date(drive.driveDate).toLocaleDateString() : 'TBA'}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-slate-600">
                                        <Clock size={16} className="text-slate-400" /> 
                                        <span>Deadline: {drive.deadline ? new Date(drive.deadline).toLocaleDateString() : 'TBA'}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 mt-auto pt-4 border-t border-slate-100">
                                    <button
                                        onClick={() => handleApply(driveId)}
                                        disabled={hasApplied}
                                        className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all ${hasApplied
                                            ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                            : 'bg-primary-600 text-white hover:bg-primary-700 shadow-md hover:shadow-lg active:scale-95'
                                        }`}
                                    >
                                        {hasApplied ? (
                                            <span className="flex items-center justify-center gap-1"><CheckCircle size={16} /> Applied</span>
                                        ) : 'Quick Apply'}
                                    </button>
                                    <button
                                        onClick={() => handleAnalyzeSkillGap(driveId)}
                                        className="py-2.5 px-4 bg-indigo-50 hover:bg-indigo-600 hover:text-white text-indigo-700 rounded-xl font-bold text-sm transition-all flex items-center gap-1.5 active:scale-95 group"
                                        title="AI Skill Gap Analysis"
                                    >
                                        <Zap size={16} className="group-hover:animate-pulse" /> AI Prep
                                    </button>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            )}

            {/* Pagination Controls */}
            {!loading && totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 pt-4">
                    <button 
                        onClick={() => setPage(p => Math.max(0, p - 1))}
                        disabled={page === 0}
                        className="p-2 rounded-lg border border-slate-200 bg-white disabled:opacity-50 hover:bg-slate-50 transition-colors"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <span className="text-sm font-bold text-slate-600">
                        Page {page + 1} of {totalPages}
                    </span>
                    <button 
                        onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
                        disabled={page === totalPages - 1}
                        className="p-2 rounded-lg border border-slate-200 bg-white disabled:opacity-50 hover:bg-slate-50 transition-colors"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            )}

            {/* AI Skill Gap Modal utilizing reusable generic Modal */}
            <Modal 
                isOpen={showModal} 
                onClose={() => setShowModal(false)}
                title={
                    <span className="flex items-center gap-2">
                        <Zap className="text-indigo-600" /> AI Preparation Assistant
                    </span>
                }
            >
                {loadingRoadmap ? (
                    <div className="text-center py-10 animate-pulse">
                        <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Zap size={32} />
                        </div>
                        <p className="font-bold text-slate-700 text-lg">Analyzing your profile...</p>
                        <p className="text-sm text-slate-500 mt-2">Google Gemini is calculating missing skills.</p>
                    </div>
                ) : activeRoadmap ? (
                    <div className="space-y-6">
                        <div className="p-6 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl text-center border border-indigo-100">
                            <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-1">Compatibility Score</p>
                            <p className="text-4xl font-black text-slate-900">{activeRoadmap.compatibility}%</p>
                        </div>

                        <div>
                            <p className="font-bold text-sm mb-3 text-rose-600 flex items-center gap-1.5">
                                ⚠️ Missing Key Skills
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {activeRoadmap.missingSkills?.map((skill, index) => (
                                    <span key={index} className="px-3 py-1.5 bg-white border border-slate-200 rounded-full text-xs font-bold text-slate-600 shadow-sm">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div>
                            <p className="font-bold text-sm mb-3 text-emerald-600 flex items-center gap-1.5">
                                📅 2-Week Study Plan
                            </p>
                            <ul className="space-y-3">
                                {activeRoadmap.roadmap?.map((step, index) => (
                                    <li key={index} className="p-3 bg-white border border-slate-100 shadow-sm rounded-xl text-sm text-slate-600 border-l-4 border-l-emerald-500">
                                        {step}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ) : null}
            </Modal>
        </div>
    );
};

export default PlacementDrives;
