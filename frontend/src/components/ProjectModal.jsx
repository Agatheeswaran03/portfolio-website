import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, Layers, Zap } from 'lucide-react';

const ProjectModal = ({ selectedProject, onClose }) => {
    return (
        <AnimatePresence>
            {selectedProject && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                    ></motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative z-10 shadow-2xl border border-white/20"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 bg-slate-100/50 hover:bg-slate-200 rounded-full transition-colors z-20"
                        >
                            <X size={20} className="text-slate-600" />
                        </button>

                        <div className="p-8">
                            <span className="inline-block px-3 py-1 bg-primary-50 text-primary-700 text-xs font-bold uppercase tracking-wider rounded-full mb-4 border border-primary-100">
                                {selectedProject.status}
                            </span>

                            <h2 className="text-3xl font-bold text-slate-900 mb-2">{selectedProject.title}</h2>
                            <p className="text-slate-500 font-medium mb-6 text-lg">{selectedProject.desc}</p>

                            <div className="bg-slate-50 rounded-2xl p-6 mb-8 border border-slate-100">
                                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <Layers size={16} className="text-primary-500" /> Tech Stack
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {selectedProject.tags.map(tag => (
                                        <span key={tag} className="px-3 py-1 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-medium shadow-sm">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                                        <Zap size={20} className="text-amber-500" /> Key Features
                                    </h3>
                                    <ul className="grid gap-3">
                                        {selectedProject.features?.map((feature, i) => (
                                            <li key={i} className="flex items-start gap-3 text-slate-600">
                                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary-400 flex-shrink-0"></span>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="flex gap-4 mt-8 pt-8 border-t border-slate-100">
                                <button className="flex-1 bg-slate-900 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary-600 transition-colors">
                                    <Github size={20} /> View Code
                                </button>
                                <button className="flex-1 bg-white border-2 border-slate-200 text-slate-700 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:border-primary-500 hover:text-primary-600 transition-colors">
                                    <ExternalLink size={20} /> Live Demo
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ProjectModal;
