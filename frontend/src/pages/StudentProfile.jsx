import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import api from '../services/api';
import {
    User, Code, FileUp, CheckCircle2, Loader2,
    ExternalLink, FileText, AlertCircle, Upload
} from 'lucide-react';

const StudentProfile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileError, setFileError] = useState('');

    const { register, handleSubmit, reset } = useForm();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { data } = await api.get('/students/profile/me');
                setProfile(data);
                reset({
                    rollNumber: data.rollNumber || '',
                    department: data.department || '',
                    course: data.course || '',
                    batch: data.batch || '',
                    cgpa: data.cgpa || '',
                    skills: Array.isArray(data.skills)
                        ? data.skills.join(', ')
                        : (data.skills || ''),
                });
            } catch (err) {
                console.error('No profile found yet, creating fresh form.');
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [reset]);

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        setFileError('');
        if (!file) return;

        // Frontend file validation
        const allowedTypes = ['application/pdf', 'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        if (!allowedTypes.includes(file.type)) {
            setFileError('Only PDF or Word (.doc/.docx) files are accepted.');
            setSelectedFile(null);
            return;
        }
        if (file.size > 10 * 1024 * 1024) {
            setFileError('File must be smaller than 10MB.');
            setSelectedFile(null);
            return;
        }
        setSelectedFile(file);
    };

    const onSubmit = async (data) => {
        setSaving(true);
        setMessage({ text: '', type: '' });

        // Build FormData for multipart upload (supports both text fields + file)
        const formData = new FormData();
        formData.append('rollNumber', data.rollNumber || '');
        formData.append('department', data.department || '');
        formData.append('course', data.course || '');
        formData.append('batch', data.batch || '');
        formData.append('cgpa', data.cgpa || '');
        formData.append('skills', data.skills || '');

        // Only attach resume if user selected a new file
        if (selectedFile) {
            formData.append('resume', selectedFile);
        }

        try {
            const { data: updatedProfile } = await api.post('/students/profile', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setProfile(updatedProfile);
            setSelectedFile(null);
            setMessage({ text: '✅ Profile updated successfully!', type: 'success' });
            setTimeout(() => setMessage({ text: '', type: '' }), 4000);
        } catch (err) {
            const errMsg = err.response?.data?.error || 'Failed to save profile. Please try again.';
            setMessage({ text: errMsg, type: 'error' });
        } finally {
            setSaving(false);
        }
    };

    if (loading) return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
            <Loader2 className="animate-spin" color="var(--color-accent)" size={32} />
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'var(--font-title)', letterSpacing: '-0.02em' }}>
                        My Profile
                    </h1>
                    <p style={{ color: 'var(--color-text-muted)', marginTop: '4px' }}>
                        Keep your profile complete to maximize your placement chances.
                    </p>
                </div>
                {profile?.status && (
                    <span className={`px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider
                        ${profile.status === 'placed'
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-blue-100 text-blue-700'}`}>
                        {profile.status}
                    </span>
                )}
            </div>

            {/* Feedback Message */}
            {message.text && (
                <div className={`p-4 rounded-xl flex items-center gap-3 border font-medium
                    ${message.type === 'success'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                        : 'bg-red-50 text-red-700 border-red-100'}`}>
                    {message.type === 'success'
                        ? <CheckCircle2 size={18} />
                        : <AlertCircle size={18} />}
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* ── Academic Details Card ── */}
                    <div className="card space-y-5">
                        <h3 className="text-lg font-bold border-b pb-3 flex items-center gap-2">
                            <User size={18} className="text-primary-600" /> Academic Details
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-semibold text-slate-600 mb-1 block">Roll Number</label>
                                <input {...register('rollNumber')} required
                                    className="w-full p-3 bg-slate-50 border rounded-xl outline-none focus:ring-2 focus:ring-primary-300" />
                            </div>
                            <div>
                                <label className="text-sm font-semibold text-slate-600 mb-1 block">Department</label>
                                <input {...register('department')} required
                                    className="w-full p-3 bg-slate-50 border rounded-xl outline-none focus:ring-2 focus:ring-primary-300" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-semibold text-slate-600 mb-1 block">Course</label>
                                    <input {...register('course')} required
                                        className="w-full p-3 bg-slate-50 border rounded-xl outline-none focus:ring-2 focus:ring-primary-300" />
                                </div>
                                <div>
                                    <label className="text-sm font-semibold text-slate-600 mb-1 block">Batch</label>
                                    <input {...register('batch')} placeholder="2022-2026"
                                        className="w-full p-3 bg-slate-50 border rounded-xl outline-none focus:ring-2 focus:ring-primary-300" />
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-semibold text-slate-600 mb-1 block">CGPA</label>
                                <input {...register('cgpa')} type="number" step="0.01" min="0" max="10"
                                    className="w-full p-3 bg-slate-50 border rounded-xl outline-none focus:ring-2 focus:ring-primary-300" />
                            </div>
                        </div>
                    </div>

                    {/* ── Skills & Resume Card ── */}
                    <div className="card space-y-5">
                        <h3 className="text-lg font-bold border-b pb-3 flex items-center gap-2">
                            <Code size={18} className="text-primary-600" /> Skills &amp; Resume
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-semibold text-slate-600 mb-1 block">
                                    Skills <span className="font-normal text-slate-400">(comma separated)</span>
                                </label>
                                <textarea
                                    {...register('skills')}
                                    rows="3"
                                    className="w-full p-3 bg-slate-50 border rounded-xl resize-none outline-none focus:ring-2 focus:ring-primary-300"
                                    placeholder="React, Java, Spring Boot, PostgreSQL, Docker..."
                                />
                            </div>

                            {/* Resume Upload Zone */}
                            <div>
                                <label className="text-sm font-semibold text-slate-600 mb-1 block">
                                    Resume <span className="font-normal text-slate-400">(PDF or Word, max 10MB)</span>
                                </label>
                                <div className="border-2 border-dashed border-slate-200 rounded-xl p-5 bg-slate-50
                                    hover:border-primary-400 transition-colors text-center relative">
                                    <input
                                        type="file"
                                        accept=".pdf,.doc,.docx"
                                        onChange={handleFileSelect}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                    <Upload className="mx-auto text-slate-400 mb-2" size={28} />
                                    {selectedFile ? (
                                        <p className="text-sm font-semibold text-primary-600">
                                            📎 {selectedFile.name}
                                        </p>
                                    ) : (
                                        <p className="text-sm text-slate-500">
                                            Click or drag &amp; drop to upload resume
                                        </p>
                                    )}
                                </div>

                                {/* File validation error */}
                                {fileError && (
                                    <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                                        <AlertCircle size={12} /> {fileError}
                                    </p>
                                )}

                                {/* Current resume link from S3 */}
                                {profile?.resumeUrl && !selectedFile && (
                                    <a
                                        href={profile.resumeUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-2 inline-flex items-center gap-1.5 text-xs text-primary-600
                                            font-semibold hover:underline"
                                    >
                                        <FileText size={14} />
                                        View Current Resume (Cloud)
                                        <ExternalLink size={12} />
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={saving || !!fileError}
                    className="w-full py-4 rounded-xl font-bold text-white
                        bg-primary-600 hover:bg-primary-700 disabled:bg-slate-300
                        transition-all flex items-center justify-center gap-2"
                >
                    {saving ? (
                        <><Loader2 className="animate-spin" size={18} /> Saving &amp; Uploading...</>
                    ) : (
                        <><FileUp size={18} /> Save Profile Changes</>
                    )}
                </button>
            </form>
        </div>
    );
};

export default StudentProfile;
