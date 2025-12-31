import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { X, Save } from 'lucide-react';
import { API_URL } from '../../config';

const ProjectForm = ({ project, onClose, refreshData }) => {
    const [formData, setFormData] = useState({
        title: '',
        desc: '',
        tags: '',
        status: 'Completed',
        features: '',
        image: '',
        liveLink: '',
        gitLink: ''
    });

    useEffect(() => {
        if (project) {
            setFormData({
                ...project,
                tags: project.tags.join(', '),
                features: project.features.join('\n')
            });
        }
    }, [project]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const payload = {
            ...formData,
            tags: formData.tags.split(',').map(t => t.trim()),
            features: formData.features.split('\n').filter(f => f.trim() !== '')
        };

        try {
            if (project) {
                await axios.put(`${API_URL}/api/projects/${project._id}`, payload, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } else {
                await axios.post(`${API_URL}/api/projects`, payload, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            }
            refreshData();
            onClose();
        } catch (err) {
            console.error('Error saving project:', err);
            alert('Failed to save project');
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 shadow-2xl border border-slate-700">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold dark:text-white">{project ? 'Edit Project' : 'Add New Project'}</h2>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors">
                        <X size={24} className="dark:text-white" />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                            <label className="block text-sm font-medium dark:text-slate-300 mb-1">Status</label>
                            <select
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                className="w-full p-2 rounded-lg border dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                            >
                                <option>Completed</option>
                                <option>In Progress</option>
                                <option>Prototype</option>
                                <option>Live</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium dark:text-slate-300 mb-1">Description</label>
                        <textarea
                            value={formData.desc}
                            onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                            className="w-full p-2 rounded-lg border dark:bg-slate-700 dark:border-slate-600 dark:text-white h-24"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium dark:text-slate-300 mb-1">Tags (comma separated)</label>
                            <input
                                type="text"
                                value={formData.tags}
                                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                placeholder="React, Node.js, MongoDB"
                                className="w-full p-2 rounded-lg border dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium dark:text-slate-300 mb-1">Image URL</label>
                            <input
                                type="text"
                                value={formData.image}
                                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                className="w-full p-2 rounded-lg border dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium dark:text-slate-300 mb-1">Live Link</label>
                            <input
                                type="text"
                                value={formData.liveLink}
                                onChange={(e) => setFormData({ ...formData, liveLink: e.target.value })}
                                className="w-full p-2 rounded-lg border dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium dark:text-slate-300 mb-1">GitHub Link</label>
                            <input
                                type="text"
                                value={formData.gitLink}
                                onChange={(e) => setFormData({ ...formData, gitLink: e.target.value })}
                                className="w-full p-2 rounded-lg border dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium dark:text-slate-300 mb-1">Features (one per line)</label>
                        <textarea
                            value={formData.features}
                            onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                            className="w-full p-2 rounded-lg border dark:bg-slate-700 dark:border-slate-600 dark:text-white h-32"
                            placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                        />
                    </div>

                    <div className="flex justify-end gap-2 pt-4">
                        <button type="button" onClick={onClose} className="px-6 py-2 rounded-lg border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 dark:text-white transition-colors">
                            Cancel
                        </button>
                        <button type="submit" className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center gap-2 shadow-lg shadow-primary-500/20">
                            <Save size={18} /> Save Project
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProjectForm;
