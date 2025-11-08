document.addEventListener('DOMContentLoaded', async () => {
    // Get the token 
    const token = localStorage.getItem('token');

    // Protect the page
    if (!token) {
        window.location.href = '/login';
        return;
    }

    // Get the HTML elements we need to manipulate
    const talesListContainer = document.getElementById('tales-list');
    const loadingMessage = document.getElementById('loading-message');

    try {
        // Fetch the user's tales from the protected API
        const response = await fetch('/api/tales', {
            method: 'GET',
            headers: {
                'x-auth-token': token,
                'Content-Type': 'application/json',
            },
        });

        // Handle errors
        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.msg || 'Failed to fetch tales');
        }

        // Get the data
        const tales = await response.json();

        // Clear the "Loading..." message
        if (loadingMessage) {
            loadingMessage.remove();
        }

        // Render the tales
        if (tales.length === 0) {
            // Show a message if the user has no tales
            talesListContainer.innerHTML = '<p class="text-gray-500">You haven\'t saved any tales yet. <a href="/editor" class="text-indigo-600 hover:underline">Start writing!</a></p>';
        } else {
            // Loop through each tale and create a "card" for it
            tales.forEach(tale => {
                const taleCard = document.createElement('div');
                taleCard.className = 'bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200';

                // Create a snippet of the content (e.g., first 100 characters)
                const snippet = tale.content.substring(0, 100) + (tale.content.length > 100 ? '...' : '');

                // Format the date
                const date = new Date(tale.createdDate).toLocaleDateString('en-US', {
                    year: 'numeric', month: 'long', day: 'numeric'
                });

                taleCard.innerHTML = `
                    <h2 class="text-xl font-bold text-gray-900 mb-2">${tale.title || 'Untitled Tale'}</h2>
                    <p class="text-gray-600 mb-4 line-clamp-3">${snippet}</p>
                    <p class="text-sm text-gray-400">Saved on: ${date}</p>
                    `;

                talesListContainer.appendChild(taleCard);
            });
        }

    } catch (err) {
        console.error(err.message);
        // If the token was invalid, log the user out
        if (err.message.includes('authorization denied') || err.message.includes('not valid')) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        } else {
            // Show a generic error
            talesListContainer.innerHTML = '<p class="text-red-500">Error loading tales. Please try again.</p>';
        }
    }
});