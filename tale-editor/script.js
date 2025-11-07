document.addEventListener('DOMContentLoaded', () => {
    const titleInput = document.getElementById('tale-title');
    const editor = document.getElementById('tale-editor');
    const wordCountDisplay = document.getElementById('word-count-display');
    const downloadBtn = document.getElementById('download-btn');

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


    // --- Event Listeners ---

    // Update word count and save on every input
    titleInput.addEventListener('input', updateEditor);
    // --- FIX 2: Removed stray text "Example Story" ---
    editor.addEventListener('input', updateEditor);

    // Load content when the page is ready
    loadFromStorage();

    // Initial word count check on load
    updateEditor();

    console.log('TaleShare Editor v0.1 Initialized.');
});