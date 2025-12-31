import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code2 } from 'lucide-react';
import axios from 'axios';
import ProjectModal from './ProjectModal';
import { API_URL } from '../config';

const Projects = () => {
    const [selectedProject, setSelectedProject] = useState(null);
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await axios.get(`${API_URL}/api/projects`);
                setProjects(res.data);
            } catch (err) {
                console.error("Error fetching projects:", err);
            }
        };
        fetchProjects();
    }, []);

    return (
        <section id="projects" className="py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white">Featured Projects</h2>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, i) => (
                        <motion.div
                            key={project._id}
                            layoutId={`project-${i}`}
                            onClick={() => setSelectedProject(project)}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="glass-card p-8 rounded-2xl hover:border-primary-300 hover:shadow-xl hover:shadow-primary-500/10 transition-all group bg-white/60 dark:bg-slate-800/60 dark:border-slate-700 cursor-pointer"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl text-slate-500 dark:text-slate-400 group-hover:bg-primary-50 dark:group-hover:bg-primary-900/30 group-hover:text-primary-600 transition-colors shadow-sm">
                                    <Code2 size={24} />
                                </div>
                                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full border ${project.status === 'Live' ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800' : 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-800'}`}>
                                    {project.status}
                                </span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-primary-600 transition-colors">{project.title}</h3>
                            <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm leading-relaxed line-clamp-3">{project.desc}</p>
                            <div className="flex flex-wrap gap-2 border-t border-slate-100 dark:border-slate-700 pt-4">
                                {project.tags.map(tag => (
                                    <span key={tag} className="text-xs font-semibold px-2.5 py-1 bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 rounded-md border border-slate-100 dark:border-slate-800 shadow-sm">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <ProjectModal selectedProject={selectedProject} onClose={() => setSelectedProject(null)} />
        </section>
    );
};

export default Projects;

