import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { API_URL } from '../config';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [scrolled, setScrolled] = useState(false);
    const [resumeUrl, setResumeUrl] = useState('/resume.html'); // Default fallback

    useEffect(() => {
        const fetchResume = async () => {
            try {
                const res = await axios.get(`${API_URL}/api/profile`);
                if (res.data.resumeUrl) {
                    setResumeUrl(res.data.resumeUrl);
                }
            } catch (err) {
                console.error('Failed to fetch resume settings', err);
            }
        };
        fetchResume();

        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
            const sections = ['home', 'about', 'skills', 'experience', 'certifications', 'projects', 'contact'];
            const scrollPosition = window.scrollY + 100;

            sections.forEach(section => {
                const element = document.getElementById(section);
                if (element) {
                    const offsetTop = element.offsetTop;
                    const height = element.offsetHeight;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
                        setActiveSection(section);
                    }
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { name: 'Home', id: 'home' },
        { name: 'About', id: 'about' },
        { name: 'Skills', id: 'skills' },
        { name: 'Experience', id: 'experience' },
        { name: 'Certifications', id: 'certifications' },
        { name: 'Projects', id: 'projects' },
        { name: 'Contact', id: 'contact' }
    ];

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass-nav py-3' : 'bg-transparent py-5'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <motion.a
                        href="#home"
                        className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent italic"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        Agatheeswaran
                    </motion.a>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navItems.map((item, i) => (
                            <motion.a
                                key={item.name}
                                href={`#${item.id}`}
                                className={`text-sm font-medium transition-colors duration-300 relative group ${activeSection === item.id ? 'text-primary-600 font-bold' : 'text-slate-600 hover:text-primary-500'}`}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                            >
                                {item.name}
                                <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary-500 transition-all duration-300 ${activeSection === item.id ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                            </motion.a>
                        ))}
                        <ThemeToggle />
                        <motion.a
                            href={resumeUrl}
                            target="_blank"
                            className="px-5 py-2.5 bg-slate-900 dark:bg-primary-500 text-white text-sm font-bold rounded-full hover:bg-primary-600 dark:hover:bg-primary-600 hover:scale-105 transition-all shadow-lg"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.8 }}
                        >
                            Download CV
                        </motion.a>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center gap-4">
                        <ThemeToggle />
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-slate-600 dark:text-slate-300 hover:text-primary-600 focus:outline-none transition-colors"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="md:hidden glass-nav border-t border-slate-100"
                >
                    <div className="px-4 pt-2 pb-6 space-y-1 shadow-lg">
                        {navItems.map((item) => (
                            <a
                                key={item.name}
                                href={`#${item.id}`}
                                onClick={() => setIsMenuOpen(false)}
                                className="block px-4 py-3 rounded-lg text-base font-medium text-slate-700 hover:bg-primary-50 hover:text-primary-600"
                            >
                                {item.name}
                            </a>
                        ))}
                    </div>
                </motion.div>
            )}
        </nav>
    );
};

export default Navbar;
