import { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/apiService';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                setUser({ token });
            }
            setLoading(false);
        };
        checkAuth();
    }, []);

    const login = async (email, password) => {
        const response = await api.post('/auth/login', { email, password });
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            setUser({ token: response.data.token });
        }
        return response;
    };

    // UPDATED: Auto-login if registration doesn't return a token
    const register = async (email, password) => {
        const response = await api.post('/auth/register', { email, password });

        // Case 1: Backend sends token immediately
        if (response.data.token) {
            console.log("Register returned token directly.");
            localStorage.setItem('token', response.data.token);
            setUser({ token: response.data.token });
        }
        // Case 2: Backend just says "Success" -> We must Auto-Login
        else {
            console.log("Register successful (no token). Attempting auto-login...");
            await login(email, password);
        }
        return response;
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    const value = {
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export default AuthContext;