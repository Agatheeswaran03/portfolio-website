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
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
