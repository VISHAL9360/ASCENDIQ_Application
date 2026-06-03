import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
    const { user } = useAuth();
    const location = useLocation();

    return (
        <div className="min-h-screen" style={{ backgroundColor: 'transparent' }}>
            <Navbar />
            <div style={{ display: 'flex' }}>
                {user && <Sidebar />}
                <main 
                    style={{ 
                        flex: 1, 
                        padding: '2rem', 
                        paddingTop: 'calc(var(--header-height) + 2rem)',
                        marginLeft: user ? 'var(--sidebar-width)' : '0',
                        transition: 'var(--transition)',
                        minHeight: '100vh',
                        position: 'relative',
                        zIndex: 1
                    }}
                >
                    <AnimatePresence mode="wait">
                        <motion.div 
                            key={location.pathname}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                            style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}
                        >
                            {children}
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>
        </div>
    );
};

export default Layout;

