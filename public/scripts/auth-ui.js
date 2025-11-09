// File: public/scripts/auth-ui.js

document.addEventListener('DOMContentLoaded', () => {

    // Find the link containers
    const guestLinks = document.getElementById('guest-links');
    const userLinks = document.getElementById('user-links');
    const userLinksCenter = document.getElementById('user-links-center'); // <-- 1. ADD THIS LINE
    const logoutButton = document.getElementById('logout-button');

    // Get the token from localStorage
    const token = localStorage.getItem('token');

    if (token) {
        // User is LOGGED IN
        if (guestLinks) guestLinks.style.display = 'none'; // Hide Login/Sign Up
        if (userLinks) userLinks.style.display = 'flex'; // Show Logout
        if (userLinksCenter) userLinksCenter.style.display = 'flex'; // <-- 2. ADD THIS LINE

    } else {
        // User is LOGGED OUT
        if (guestLinks) guestLinks.style.display = 'flex'; // Show Login/Sign Up
        if (userLinks) userLinks.style.display = 'none'; // Hide Logout
        if (userLinksCenter) userLinksCenter.style.display = 'none'; // <-- 3. ADD THIS LINE
    }

    // Add click handler for the logout button
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            // Remove the token from storage
            localStorage.removeItem('token');
            localStorage.removeItem('taleShare_editor_title');
            localStorage.removeItem('taleShare_editor_content');

            // Redirect to home page
            window.location.href = '/';
        });
    }
});