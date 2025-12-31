import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

// Components
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Experience from '../components/Experience';
import Certifications from '../components/Certifications';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import CertificateModal from '../components/CertificateModal';

function Home() {
    const [selectedCert, setSelectedCert] = useState(null);
    const [showScrollTop, setShowScrollTop] = useState(false);

    // Toggle Scroll-to-Top button
    useEffect(() => {
        const checkScroll = () => {
            setShowScrollTop(window.scrollY > 400);
        };
        window.addEventListener('scroll', checkScroll);
        return () => window.removeEventListener('scroll', checkScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen font-sans text-slate-800 dark:text-slate-200 selection:bg-primary-500 selection:text-white bg-slate-50/30 dark:bg-slate-900 transition-colors duration-300">

            <Navbar />

            <main>
                <Hero />
                <About />
                <Skills />
                <Experience setSelectedCert={setSelectedCert} />
                <Certifications setSelectedCert={setSelectedCert} />
                <Projects />
                <Contact />
            </main>

            <Footer />

            {/* Modal Popup */}
            <CertificateModal selectedCert={selectedCert} setSelectedCert={setSelectedCert} />

            {/* Scroll To Top Button */}
            <AnimatePresence>
                {showScrollTop && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        onClick={scrollToTop}
                        className="fixed bottom-8 right-8 p-3 bg-white/80 backdrop-blur-md border border-primary-200 text-primary-600 rounded-full shadow-lg hover:bg-primary-500 hover:text-white transition-all z-40 group"
                    >
                        <ArrowUp size={24} className="group-hover:-translate-y-1 transition-transform" />
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
}

export default Home;
