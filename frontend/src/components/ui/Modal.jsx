import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children, maxWidth = '500px' }) => {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)',
                    zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px'
                }}
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.95, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 20 }}
                    transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
                    className="glass-card"
                    style={{ 
                        padding: '32px', maxWidth, width: '100%', 
                        backgroundColor: 'var(--color-bg-primary)', 
                        display: 'flex', flexDirection: 'column', gap: '20px',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                        border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}
                    onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-border)', paddingBottom: '16px' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, fontFamily: 'var(--font-title)' }}>{title}</h3>
                        <button
                            onClick={onClose}
                            style={{ 
                                background: 'var(--color-bg-secondary)', border: 'none', cursor: 'pointer', 
                                color: 'var(--color-text-muted)', width: '32px', height: '32px', 
                                borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                transition: 'all 0.2s ease'
                            }}
                            onMouseOver={(e) => { e.currentTarget.style.background = 'var(--color-danger)'; e.currentTarget.style.color = 'white'; }}
                            onMouseOut={(e) => { e.currentTarget.style.background = 'var(--color-bg-secondary)'; e.currentTarget.style.color = 'var(--color-text-muted)'; }}
                        >
                            <X size={16} />
                        </button>
                    </div>

                    <div style={{ position: 'relative' }}>
                        {children}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default Modal;
