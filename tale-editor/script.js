document.addEventListener('DOMContentLoaded', () => {
    const titleInput = document.getElementById('tale-title');
    const editor = document.getElementById('tale-editor');
    const wordCountDisplay = document.getElementById('word-count-display');
    const downloadBtn = document.getElementById('download-btn');

    // --- Word Count and Auto-Save ---
    function updateEditor() {
        // 1. Get content
        const titleText = titleInput.value;
        const editorText = editor.value;

        // 2. Update Word Count
        if (!editorText.trim()) {
            wordCountDisplay.textContent = 'Word Count: 0';
        } else {
            const words = editorText.trim().split(/\s+/);
            wordCountDisplay.textContent = `Word Count: ${words.length}`;
        }
    }

    // --- Event Listeners ---

    // Update word count and save on every input
    titleInput.addEventListener('input', updateEditor);
    // --- FIX 2: Removed stray text "Example Story" ---
    editor.addEventListener('input', updateEditor);


    // Initial word count check on load
    updateEditor();

    console.log('TaleShare Editor v0.1 (Fixed) Initialized.');
});