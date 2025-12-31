import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Award, ChevronRight } from 'lucide-react';
import axios from 'axios';
import { API_URL } from '../config';

const Experience = ({ setSelectedCert }) => {
    const [experience, setExperience] = useState([]);

    useEffect(() => {
        const fetchExperience = async () => {
            try {
                const res = await axios.get(`${API_URL}/api/experience`);
                setExperience(res.data);
            } catch (err) {
                console.error("Error fetching experience:", err);
            }
        };
        fetchExperience();
    }, []);

    const handleViewCert = (exp) => {
        if (exp.certificateImage) {
            setSelectedCert({
                image: exp.certificateImage,
                title: exp.title,
                type: 'Experience',
                issuer: exp.company,
                date: exp.period
            });
        }
    };

    return (
        <section id="experience" className="py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl font-bold text-slate-900 dark:text-white mb-10 flex items-center gap-3"
                    >
                        <Briefcase className="text-primary-600 dark:text-primary-400" /> Professional Experience
                    </motion.h2>

                    <div className="relative border-l-2 border-primary-200 dark:border-primary-900 ml-3 md:ml-6 space-y-12">
                        {experience.map((exp, idx) => (
                            <motion.div
                                key={exp._id}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.2 }}
                                className="relative pl-8 md:pl-12 group"
                            >
                                <span className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-white dark:bg-slate-800 border-4 border-primary-500 group-hover:scale-125 transition-transform shadow-[0_0_10px_rgba(212,175,55,0.4)]"></span>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{exp.title}</h3>
                                <div className="flex flex-wrap items-center gap-3 mt-1 mb-4">
                                    <span className="text-primary-700 dark:text-primary-300 font-bold bg-primary-100 dark:bg-primary-900/30 px-3 py-0.5 rounded-full text-sm border border-primary-200 dark:border-primary-800">{exp.company}</span>
                                    <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">{exp.period}</span>
                                </div>
                                <p className="text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed glass-card p-6 rounded-xl border border-white/60 dark:border-slate-700 bg-white/40 dark:bg-slate-800/40">
                                    {exp.description}
                                    {exp.certificateImage && (
                                        <button
                                            onClick={() => handleViewCert(exp)}
                                            className="mt-4 flex items-center gap-2 text-primary-600 font-bold text-sm hover:text-primary-700 transition-colors group/btn"
                                        >
                                            <Award size={16} /> View Internship Certificate <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                                        </button>
                                    )}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
