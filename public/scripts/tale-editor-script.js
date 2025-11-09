document.addEventListener('DOMContentLoaded', () => {
    const titleInput = document.getElementById('tale-title');
    const editor = document.getElementById('tale-editor');
    const wordCountDisplay = document.getElementById('word-count-display');
    const downloadBtn = document.getElementById('download-btn');
    const saveBtn = document.getElementById('save-btn');

    const TITLE_STORAGE_KEY = 'taleShare_editor_title';
    const CONTENT_STORAGE_KEY = 'taleShare_editor_content';

    // This will hold the ID of the tale we're currently editing
    let currentTaleId = null;

    // --- Word Count and Auto-Save ---
    function updateEditor() {
        const titleText = titleInput.value;
        const editorText = editor.value;

        // Update Word Count
        if (!editorText.trim()) {
            wordCountDisplay.textContent = 'Word Count: 0';
        } else {
            const words = editorText.trim().split(/\s+/);
            wordCountDisplay.textContent = `Word Count: ${words.length}`;
        }

        // --- FIX FOR BUG 2 ---
        // Only save to localStorage if this is a NEW tale (no ID)
        if (!currentTaleId) {
            localStorage.setItem(TITLE_STORAGE_KEY, titleText);
            localStorage.setItem(CONTENT_STORAGE_KEY, editorText);
        }
    }

    // --- Persistence (Load from Storage) ---
    function loadFromStorage() {
        const savedTitle = localStorage.getItem(TITLE_STORAGE_KEY);
        const savedContent = localStorage.getItem(CONTENT_STORAGE_KEY);

        if (savedTitle) {
            titleInput.value = savedTitle;
        }
        if (savedContent) {
            editor.value = savedContent;
        }
    }

    // --- Download Tale ---
    function downloadTale() {
        // ... (this function is unchanged)
        const title = titleInput.value.trim() || 'Untitled Tale';
        const content = editor.value;
        const fileContent = `${title}\n\n${content}`;
        const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        const safeFilename = title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
        a.download = `${safeFilename}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(a.href);
    }

    // --- (NEW) Load Tale from API ---
    async function loadTale(taleId) {
        // ... (this function is unchanged from when we built it)
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Please log in to edit.');
            window.location.href = '/login';
            return;
        }
        localStorage.removeItem(TITLE_STORAGE_KEY);
        localStorage.removeItem(CONTENT_STORAGE_KEY);

        try {
            const res = await fetch(`/api/tales/${taleId}`, {
                headers: { 'x-auth-token': token }
            });
            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.msg || 'Failed to load tale.');
            }
            const tale = await res.json();
            titleInput.value = tale.title;
            editor.value = tale.content;
            updateEditor();
        } catch (err) {
            alert(`Error: ${err.message}`);
            window.location.href = '/my-tales';
        }
    }

    // --- (HEAVILY MODIFIED) Save Tale to Database ---
    async function saveTale() {
        const token = localStorage.getItem('token');
        const title = titleInput.value;
        const content = editor.value;

        if (!token) {
            alert('You must be logged in to save your work.');
            window.location.href = '/login';
            return;
        }
        if (!content.trim()) {
            alert('Cannot save an empty tale.');
            return;
        }

        // --- THIS IS THE NEW "SMART" LOGIC ---
        // 1. Determine the method and URL
        let method, url;
        if (currentTaleId) {
            // If we have an ID, we UPDATE
            method = 'PUT';
            url = `/api/tales/${currentTaleId}`;
        } else {
            // If we don't have an ID, we CREATE
            method = 'POST';
            url = '/api/tales';
        }
        // --- END OF NEW LOGIC ---

        try {
            // 2. Use the new variables in the fetch call
            const response = await fetch(url, {
                method: method, // 'POST' or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                },
                body: JSON.stringify({ title, content })
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.msg || 'Failed to save tale.');
            }

            const savedTale = await response.json();

            // 3. If this was a NEW tale, update the state
            if (!currentTaleId) {
                alert('Tale saved successfully!');
                // Store the new ID
                currentTaleId = savedTale._id;
                // Update the URL in the browser bar so the next save is an "Update"
                // This prevents creating duplicates
                window.history.pushState({}, '', `/editor?id=${currentTaleId}`);

                // Clear the local storage draft
                localStorage.removeItem(TITLE_STORAGE_KEY);
                localStorage.removeItem(CONTENT_STORAGE_KEY);
            } else {
                // This was an update, just give a quiet confirmation
                // (We could add a small "Saved!" popup here later)
                console.log('Tale updated:', savedTale._id);
            }

        } catch (err) {
            console.error('Save failed:', err);
            alert(`Error: ${err.message}`);
            if (err.message.includes('authorization denied') || err.message.includes('not valid')) {
                localStorage.removeItem('token');
                window.location.href = '/login';
            }
        }
    }


    // --- (MODIFIED) Initialization Logic ---
    function initializeEditor() {
        const urlParams = new URLSearchParams(window.location.search);
        const taleId = urlParams.get('id');

        if (taleId) {
            // Store the ID globally for this page
            currentTaleId = taleId;
            console.log('Loading tale from DB:', currentTaleId);
            loadTale(currentTaleId);
        } else {
            // This is a new tale
            console.log('Loading from localStorage (new tale)');
            loadFromStorage();
        }

        updateEditor(); // Run once on load for word count
    }

    // --- Event Listeners (FIX FOR BUG 3) ---
    titleInput.addEventListener('input', updateEditor);
    editor.addEventListener('input', updateEditor);
    downloadBtn.addEventListener('click', downloadTale);
    saveBtn.addEventListener('click', saveTale);

    // --- Run Initialization ---
    // These are the only two lines that should be here
    initializeEditor();
    console.log('TaleShare Editor v0.1 Initialized.');
});