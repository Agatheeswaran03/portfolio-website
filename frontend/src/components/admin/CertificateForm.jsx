import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { X, Save } from 'lucide-react';
import { API_URL } from '../../config';

const CertificateForm = ({ certificate, onClose, refreshData }) => {
    const [formData, setFormData] = useState({
        title: '',
        issuer: '',
        date: '',
        type: 'Course',
        image: '',
        link: ''
    });

    useEffect(() => {
        if (certificate) {
            setFormData(certificate);
        }
    }, [certificate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            if (certificate) {
                await axios.put(`${API_URL}/api/certificates/${certificate._id}`, formData, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } else {
                await axios.post(`${API_URL}/api/certificates`, formData, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            }
            refreshData();
            onClose();
        } catch (err) {
            console.error('Error saving certificate:', err);
            alert('Failed to save certificate');
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-lg p-6 shadow-2xl border border-slate-700">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold dark:text-white">{certificate ? 'Edit Certificate' : 'Add New Certificate'}</h2>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors">
                        <X size={24} className="dark:text-white" />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium dark:text-slate-300 mb-1">Title</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full p-2 rounded-lg border dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium dark:text-slate-300 mb-1">Issuer</label>
                        <input
                            type="text"
                            value={formData.issuer}
                            onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                            className="w-full p-2 rounded-lg border dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                            required
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium dark:text-slate-300 mb-1">Date</label>
                            <input
                                type="text"
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                placeholder="Dec 2023"
                                className="w-full p-2 rounded-lg border dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium dark:text-slate-300 mb-1">Type</label>
                            <select
                                value={formData.type}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                className="w-full p-2 rounded-lg border dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                            >
                                <option>Course</option>
                                <option>Workshop</option>
                                <option>Internship</option>
                                <option>Frontend</option>
                                <option>Backend</option>
                                <option>AI / ML</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium dark:text-slate-300 mb-1">Image</label>
                        <div className="flex gap-2 mb-2">
                            <input
                                type="text"
                                value={formData.image}
                                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                placeholder="Image URL"
                                className="flex-1 p-2 rounded-lg border dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="file"
                                onChange={async (e) => {
                                    const file = e.target.files[0];
                                    if (!file) return;

                                    const uploadData = new FormData();
                                    uploadData.append('image', file);

                                    try {
                                        const token = localStorage.getItem('token');
                                        // Update to your actual backend URL if different
                                        const res = await axios.post(`${API_URL}/api/upload`, uploadData, {
                                            headers: {
                                                'Content-Type': 'multipart/form-data',
                                                Authorization: `Bearer ${token}`
                                            }
                                        });
                                        if (res.data.success) {
                                            // Check if it's a full URL (Cloudinary) or relative path (Local)
                                            const imageUrl = res.data.imageUrl;
                                            const fullUrl = imageUrl.startsWith('http')
                                                ? imageUrl
                                                : `${API_URL}${imageUrl}`;

                                            setFormData(prev => ({ ...prev, image: fullUrl }));
                                        }
                                    } catch (err) {
                                        console.error('Upload failed:', err);
                                        alert('Image upload failed');
                                    }
                                }}
                                className="text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                            />
                        </div>
                        {formData.image && (
                            <div className="mt-2 text-xs text-green-600">
                                Image set!
                            </div>
                        )}
                    </div>
                    <div className="flex justify-end gap-2 pt-4">
                        <button type="button" onClick={onClose} className="px-6 py-2 rounded-lg border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 dark:text-white transition-colors">
                            Cancel
                        </button>
                        <button type="submit" className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center gap-2 shadow-lg shadow-primary-500/20">
                            <Save size={18} /> Save Certificate
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CertificateForm;
