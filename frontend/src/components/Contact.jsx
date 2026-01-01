import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Mail, Phone, MapPin } from 'lucide-react';
import { API_URL } from '../config';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await axios.post(`${API_URL}/send-message`, formData);
            if (response.data.success) {
                alert("✨ Message sent successfully! I'll get back to you soon.");
                setFormData({ name: '', email: '', message: '' });
            }
        } catch (error) {
            if (error.response) {
                // Server responded with error
                alert(`❌ ${error.response.data.error || 'Failed to send message'}`);
            } else if (error.request) {
                // Request made but no response (backend offline)
                alert("⚠️ Cannot connect to server. Please make sure the backend is running on " + API_URL);
            } else {
                // Something else happened
                alert("❌ An error occurred. Please try again later.");
            }
            console.error('Error sending message:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="py-24 relative bg-slate-50/50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <span className="text-primary-600 font-bold tracking-wider uppercase text-sm border border-primary-600/30 px-3 py-1 rounded-full bg-primary-50">Get In Touch</span>
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mt-6 mb-6">Let's Build Something Great</h2>
                    <p className="text-slate-600 max-w-xl mx-auto text-lg leading-relaxed">
                        I'm currently available for freelance projects and internships.
                        Drop a message and let's discuss your ideas.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="rounded-[2.5rem] p-8 md:p-12 bg-slate-900 shadow-2xl overflow-hidden relative border border-slate-800"
                >
                    {/* Dark Form Background Effects */}
                    <div className="absolute top-0 left-0 w-64 h-64 bg-primary-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 translate-x-1/2 translate-y-1/2"></div>

                    <div className="relative z-10">
                        <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6 text-left">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-300 ml-1">Your Name</label>
                                    <input
                                        type="text"
                                        placeholder="John Doe"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-6 py-4 rounded-xl bg-slate-900/50 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:bg-slate-900/80 focus:border-primary-500 transition-all focus:ring-1 focus:ring-primary-500/50"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-300 ml-1">Your Email</label>
                                    <input
                                        type="email"
                                        placeholder="john@example.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full px-6 py-4 rounded-xl bg-slate-900/50 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:bg-slate-900/80 focus:border-primary-500 transition-all focus:ring-1 focus:ring-primary-500/50"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-300 ml-1">Message</label>
                                <textarea
                                    placeholder="Tell me about your project..."
                                    rows="4"
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full px-6 py-4 rounded-xl bg-slate-900/50 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:bg-slate-900/80 focus:border-primary-500 resize-none transition-all focus:ring-1 focus:ring-primary-500/50"
                                    required
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-4 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white font-bold rounded-xl shadow-lg shadow-primary-500/20 transition-all hover:scale-[1.01] hover:shadow-primary-500/40 active:scale-[0.98]"
                            >
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>

                        <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap justify-center gap-8 text-slate-400 text-sm font-medium">
                            <div className="flex items-center gap-2 hover:text-primary-400 transition-colors cursor-pointer group">
                                <div className="p-2 rounded-full bg-white/5 group-hover:bg-primary-500/20 transition-colors"><Mail size={16} /></div> agatheeswaran03@gmail.com
                            </div>
                            <div className="flex items-center gap-2 hover:text-primary-400 transition-colors cursor-pointer group">
                                <div className="p-2 rounded-full bg-white/5 group-hover:bg-primary-500/20 transition-colors"><Phone size={16} /></div> 6374603913
                            </div>
                            <div className="flex items-center gap-2 hover:text-primary-400 transition-colors cursor-pointer group">
                                <div className="p-2 rounded-full bg-white/5 group-hover:bg-primary-500/20 transition-colors"><MapPin size={16} /></div> Sivaganga, Tamil Nadu
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="mt-8 flex justify-center gap-6">
                            <a href="https://github.com/Agatheeswaran03" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-all transform hover:scale-110 border border-white/5 hover:border-white/20">
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub" className="w-6 h-6 opacity-80" />
                            </a>
                            <a href="https://www.linkedin.com/in/agatheeswaran03" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-all transform hover:scale-110 border border-white/5 hover:border-white/20">
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" alt="LinkedIn" className="w-6 h-6" />
                            </a>
                            <a href="https://www.instagram.com/agathees__/" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-all transform hover:scale-110 border border-white/5 hover:border-white/20">
                                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="url(#instagram-gradient-contact)">
                                    <defs>
                                        <linearGradient id="instagram-gradient-contact" x1="0%" y1="100%" x2="100%" y2="0%">
                                            <stop offset="0%" style={{ stopColor: '#FED373', stopOpacity: 1 }} />
                                            <stop offset="25%" style={{ stopColor: '#F15245', stopOpacity: 1 }} />
                                            <stop offset="50%" style={{ stopColor: '#D92E7F', stopOpacity: 1 }} />
                                            <stop offset="75%" style={{ stopColor: '#9B36B7', stopOpacity: 1 }} />
                                            <stop offset="100%" style={{ stopColor: '#515ECF', stopOpacity: 1 }} />
                                        </linearGradient>
                                    </defs>
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.645.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
