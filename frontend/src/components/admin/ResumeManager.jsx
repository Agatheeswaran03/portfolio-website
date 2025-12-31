import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Upload, FileText, Check, AlertCircle } from 'lucide-react';
import { API_URL } from '../../config';

const ResumeManager = () => {
    const [resumeUrl, setResumeUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${API_URL}/api/profile`);
            setResumeUrl(res.data.resumeUrl);
        } catch (err) {
            console.error('Failed to fetch profile', err);
        } finally {
            setLoading(false);
        }
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validation
        if (file.type !== 'application/pdf') {
            setMessage({ type: 'error', text: 'Please upload a PDF file.' });
            return;
        }

        const formData = new FormData();
        formData.append('image', file); // keeping field name 'image' as per uploadRoutes logic

        try {
            setUploading(true);
            setMessage(null);

            const token = localStorage.getItem('token');

            // 1. Upload to Cloudinary
            const uploadRes = await axios.post(`${API_URL}/api/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            });

            if (uploadRes.data.success) {
                const newUrl = uploadRes.data.imageUrl;

                // 2. Update Profile in DB
                await axios.put(`${API_URL}/api/profile`, { resumeUrl: newUrl }, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setResumeUrl(newUrl);
                setMessage({ type: 'success', text: 'Resume updated successfully!' });
            }

        } catch (err) {
            console.error(err);
            setMessage({ type: 'error', text: 'Upload failed. Please try again.' });
        } finally {
            setUploading(false);
        }
    };

    if (loading) return <div className="text-slate-500">Loading settings...</div>;

    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <FileText className="text-primary-600" size={24} />
                Resume Settings
            </h2>

            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            Current Resume
                        </label>
                        {resumeUrl ? (
                            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                                <FileText size={16} />
                                <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline truncate max-w-xs">
                                    View Current Resume
                                </a>
                            </div>
                        ) : (
                            <div className="text-sm text-slate-500 italic">No resume uploaded yet. Defaulting to static file.</div>
                        )}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Upload New Resume (PDF)
                    </label>
                    <div className="relative">
                        <input
                            type="file"
                            accept=".pdf"
                            onChange={handleFileUpload}
                            disabled={uploading}
                            className="block w-full text-sm text-slate-500
                                file:mr-4 file:py-2.5 file:px-4
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-primary-50 file:text-primary-700
                                hover:file:bg-primary-100
                                disabled:opacity-50 cursor-pointer"
                        />
                        {uploading && (
                            <div className="absolute right-0 top-2">
                                <span className="text-xs text-primary-600 font-medium animate-pulse">Uploading...</span>
                            </div>
                        )}
                    </div>
                </div>

                {message && (
                    <div className={`p-3 rounded-lg flex items-center gap-2 text-sm ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                        }`}>
                        {message.type === 'success' ? <Check size={16} /> : <AlertCircle size={16} />}
                        {message.text}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ResumeManager;
