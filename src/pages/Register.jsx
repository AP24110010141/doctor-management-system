
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        try {
            // Check if user already exists
            const response = await api.get("/users?email=" + email);

            if (response.data.length > 0) {
                setError("User already exists with this email.");
                return;
            }

            // Register new user
            await api.post("/users", { name, email, password });

            navigate("/login");

        } catch (err) {
            console.log(err);
            setError("Registration failed. Please try again.");
        }
    }

    return (
        <div className="form-container">

            <h1>Register</h1>

            {error && <p className="auth-error">{error}</p>}

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

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

                <button type="submit">Register</button>

            </form>

            <p className="auth-link">
                Already have an account? <Link to="/login">Login</Link>
            </p>

        </div>
    );
}

export default Register;
