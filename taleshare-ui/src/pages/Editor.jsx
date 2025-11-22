import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import api from '../services/apiService';

const Editor = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    // State
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [taleId, setTaleId] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [statusMsg, setStatusMsg] = useState('');
    const [statusType, setStatusType] = useState(''); // 'success' or 'error'

    // Constants
    const TITLE_STORAGE_KEY = 'taleShare_editor_title';
    const CONTENT_STORAGE_KEY = 'taleShare_editor_content';

    // Derived State (Word Count)
    const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;

    // --- 1. Initialization Effect ---
    useEffect(() => {
        const idFromUrl = searchParams.get('id');

        if (idFromUrl) {
            // LOAD EXISTING TALE
            setTaleId(idFromUrl);
            loadTale(idFromUrl);
        } else {
            // LOAD DRAFT FROM STORAGE
            const savedTitle = localStorage.getItem(TITLE_STORAGE_KEY);
            const savedContent = localStorage.getItem(CONTENT_STORAGE_KEY);
            if (savedTitle) setTitle(savedTitle);
            if (savedContent) setContent(savedContent);
        }
    }, [searchParams]);

    // --- 2. Auto-Save Draft Effect ---
    useEffect(() => {
        if (!taleId) {
            localStorage.setItem(TITLE_STORAGE_KEY, title);
            localStorage.setItem(CONTENT_STORAGE_KEY, content);
        }
    }, [title, content, taleId]);

    // --- Helper Functions ---

    const loadTale = async (id) => {
        try {
            setStatusMsg('Loading...');
            const response = await api.get(`/tales/${id}`);
            const { title, content } = response.data;
            setTitle(title);
            setContent(content);
            setStatusMsg('Loaded successfully.');
            setStatusType('success');

            localStorage.removeItem(TITLE_STORAGE_KEY);
            localStorage.removeItem(CONTENT_STORAGE_KEY);
        } catch (err) {
            console.error("Load Error:", err);
            setStatusMsg('Failed to load tale. ' + (err.response?.data?.msg || ''));
            setStatusType('error');
        }
    };

    const handleSave = async () => {
        if (!content.trim()) {
            setStatusMsg('Cannot save an empty tale.');
            setStatusType('error');
            return;
        }

        setIsSaving(true);
        setStatusMsg('Saving...');
        setStatusType('');

        try {
            let response;
            if (taleId) {
                // UPDATE existing
                response = await api.put(`/tales/${taleId}`, { title, content });
                setStatusMsg('Tale updated successfully.');
            } else {
                // CREATE new
                response = await api.post('/tales', { title, content });
                const newTale = response.data;

                setTaleId(newTale._id);
                setSearchParams({ id: newTale._id });

                localStorage.removeItem(TITLE_STORAGE_KEY);
                localStorage.removeItem(CONTENT_STORAGE_KEY);

                setStatusMsg('Tale created successfully!');
            }
            setStatusType('success');
        } catch (err) {
            console.error("Save Error:", err);
            if (err.response?.status === 401) {
                setStatusMsg('Please login to save.');
            } else {
                setStatusMsg('Save failed. ' + (err.response?.data?.msg || err.message));
            }
            setStatusType('error');
        } finally {
            setIsSaving(false);
        }
    };

    const handleDownload = () => {
        const safeTitle = (title.trim() || 'Untitled Tale');
        const fileContent = `${safeTitle}\n\n${content}`;
        const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        const filename = safeTitle.replace(/[^a-z0-9]/gi, '_').toLowerCase();
        a.download = `${filename}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 transition-colors duration-300">
            <div className="flex flex-col md:flex-row md:space-x-8 h-full">

                {/* LEFT COLUMN: EDITOR */}
                <div className="flex-1 mb-8 md:mb-0">
                    <div className="w-full bg-white rounded-lg shadow-lg p-8 md:p-12 lg:p-16 min-h-[80vh] dark:bg-gray-900 transition-colors duration-300">
                        {/* Title Input */}
                        <input
                            type="text"
                            placeholder="Your Tale's Title..."
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            // ADDED: 'text-gray-900 bg-transparent' explicitly for Light Mode
                            className="w-full text-3xl md:text-4xl mb-6 pb-2 border-b-2 border-gray-200 focus:border-indigo-500 focus:outline-none text-gray-900 bg-transparent placeholder-gray-400 dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-500 font-serif-display font-medium transition-colors"
                        />

                        {/* Text Area */}
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            // ADDED: 'text-gray-900 bg-transparent' explicitly for Light Mode
                            className="w-full h-auto min-h-[60vh] focus:ring-0 text-gray-900 bg-transparent placeholder-gray-400 dark:text-gray-300 dark:placeholder-gray-500 font-serif-body text-lg leading-relaxed resize-none border-none outline-none focus:outline-none transition-colors"
                            placeholder="Once upon a time..."
                        />
                    </div>
                </div>

                {/* RIGHT COLUMN: SIDEBAR */}
                <aside className="w-full md:w-64">
                    <div className="sticky top-24 space-y-6">

                        {/* Word Count Card */}
                        <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-4 transition-colors duration-300">
                            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                                Word Count
                            </h3>
                            <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                                {wordCount}
                            </p>
                        </div>

                        {/* Actions Card */}
                        <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-4 transition-colors duration-300">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Actions</h3>
                            <div className="flex flex-col space-y-4">
                                <button
                                    onClick={handleSave}
                                    disabled={isSaving}
                                    className={`w-full bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors ${isSaving ? 'opacity-70 cursor-wait' : ''}`}
                                >
                                    {isSaving ? 'Saving...' : 'Save'}
                                </button>
                                <button
                                    onClick={handleDownload}
                                    className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
                                >
                                    Download Tale
                                </button>
                            </div>

                            {statusMsg && (
                                <div className={`mt-4 p-2 rounded text-sm text-center ${statusType === 'error' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'}`}>
                                    {statusMsg}
                                </div>
                            )}
                        </div>

                    </div>
                </aside>
            </div>
        </div>
    );
};

export default Editor;