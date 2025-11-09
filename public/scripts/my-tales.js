// File: public/scripts/my-tales.js

document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');

    if (!token) {
        window.location.href = '/login';
        return;
    }

    const talesListContainer = document.getElementById('tales-list');
    const loadingMessage = document.getElementById('loading-message');

    // --- (NEW) Delete Tale Function ---
    async function deleteTale(taleId, taleCardElement) {
        // 1. Ask for confirmation
        if (!confirm('Are you sure you want to permanently delete this tale?')) {
            return;
        }

        try {
            // 2. Send the DELETE request
            const response = await fetch(`/api/tales/${taleId}`, {
                method: 'DELETE',
                headers: {
                    'x-auth-token': token,
                },
            });

            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.msg || 'Failed to delete tale.');
            }

            // 3. Success! Remove the card from the page
            taleCardElement.remove();

        } catch (err) {
            console.error(err.message);
            alert(`Error: ${err.message}`);
            if (err.message.includes('authorization denied') || err.message.includes('not valid')) {
                localStorage.removeItem('token');
                window.location.href = '/login';
            }
        }
    }

    try {
        const response = await fetch('/api/tales', {
            method: 'GET',
            headers: {
                'x-auth-token': token,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.msg || 'Failed to fetch tales');
        }

        const tales = await response.json();

        if (loadingMessage) {
            loadingMessage.remove();
        }

        if (tales.length === 0) {
            talesListContainer.innerHTML = '<p class="text-gray-500">You haven\'t saved any tales yet. <a href="/editor" class="text-indigo-600 hover:underline">Start writing!</a></p>';
        } else {
            tales.forEach(tale => {
                // We create a 'div' again, as the link is now just for editing
                const taleCard = document.createElement('div');
                taleCard.className = 'bg-white p-6 rounded-lg shadow-md flex flex-col justify-between';

                // We add a data attribute to store the ID
                taleCard.setAttribute('data-tale-id', tale._id);

                const snippet = tale.content.substring(0, 100) + (tale.content.length > 100 ? '...' : '');
                const date = new Date(tale.createdDate).toLocaleDateString('en-US', {
                    year: 'numeric', month: 'long', day: 'numeric'
                });

                // --- (MODIFIED) Card HTML with Edit and Delete buttons ---
                taleCard.innerHTML = `
                    <div>
                        <h2 class="text-xl font-bold text-gray-900 mb-2">${tale.title || 'Untitled Tale'}</h2>
                        <p class="text-gray-600 mb-4 line-clamp-3">${snippet}</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-400 mb-4">Saved on: ${date}</p>
                        <div class="flex items-center space-x-2">
                            <a href="/editor?id=${tale._id}" class="text-sm font-medium text-indigo-600 hover:text-indigo-800">Edit</a>
                            <span class="text-gray-300">|</span>
                            
                            <button data-action="delete" class="text-sm font-medium text-red-600 hover:text-red-800">
                                Delete
                            </button>
                        </div>
                    </div>
                `;

                talesListContainer.appendChild(taleCard);
            });
        }

    } catch (err) {
        console.error(err.message);
        if (err.message.includes('authorization denied') || err.message.includes('not valid')) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        } else {
            talesListContainer.innerHTML = '<p class="text-red-500">Error loading tales. Please try again.</p>';
        }
    }

    // --- (NEW) Event Listener for Delete Buttons ---
    // We listen on the whole container for clicks
    talesListContainer.addEventListener('click', (e) => {
        // Check if the clicked element is a delete button
        if (e.target.getAttribute('data-action') === 'delete') {

            // Find the parent card to get its ID
            const taleCard = e.target.closest('[data-tale-id]');
            if (taleCard) {
                const taleId = taleCard.getAttribute('data-tale-id');
                deleteTale(taleId, taleCard);
            }
        }
    });
});