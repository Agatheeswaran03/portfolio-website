import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Mail, User, Calendar, Trash2, CheckCircle, Clock } from 'lucide-react';
import { API_URL } from '../../config';

const MessageList = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchMessages = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            // The backend endpoint in server.js is /messages (no /api prefix currently)
            const res = await axios.get(`${API_URL}/messages`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // Handle both { messages: [] } and [ ] response formats
            const messageData = res.data.messages || res.data;
            setMessages(Array.isArray(messageData) ? messageData : []);
            setError(null);
        } catch (err) {
            console.error("Error fetching messages:", err);
            setError("Failed to load messages. Please ensure you are logged in.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this message forever?")) return;

        try {
            const token = localStorage.getItem('token');
            // We need a delete endpoint. Adding /messages/:id based on server.js structure
            await axios.delete(`${API_URL}/messages/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMessages(messages.filter(msg => msg._id !== id));
        } catch (err) {
            console.error("Failed to delete message:", err);
            alert("Delete failed. This feature might still be being updated on the backend.");
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        </div>
    );

    if (error) return (
        <div className="bg-red-50 border border-red-200 text-red-600 p-6 rounded-xl text-center">
            {error}
        </div>
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Contact Messages ({messages.length})</h2>
                <button
                    onClick={fetchMessages}
                    className="text-sm text-primary-600 hover:underline font-medium"
                >
                    Refresh
                </button>
            </div>

            {messages.length === 0 ? (
                <div className="bg-white dark:bg-slate-800 p-12 rounded-2xl text-center border-2 border-dashed border-slate-200 dark:border-slate-700">
                    <Mail className="mx-auto text-slate-300 dark:text-slate-600 mb-4" size={48} />
                    <p className="text-slate-500 dark:text-slate-400">No messages received yet.</p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {messages.map((msg) => (
                        <div
                            key={msg._id}
                            className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 hover:border-primary-300 dark:hover:border-primary-800 transition-all group"
                        >
                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                <div className="space-y-3 flex-1">
                                    <div className="flex flex-wrap items-center gap-4">
                                        <div className="flex items-center gap-2 text-primary-600 font-bold bg-primary-50 dark:bg-primary-900/20 px-3 py-1 rounded-lg text-sm">
                                            <User size={16} /> {msg.name}
                                        </div>
                                        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
                                            <Mail size={16} /> {msg.email}
                                        </div>
                                        <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 text-xs text-nowrap">
                                            <Calendar size={14} /> {new Date(msg.date).toLocaleDateString()} at {new Date(msg.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                    </div>

                                    <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl text-slate-700 dark:text-slate-300 leading-relaxed italic whitespace-pre-wrap">
                                        "{msg.message}"
                                    </div>
                                </div>

                                <div className="flex md:flex-col gap-2">
                                    <button
                                        onClick={() => handleDelete(msg._id)}
                                        className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                                        title="Delete Message"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MessageList;
