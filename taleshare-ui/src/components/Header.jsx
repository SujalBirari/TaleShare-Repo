import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { isAuthenticated, logout } = useAuth();

    const isAuthPage = ['/login', '/register'].includes(location.pathname);

    const [darkMode, setDarkMode] = useState(() => {
        if (typeof window !== 'undefined') {
            return document.documentElement.classList.contains('dark');
        }
        return false;
    });

    useEffect(() => {
        const root = document.documentElement;
        if (darkMode) {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode]);

    const toggleTheme = () => {
        setDarkMode((prev) => !prev);
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-50 dark:bg-gray-800/95 transition-colors duration-300">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link to="/" className="shrink-0 flex items-center">
                        <svg className="h-8 w-auto text-indigo-600 dark:text-indigo-400 transition-colors" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12.572l-4.5-4.5m0 0l-4.5 4.5m4.5-4.5v11.127a1.875 1.875 0 01-1.875 1.875H9.75a1.875 1.875 0 01-1.875-1.875V8.072m3.75 0l-4.5 4.5m4.5-4.5l4.5 4.5m-4.5-4.5V3.187m0 0A1.875 1.875 0 009.75 1.312h-3.188a1.875 1.875 0 00-1.875 1.875v3.188C4.688 7.028 5.47 7.5 6.438 7.5H7.5m3-3.75l-4.5 4.5" />
                        </svg>
                        <span className="ml-2 text-xl font-bold text-gray-800 dark:text-gray-200 transition-colors">TaleShare</span>
                    </Link>

                    <div className="flex-1 flex justify-center">
                        {isAuthenticated && !isAuthPage && (
                            <Link to="/my-tales" className="text-white font-semibold px-5 py-2 rounded-lg text-sm bg-linear-to-r from-purple-600 to-indigo-600 hover:bg-linear-to-l transition shadow-md">My Tales</Link>
                        )}
                    </div>

                    <div className="flex items-center space-x-4">
                        {!isAuthPage && (
                            <div>
                                {isAuthenticated ? (
                                    <div className="flex items-center space-x-4">
                                        <Link to="/editor" className="text-white font-semibold px-4 py-2 rounded-lg text-sm bg-linear-to-r from-purple-600 to-indigo-600 hover:bg-linear-to-l transition shadow-md">Editor</Link>
                                        <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">Logout</button>
                                    </div>
                                ) : (
                                    <div className="flex items-center space-x-4">
                                        <Link to="/login" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Login</Link>
                                        <Link to="/register" className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">Sign Up</Link>
                                    </div>
                                )}
                            </div>
                        )}

                        <button onClick={toggleTheme} className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-sm p-2.5 transition-all">
                            {darkMode ? (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                            ) : (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
                            )}
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;