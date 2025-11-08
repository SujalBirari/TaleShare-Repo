document.addEventListener('DOMContentLoaded', () => {
    const titleInput = document.getElementById('tale-title');
    const editor = document.getElementById('tale-editor');
    const wordCountDisplay = document.getElementById('word-count-display');
    const downloadBtn = document.getElementById('download-btn');
    const saveBtn = document.getElementById('save-btn');

    const TITLE_STORAGE_KEY = 'taleShare_editor_title';
    const CONTENT_STORAGE_KEY = 'taleShare_editor_content';

    // --- Word Count and Auto-Save ---
    function updateEditor() {
        // Get content
        const titleText = titleInput.value;
        const editorText = editor.value;

        // Update Word Count
        if (!editorText.trim()) {
            wordCountDisplay.textContent = 'Word Count: 0';
        } else {
            const words = editorText.trim().split(/\s+/);
            wordCountDisplay.textContent = `Word Count: ${words.length}`;
        }

        // Auto-Save to Local Storage
        localStorage.setItem(TITLE_STORAGE_KEY, titleText);
        localStorage.setItem(CONTENT_STORAGE_KEY, editorText);
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
        const title = titleInput.value.trim() || 'Untitled Tale';
        const content = editor.value;

        // Create the file content (Title + 2 newlines + content)
        const fileContent = `${title}\n\n${content}`;

        // Create a blob
        const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });

        // Create a temporary link to trigger the download
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);

        // Sanitize title for filename
        const safeFilename = title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
        a.download = `${safeFilename}.txt`;

        // Trigger download
        document.body.appendChild(a);
        a.click();

        // Clean up
        document.body.removeChild(a);
        URL.revokeObjectURL(a.href);
    }

    // --- Save Tale to Database ---
    async function saveTale() {
        // Get the token from localStorage
        const token = localStorage.getItem('token');

        // Get the content
        const title = titleInput.value;
        const content = editor.value;

        // Check for token
        if (!token) {
            alert('You must be logged in to save your work.');
            // Redirect to login, as the user shouldn't be here 
            return;
        }

        // Check for content
        if (!content.trim()) {
            alert('Cannot save an empty tale.');
            return;
        }

        try {
            // Send the data to the protected API
            const response = await fetch('/api/tales', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                },
                body: JSON.stringify({ title, content })
            });

            if (!response.ok) {
                // Handle errors from the server 
                const errData = await response.json();
                throw new Error(errData.msg || 'Failed to save tale.');
            }

            // Success!
            const savedTale = await response.json();
            alert('Tale saved successfully!');

            // store the new 'tale._id' for future updates
            console.log('Tale saved with ID:', savedTale._id);

        } catch (err) {
            console.error('Save failed:', err);
            alert(`Error: ${err.message}`);
            if (err.message.includes('authorization denied') || err.message.includes('not valid')) {
                // If token is bad, log them out
                localStorage.removeItem('token');
                window.location.href = '/login';
            }
        }
    }

    // --- Event Listeners ---

    // Update word count and save on every input
    titleInput.addEventListener('input', updateEditor);
    editor.addEventListener('input', updateEditor);

    // Load content when the page is ready
    loadFromStorage();

    // Initial word count check on load
    updateEditor();

    // Trigger download on button click
    downloadBtn.addEventListener('click', downloadTale);

    saveBtn.addEventListener('click', saveTale);

    console.log('TaleShare Editor v0.1 Initialized.');
});