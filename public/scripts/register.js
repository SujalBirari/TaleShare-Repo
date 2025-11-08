document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
    const errorMessageDiv = document.getElementById('error-message');

    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            // Prevent the default form submission (which reloads the page)
            e.preventDefault();

            // Clear any previous error messages
            errorMessageDiv.textContent = '';
            errorMessageDiv.classList.add('hidden');

            // Get the values from the form
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                // Send the data to your backend API
                const response = await fetch('/api/auth/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                });

                // Get the response data (which is JSON)
                const data = await response.json();

                // Check if the registration was NOT successful
                if (!response.ok) {
                    // 'data.msg' comes from your backend: res.status(400).json({ msg: '...' })
                    throw new Error(data.msg || 'Registration failed. Please try again.');
                }

                // SUCCESS! Registration worked.
                alert('Registration successful! Please log in.');
                // Redirect the user to the login page (which we'll create next)
                window.location.href = '/login';

            } catch (err) {
                // Display any errors to the user
                errorMessageDiv.textContent = err.message;
                errorMessageDiv.classList.remove('hidden');
            }
        });
    }
});