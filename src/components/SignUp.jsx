import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate(); // Use navigate to redirect

    const handleSubmit = async (event) => {
        event.preventDefault();

        const username = event.target.username.value;
        const password = event.target.password.value;

        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();

                // Store the access token in localStorage
                localStorage.setItem('token', data.accessToken);

                // Redirect to the user's account page
                navigate(`/account/${data.userId}`);
            } else if (response.status === 409) {
                setErrorMessage('User already exists.');
                setSuccessMessage('');
            } else {
                setErrorMessage('Failed to register. Please try again.');
                setSuccessMessage('');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('An error occurred. Please try again.');
            setSuccessMessage('');
        }
    };

    return (
        <>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit} className="signup-form">
                <div>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" required />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" required />
                </div>
                <input type="submit" value="Sign Up" />
            </form>
            {errorMessage && <p>{errorMessage}</p>}
            {successMessage && <p>{successMessage}</p>}
        </>
    );
}
