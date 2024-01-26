// export default function Login() {

//     return (
//         <>
//             <h1> Login</h1>
//             <form method="post" action= {`${import.meta.env.VITE_SERVER_URL}/login`} className="login-form">
//                 <div>
//                     <label for="username">Username</label>
//                     <input type="text" id="username" name="username"/>
//                 </div>
//                 <div>
//                     <label for="password">Password</label>
//                     <input type="password" id="password" name="password"/>
//                 </div>
//                 <input type="submit" value="Submit"/>
//             </form>               
//         </>
//     )
// }
import { useState } from 'react';

export default function Login() {
    const [accessToken, setAccessToken] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const username = event.target.username.value;
        const password = event.target.password.value;

        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                setAccessToken(data.accessToken);

                // Redirect to the /timer route on successful login
                window.location.href = `${import.meta.env.VITE_CLIENT_URL}/timer`;
            } else {
                // Handle authentication failure (e.g., show an error message)
                console.log('Authentication failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
            <h1> Login</h1>
            <form onSubmit={handleSubmit} className="login-form">
                <div>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" />
                </div>
                <input type="submit" value="Submit" />
            </form>
        </>
    );
}
