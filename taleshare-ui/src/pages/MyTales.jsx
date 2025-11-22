import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/apiService';

const MyTales = () => {
    const navigate = useNavigate();
    const [tales, setTales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTales = async () => {
            try {
                // Ensure token exists before asking
                const token = localStorage.getItem('token');
                console.log("Fetching tales with token:", token);

                const response = await api.get('/tales');
                setTales(response.data);
                setError(null);
            } catch (err) {
                console.error("Fetch error details:", err);

                if (err.response?.status === 401) {
                    // Display helpful debug message instead of instant redirect
                    setError("Unauthorized (401). Token invalid or expired. Check console.");
                    // navigate('/login'); 
                } else {
                    setError(err.response?.data?.msg || 'Failed to load your tales.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchTales();
    }, [navigate]);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to permanently delete this tale?')) {
            return;
        }
        try {
            await api.delete(`/tales/${id}`);
            setTales(tales.filter(tale => tale._id !== id));
        } catch (err) {
            console.error("Delete error:", err);
            alert("Failed to delete tale: " + (err.response?.data?.msg || err.message));
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric'
        });
    };

    const getSnippet = (content) => {
        if (!content) return '';
        return content.substring(0, 100) + (content.length > 100 ? '...' : '');
    };

    return (
        <div className="flex-1 w-full max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100">My Tales</h1>
                <Link to="/editor" className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors shadow-sm">+ New Tale</Link>
            </div>
            {loading && <p className="text-gray-500 dark:text-gray-400 text-center py-10">Loading your library...</p>}

            {/* Error Display */}
            {error && <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 mb-6"><p className="text-red-700 dark:text-red-300">{error}</p></div>}

            {!loading && !error && tales.length === 0 && (
                <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    <p className="mt-4 text-gray-500 dark:text-gray-400">You haven't saved any tales yet.</p>
                    <Link to="/editor" className="mt-2 inline-block text-indigo-600 hover:underline dark:text-indigo-400 dark:hover:text-indigo-300 font-medium">Start writing your first story!</Link>
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tales.map((tale) => (
                    <div key={tale._id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col justify-between hover:shadow-lg transition-shadow duration-300 border border-transparent hover:border-gray-200 dark:hover:border-gray-700">
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-2 dark:text-gray-100">{tale.title || 'Untitled Tale'}</h2>
                            <p className="text-gray-600 mb-4 line-clamp-3 dark:text-gray-400 font-serif-body">{getSnippet(tale.content)}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 mb-4 dark:text-gray-500 uppercase tracking-wide font-semibold">{formatDate(tale.createdDate)}</p>
                            <div className="flex items-center space-x-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                                <Link to={`/editor?id=${tale._id}`} className="text-sm font-medium text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 flex items-center">Edit</Link>
                                <span className="text-gray-300 dark:text-gray-600">|</span>
                                <button onClick={() => handleDelete(tale._id)} className="text-sm font-medium text-red-600 hover:text-red-800 dark:text-red-500 dark:hover:text-red-400 flex items-center">Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyTales;