import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const CertificateModal = ({ selectedCert, setSelectedCert }) => {
    if (!selectedCert) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
                onClick={() => setSelectedCert(null)}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden relative shadow-2xl flex flex-col md:flex-row"
                    onClick={e => e.stopPropagation()}
                >
                    {/* Left: Image */}
                    <div className="md:w-2/3 bg-slate-100 flex items-center justify-center p-4 md:p-8 overflow-auto">
                        <img src={selectedCert.image} alt={selectedCert.title} className="max-w-full rounded shadow-lg border border-slate-200" />
                    </div>
                    {/* Right: Details */}
                    <div className="md:w-1/3 p-6 md:p-8 bg-white border-l border-slate-100 flex flex-col">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="font-bold text-xl text-slate-900">{selectedCert.title}</h3>
                            <button onClick={() => setSelectedCert(null)} className="p-1 hover:bg-slate-100 rounded-full transition-colors">
                                <X size={24} className="text-slate-400" />
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Issuer</label>
                                <p className="text-slate-700 font-medium">{selectedCert.issuer}</p>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Date</label>
                                <p className="text-slate-700 font-medium">{selectedCert.date}</p>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Type</label>
                                <p className="text-primary-600 font-medium bg-primary-50 inline-block px-2 py-1 rounded mt-1">{selectedCert.type}</p>
                            </div>
                        </div>
                        <div className="mt-auto pt-8">
                            <button onClick={() => setSelectedCert(null)} className="w-full py-3 border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 font-medium transition-colors">
                                Close Preview
                            </button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default CertificateModal;
