import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Terminal, Brain, Sparkles } from 'lucide-react';
import { skills } from '../data';

const Skills = () => {
    return (
        <section id="skills" className="py-24 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-100/40 via-transparent to-transparent opacity-70"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-primary-600 dark:text-primary-400 font-bold tracking-wider uppercase text-sm bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm px-4 py-1.5 rounded-full border border-primary-200 dark:border-primary-900 shadow-sm">My Arsenal</span>
                    <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white mt-4 tracking-tight">Technical Expertise</h2>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {skills.map((category, idx) => {
                        let IconComponent;
                        let bgClass;
                        if (category.title === "Frontend") {
                            IconComponent = <Code2 />;
                            bgClass = "from-blue-500 to-cyan-500";
                        } else if (category.title === "Backend") {
                            IconComponent = <Terminal />;
                            bgClass = "from-emerald-500 to-green-500";
                        } else {
                            IconComponent = <Brain />;
                            bgClass = "from-purple-500 to-pink-500";
                        }

                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.15, type: "spring", stiffness: 50 }}
                                whileHover={{ y: -10, rotateX: 5, rotateY: 5, scale: 1.02 }}
                                className="relative group perspective-1000"
                            >
                                {/* Blur Glow Effect */}
                                <div className={`absolute -inset-0.5 bg-gradient-to-r ${bgClass} rounded-2xl opacity-20 blur-xl group-hover:opacity-60 transition duration-500`}></div>

                                <div className="relative h-full glass-card p-8 rounded-2xl border border-white/60 dark:border-slate-700 shadow-xl flex flex-col bg-white/40 dark:bg-slate-800/40 backdrop-blur-md">
                                    <div className={`w-14 h-14 bg-gradient-to-br ${bgClass} rounded-xl flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                        {React.cloneElement(IconComponent, { size: 28 })}
                                    </div>

                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                                        {category.title}
                                        <Sparkles size={16} className="text-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </h3>

                                    <div className="w-12 h-1 bg-gradient-to-r from-slate-200 dark:from-slate-700 to-transparent mb-6 group-hover:from-primary-400 group-hover:to-primary-200 transition-all duration-300"></div>

                                    <div className="flex flex-wrap gap-2.5">
                                        {category.skills.map((skill) => (
                                            <span
                                                key={skill}
                                                className="px-3 py-1.5 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-sm rounded-lg font-semibold border border-white/50 dark:border-slate-600 shadow-sm group-hover:border-primary-200 dark:group-hover:border-primary-700 group-hover:text-primary-700 dark:group-hover:text-primary-300 group-hover:shadow-md transition-all cursor-default"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Skills;
