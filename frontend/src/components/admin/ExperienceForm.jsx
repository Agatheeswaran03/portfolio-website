import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { X, Save } from 'lucide-react';
import { API_URL } from '../../config';

const ExperienceForm = ({ experience, onClose, refreshData }) => {
    const [formData, setFormData] = useState({
        title: '',
        company: '',
        period: '',
        description: '',
        type: 'Internship'
    });

    useEffect(() => {
        if (experience) {
            setFormData(experience);
        }
    }, [experience]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            if (experience) {
                await axios.put(`${API_URL}/api/experience/${experience._id}`, formData, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } else {
                await axios.post(`${API_URL}/api/experience`, formData, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            }
            refreshData();
            onClose();
        } catch (err) {
            console.error('Error saving experience:', err);
            alert('Failed to save experience');
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-lg p-6 shadow-2xl border border-slate-700">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold dark:text-white">{experience ? 'Edit Experience' : 'Add New Experience'}</h2>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors">
                        <X size={24} className="dark:text-white" />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium dark:text-slate-300 mb-1">Title (Role)</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full p-2 rounded-lg border dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium dark:text-slate-300 mb-1">Company</label>
                        <input
                            type="text"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            className="w-full p-2 rounded-lg border dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                            required
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium dark:text-slate-300 mb-1">Period</label>
                            <input
                                type="text"
                                value={formData.period}
                                onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                                placeholder="Jan 2023 - Present"
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
                                <option>Internship</option>
                                <option>Full-time</option>
                                <option>Part-time</option>
                                <option>Freelance</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium dark:text-slate-300 mb-1">Description</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full p-2 rounded-lg border dark:bg-slate-700 dark:border-slate-600 dark:text-white h-32"
                            required
                        />
                    </div>
                    <div className="flex justify-end gap-2 pt-4">
                        <button type="button" onClick={onClose} className="px-6 py-2 rounded-lg border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 dark:text-white transition-colors">
                            Cancel
                        </button>
                        <button type="submit" className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center gap-2 shadow-lg shadow-primary-500/20">
                            <Save size={18} /> Save Experience
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ExperienceForm;
