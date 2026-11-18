
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        try {
            const response = await api.get(
                "/users?email=" + email + "&password=" + password
            );

            if (response.data.length === 0) {
                setError("Invalid email or password.");
                return;
            }

            const user = response.data[0];

            // Store user in localStorage
            localStorage.setItem("user", JSON.stringify(user));

            navigate("/");

            // Reload so Navbar re-reads localStorage
            window.location.href = "/";

        } catch (err) {
            console.log(err);
            setError("Login failed. Please try again.");
        }
    }

    return (
        <div className="form-container">

            <h1>Login</h1>

            {error && <p className="auth-error">{error}</p>}

            <form onSubmit={handleSubmit}>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit">Login</button>

            </form>

            <p className="auth-link">
                Don't have an account? <Link to="/register">Register</Link>
            </p>

        </div>
    );
}

export default Login;
