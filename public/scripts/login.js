document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const errorMessageDiv = document.getElementById('error-message');

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            // Prevent the form from reloading the page
            e.preventDefault();

            // Clear any old errors
            errorMessageDiv.textContent = '';
            errorMessageDiv.classList.add('hidden');

            // Get form values
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                // Send data to the /login API
                const response = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                });

                // Get the JSON response
                const data = await response.json();

                // Check if the login failed
                if (!response.ok) {
                    // 'data.message' comes from your backend: res.status(400).json({ message: '...' })
                    throw new Error(data.message || 'Login failed.');
                }

                // SUCESSS! We have the token
                if (data.token) {
                    // Store the token in the browser's localStorage
                    localStorage.setItem('token', data.token);

                    // Redirect to the editor page
                    window.location.href = '/editor';
                } else {
                    throw new Error('No token received. Please try again.');
                }

            } catch (err) {
                // Display any errors to the user
                errorMessageDiv.textContent = err.message;
                errorMessageDiv.classList.remove('hidden');
            }
        });
    }
});