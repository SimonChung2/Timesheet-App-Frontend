export default function Login() {

    return (
        <>
            <h1> Login</h1>
            <form method="post" action= {`${import.meta.env.VITE_SERVER_URL}/login`} className="login-form">
                <div>
                    <label for="username">Username</label>
                    <input type="text" id="username" name="username"/>
                </div>
                <div>
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password"/>
                </div>
                <input type="submit" value="Submit"/>
            </form>               
        </>
    )
}