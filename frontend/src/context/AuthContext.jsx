import { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (userInfo) {
            setUser(userInfo);
        }
        setLoading(false);
    }, []);

    const login = async (username, password) => {
        const { data } = await api.post('/auth/signin', { username, password });
        // Spring Boot returns roles as an array like ["ROLE_STUDENT"]
        // Frontend expects a role string like "student"
        const role = data.roles[0].replace('ROLE_', '').toLowerCase();
        const userData = { ...data, role };
        localStorage.setItem('userInfo', JSON.stringify(userData));
        setUser(userData);
        return userData;
    };

    const googleLogin = async (tokenId) => {
        const { data } = await api.post('/auth/google', { tokenId });
        const role = data.roles[0].replace('ROLE_', '').toLowerCase();
        const userData = { ...data, role };
        localStorage.setItem('userInfo', JSON.stringify(userData));
        setUser(userData);
        return userData;
    };

    const register = async (username, email, password, role) => {
        // Handle if role is passed as a string or array
        const roleArray = Array.isArray(role) ? role : [role];
        const { data } = await api.post('/auth/signup', { 
            username, 
            email, 
            password, 
            role: roleArray.map(r => r.toLowerCase()) 
        });
        return data;
    };

    const logout = () => {
        localStorage.removeItem('userInfo');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, googleLogin, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
