import React from 'react';
import { motion } from 'framer-motion';
import { Award, BookOpen, Code, Star } from 'lucide-react';

const About = () => {
    return (
        <section id="about" className="py-24 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-20 left-0 w-96 h-96 bg-primary-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute bottom-20 right-0 w-96 h-96 bg-purple-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-primary-600 dark:text-primary-400 font-bold tracking-wider uppercase text-sm bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm px-4 py-1.5 rounded-full border border-primary-200 dark:border-primary-900 shadow-sm">Who Am I</span>
                    <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white mt-4 tracking-tight">About Me</h2>
                </motion.div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* Bio Card (Large - Spans 2 cols) */}
                    <motion.div
                        className="md:col-span-2 glass-card p-8 rounded-3xl border border-white/60 dark:border-slate-700 shadow-xl relative overflow-hidden group bg-white/40 dark:bg-slate-800/40"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                            <BookOpen size={120} className="text-primary-900 dark:text-primary-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-3">
                            <span className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center text-white text-sm">01</span>
                            My Journey
                        </h3>
                        <div className="space-y-4 text-slate-600 dark:text-slate-300 text-lg leading-relaxed font-medium">
                            <p>
                                Hello! I'm <span className="text-slate-900 dark:text-white font-bold">Agatheeswaran</span>, a passionate developer.
                                I recently graduated from <span className="text-primary-700 dark:text-primary-400 font-bold bg-primary-50 dark:bg-primary-900/30 px-1 rounded">M.A.M College of Engineering and Technology</span>.
                            </p>
                            <p>
                                I don't just write code; I craft <span className="italic text-slate-800 dark:text-slate-200">experiences</span>. My journey started with simple HTML pages and has evolved into building complex, AI-integrated web applications using the MERN stack.
                            </p>
                            <p>
                                I love deconstructing complex problems and rebuilding them into elegant, scalable solutions.
                            </p>
                        </div>
                    </motion.div>

                    {/* Stats Card (CGPA) */}
                    <motion.div
                        className="glass-card p-8 rounded-3xl border border-white/60 dark:border-slate-700 shadow-xl flex flex-col justify-center items-center text-center group bg-white/40 dark:bg-slate-800/40"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        whileHover={{ y: -5 }}
                    >
                        <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-2xl flex items-center justify-center text-white shadow-lg mb-4 transform rotate-3 group-hover:rotate-6 transition-transform">
                            <Award size={32} />
                        </div>
                        <h4 className="text-5xl font-extrabold text-slate-800 dark:text-white mb-1">8.0</h4>
                        <p className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">CGPA (Honors)</p>
                    </motion.div>

                    {/* Stats Card (Projects) */}
                    <motion.div
                        className="glass-card p-8 rounded-3xl border border-white/60 dark:border-slate-700 shadow-xl flex flex-col justify-center items-center text-center group bg-white/40 dark:bg-slate-800/40"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        whileHover={{ y: -5 }}
                    >
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg mb-4 transform -rotate-3 group-hover:-rotate-6 transition-transform">
                            <Code size={32} />
                        </div>
                        <h4 className="text-5xl font-extrabold text-slate-800 dark:text-white mb-1">5+</h4>
                        <p className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Projects Built</p>
                    </motion.div>

                    {/* Highlights Card (Wide - Spans 2 cols) */}
                    <motion.div
                        className="md:col-span-2 glass-card p-8 rounded-3xl border border-white/60 dark:border-slate-700 shadow-xl relative overflow-hidden bg-white/40 dark:bg-slate-800/40"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                    >
                        <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-3">
                            <span className="w-8 h-8 bg-slate-800 dark:bg-slate-700 rounded-lg flex items-center justify-center text-white text-sm">02</span>
                            Key Highlights
                        </h3>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {[
                                "B.Tech Information Technology (2023-2027)",
                                "Passed with Honors (Anna University)",
                                "Full Stack Intern at Pantech Solutions",
                                // ... items
                                "Certified in Python & ChatGPT by GUVI",
                                "Specialized in AI & Machine Learning"
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3 bg-white/50 dark:bg-slate-900/50 p-3 rounded-xl border border-white/40 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 hover:border-primary-200 dark:hover:border-primary-800 transition-colors">
                                    <Star size={18} className="text-yellow-500 fill-yellow-500" />
                                    <span className="text-slate-700 dark:text-slate-300 font-medium text-sm">{item}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default About;
