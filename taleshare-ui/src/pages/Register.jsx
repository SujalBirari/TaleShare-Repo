import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
    const navigate = useNavigate();
    const { register } = useAuth();

    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            // 1. Call the register function from AuthContext
            await register(formData.email, formData.password);

            // 2. CHECK: Did we get a token?
            // If the backend returned a token, the AuthContext saved it to localStorage.
            if (localStorage.getItem('token')) {
                console.log("Auto-login successful, redirecting to My Tales...");
                navigate('/my-tales'); // <--- REDIRECT TO DASHBOARD
            } else {
                // Fallback: If backend requires email verification or didn't send a token
                console.log("No token returned, redirecting to Login...");
                navigate('/login');
            }

        } catch (err) {
            console.error("Registration Flow Error:", err);
            if (!err.response) {
                setError("Network Error: Server unreachable or CORS blocked.");
            } else {
                setError(err.response?.data?.msg || 'Registration failed. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex-1 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
            <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 dark:bg-gray-800 transition-colors duration-300">
                <h2 className="text-center text-3xl font-extrabold text-gray-900 dark:text-gray-100 mb-6">
                    Create your account
                </h2>

                <form id="register-form" className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email address</label>
                        <div className="mt-1">
                            <input id="email" name="email" type="email" autoComplete="email" required value={formData.email} onChange={handleChange} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                        <div className="mt-1">
                            <input id="password" name="password" type="password" autoComplete="new-password" required value={formData.password} onChange={handleChange} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" />
                        </div>
                    </div>

                    {error && <div className="text-red-600 text-sm text-center bg-red-50 dark:bg-red-900/20 p-2 rounded font-bold border border-red-200">{error}</div>}

                    <div>
                        <button type="submit" disabled={isLoading} className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}>
                            {isLoading ? 'Creating Account...' : 'Sign Up'}
                        </button>
                    </div>
                </form>

                <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
                    Already have an account? <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">Log In</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;