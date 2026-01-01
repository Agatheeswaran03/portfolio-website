import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Database, Brain, Mail } from 'lucide-react';

const Hero = () => {
    return (
        <section id="home" className="min-h-screen flex items-center pt-20 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute top-20 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                    {/* Text Content */}
                    <motion.div
                        className="flex-1 text-center lg:text-left"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-block px-4 py-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full border border-primary-200 dark:border-primary-900 mb-6 shadow-sm">
                            <span className="text-primary-600 dark:text-primary-400 font-bold tracking-wider text-sm uppercase">Available for work</span>
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 dark:text-white leading-tight mb-6">
                            Building <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">Digital</span> <br />
                            <span className="relative inline-block">
                                Experiences
                                <div className="absolute bottom-2 left-0 w-full h-3 bg-primary-200/50 dark:bg-primary-900/50 -z-10 transform -rotate-2"></div>
                            </span>
                        </h1>
                        <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
                            I transform complex problems into elegant, user-centric web solutions using the power of MERN stack and Artificial Intelligence.
                        </p>
                        <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                            <a href="#projects" className="px-8 py-4 bg-primary-600 text-white rounded-full font-bold hover:bg-primary-700 transition-all hover:scale-105 shadow-lg shadow-primary-500/30 flex items-center gap-2">
                                View My Work
                            </a>
                            <a href="#contact" className="px-8 py-4 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-200 border-2 border-slate-100 dark:border-slate-700 rounded-full font-bold hover:border-primary-200 dark:hover:border-primary-800 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all hover:scale-105 shadow-sm">
                                Contact Me
                            </a>
                        </div>

                        {/* Social Links */}
                        <div className="mt-10 flex items-center justify-center lg:justify-start gap-6">
                            <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Connect</span>
                            <div className="h-px w-12 bg-slate-200 dark:bg-slate-700"></div>
                            <div className="flex gap-4">
                                <a href="https://github.com/Agatheeswaran03" target="_blank" rel="noopener noreferrer" className="p-2 bg-white dark:bg-slate-800 rounded-full hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-100 dark:border-slate-700 shadow-sm transition-transform hover:-translate-y-1">
                                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub" className="w-6 h-6 opacity-80" />
                                </a>
                                <a href="https://www.linkedin.com/in/agatheeswaran03" target="_blank" rel="noopener noreferrer" className="p-2 bg-white dark:bg-slate-800 rounded-full hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-100 dark:border-slate-700 shadow-sm transition-transform hover:-translate-y-1">
                                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" alt="LinkedIn" className="w-6 h-6" />
                                </a>
                                <a href="https://www.instagram.com/agathees__/" target="_blank" rel="noopener noreferrer" className="p-2 bg-white dark:bg-slate-800 rounded-full hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-100 dark:border-slate-700 shadow-sm transition-transform hover:-translate-y-1">
                                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="url(#instagram-gradient)">
                                        <defs>
                                            <linearGradient id="instagram-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                                                <stop offset="0%" style={{ stopColor: '#FED373', stopOpacity: 1 }} />
                                                <stop offset="25%" style={{ stopColor: '#F15245', stopOpacity: 1 }} />
                                                <stop offset="50%" style={{ stopColor: '#D92E7F', stopOpacity: 1 }} />
                                                <stop offset="75%" style={{ stopColor: '#9B36B7', stopOpacity: 1 }} />
                                                <stop offset="100%" style={{ stopColor: '#515ECF', stopOpacity: 1 }} />
                                            </linearGradient>
                                        </defs>
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </motion.div>

                    {/* 3D Glass Card Effect */}
                    <motion.div
                        className="flex-1 flex justify-center lg:justify-end"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="relative w-80 h-80 lg:w-[450px] lg:h-[450px] animate-float">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob"></div>
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-300 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-2000"></div>
                            <div className="relative glass-card rounded-3xl p-8 shadow-2xl h-full flex flex-col justify-center items-center text-center border-t border-l border-white/80">
                                <div className="w-32 h-32 bg-gradient-to-br from-primary-100 to-white rounded-full flex items-center justify-center shadow-inner mb-6 ring-4 ring-white/50 overflow-hidden">
                                    <img src="/image/profile_new.jpg" alt="Agatheeswaran" className="w-full h-full object-cover" />
                                </div>
                                <h3 className="text-3xl font-bold text-slate-800 dark:text-slate-900">Agatheeswaran</h3>
                                <p className="text-primary-700 mt-2 font-bold tracking-wide">Full Stack & AI Developer</p>
                                <div className="mt-8 flex gap-3">
                                    <div className="glass-card p-3 rounded-2xl border border-white hover:border-primary-200 transition-colors shadow-sm bg-white/50"><Code2 className="text-blue-500" /></div>
                                    <div className="glass-card p-3 rounded-2xl border border-white hover:border-primary-200 transition-colors shadow-sm bg-white/50"><Database className="text-green-500" /></div>
                                    <div className="glass-card p-3 rounded-2xl border border-white hover:border-primary-200 transition-colors shadow-sm bg-white/50"><Brain className="text-purple-500" /></div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
