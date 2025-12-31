import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import axios from 'axios';
import { API_URL } from '../config';

const Certifications = ({ setSelectedCert }) => {
    const [certificates, setCertificates] = useState([]);

    useEffect(() => {
        const fetchCertificates = async () => {
            try {
                const res = await axios.get(`${API_URL}/api/certificates`);
                setCertificates(res.data);
            } catch (err) {
                console.error("Error fetching certificates:", err);
            }
        };
        fetchCertificates();
    }, []);

    return (
        <section id="certifications" className="py-24 bg-slate-50/50 dark:bg-slate-900/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="scroll-mt-24">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl font-bold text-slate-900 dark:text-white mb-10 flex items-center gap-3 justify-center"
                    >
                        <Award className="text-primary-600 dark:text-primary-400" /> Certifications & Credentials
                    </motion.h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {certificates.map((cert, idx) => (
                            <motion.div
                                key={cert._id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="group relative glass-card rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-primary-900/5 transition-all duration-300 hover:-translate-y-1 bg-white dark:bg-slate-800"
                            >
                                {cert.image && (
                                    <div className="h-40 overflow-hidden bg-slate-50 dark:bg-slate-900 relative">
                                        {/* Always visible overlay with blur */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-primary-600/90 via-primary-500/80 to-primary-700/90 z-10 flex items-center justify-center backdrop-blur-md transition-all duration-300 group-hover:from-primary-600/95 group-hover:via-primary-500/85 group-hover:to-primary-700/95">
                                            <div className="text-center space-y-2">
                                                <p className="text-white/90 text-xs font-semibold tracking-wide uppercase">Click to view</p>
                                                <button
                                                    onClick={() => setSelectedCert(cert)}
                                                    className="bg-white text-primary-700 px-6 py-2.5 rounded-full text-sm font-bold transform group-hover:scale-110 transition-all duration-300 flex items-center gap-2 shadow-xl hover:shadow-2xl mx-auto"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                    View Credential
                                                </button>
                                            </div>
                                        </div>
                                        {/* Blurred certificate image in background */}
                                        <img src={cert.image} alt={cert.title} className="w-full h-full object-cover blur-sm scale-105 opacity-30" />
                                    </div>
                                )}
                                <div className="p-5">
                                    <span className="text-[10px] font-bold tracking-widest text-primary-600 dark:text-primary-400 uppercase bg-primary-50 dark:bg-primary-900/30 px-2 py-1 rounded-md border border-primary-100 dark:border-primary-800">
                                        {cert.type}
                                    </span>
                                    <h3 className="mt-3 text-base font-bold text-slate-900 dark:text-white line-clamp-2 group-hover:text-primary-600 transition-colors leading-tight h-10">{cert.title}</h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 font-medium">{cert.issuer}</p>
                                    <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">{cert.date}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Certifications;
