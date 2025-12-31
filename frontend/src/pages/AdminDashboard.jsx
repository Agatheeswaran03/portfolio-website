import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LogOut, Plus, Trash2, Edit2 } from 'lucide-react';
import ProjectForm from '../components/admin/ProjectForm';
import CertificateForm from '../components/admin/CertificateForm';
import ExperienceForm from '../components/admin/ExperienceForm';
import ResumeManager from '../components/admin/ResumeManager';
import { API_URL } from '../config';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('projects');
    const [data, setData] = useState([]);

    // Modal State
    const [showModal, setShowModal] = useState(false);
    const [editItem, setEditItem] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/admin/login');
        } else {
            if (activeTab !== 'resume') {
                fetchData(activeTab);
            }
        }
    }, [navigate, activeTab]);

    const fetchData = async (type) => {
        try {
            const res = await axios.get(`${API_URL}/api/${type}`);
            setData(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this item?")) return;

        const token = localStorage.getItem('token');
        try {
            await axios.delete(`${API_URL}/api/${activeTab}/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchData(activeTab);
        } catch (err) {
            console.error("Delete failed", err);
            alert("Delete failed");
        }
    };

    const handleEdit = (item) => {
        setEditItem(item);
        setShowModal(true);
    };

    const handleAddNew = () => {
        setEditItem(null);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditItem(null);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/admin/login');
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white">
            <nav className="bg-white dark:bg-slate-800 shadow-md p-4 flex justify-between items-center sticky top-0 z-50">
                <h1 className="text-2xl font-bold text-primary-600">Admin Dashboard</h1>
                <button onClick={handleLogout} className="flex items-center gap-2 text-red-500 hover:text-red-600">
                    <LogOut size={20} /> Logout
                </button>
            </nav>

            <div className="max-w-7xl mx-auto p-6">
                <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
                    {['projects', 'certificates', 'experience', 'resume'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-2 rounded-full capitalize font-medium transition-all ${activeTab === tab
                                ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30'
                                : 'bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {activeTab === 'resume' ? (
                    <ResumeManager />
                ) : (
                    <div className="grid gap-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold capitalize">{activeTab}</h2>
                            <button onClick={handleAddNew} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                                <Plus size={20} /> Add New
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {data.map((item) => (
                                <div key={item._id} className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
                                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 line-clamp-2">{item.desc || item.issuer || item.company}</p>
                                    <div className="flex justify-end gap-2 mt-auto">
                                        <button onClick={() => handleEdit(item)} className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg">
                                            <Edit2 size={18} />
                                        </button>
                                        <button onClick={() => handleDelete(item._id)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Modals */}
            {showModal && activeTab === 'projects' && (
                <ProjectForm
                    project={editItem}
                    onClose={handleCloseModal}
                    refreshData={() => fetchData('projects')}
                />
            )}
            {showModal && activeTab === 'certificates' && (
                <CertificateForm
                    certificate={editItem}
                    onClose={handleCloseModal}
                    refreshData={() => fetchData('certificates')}
                />
            )}
            {showModal && activeTab === 'experience' && (
                <ExperienceForm
                    experience={editItem}
                    onClose={handleCloseModal}
                    refreshData={() => fetchData('experience')}
                />
            )}
        </div>
    );
};

export default AdminDashboard;
