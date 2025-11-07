import { useState } from "react";
import { Link } from "react-router-dom";

export default function LoginForm({ onLogin }) {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await fetch("http://localhost:3000/api/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json().catch(() => ({}));
            console.log("login response", res.status, data);

            if (!res.ok) {
                setError(data.error || "Login failed");
                return;
            }
            const user =
                data.user ||
                (data.id || data.userId
                    ? { id: data.id || data.userId, username: data.username }
                    : null);

            if (res.ok) {
                localStorage.setItem("token", data.token); // save token in local storaeg
                localStorage.setItem("userId", String(user.id)); // store id for routing/visibility
                localStorage.setItem("username", user.username);
                onLogin({ token: data.token, user }); // notify parent component
            } else {
                setError(data.error || "Login failed");
            }
        } catch (err) {
            console.error(err);
            setError("Something went wrong");
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col max-w-sm mx-auto gap-4 p-10 bg-stone-500 text-white rounded-lg"
        >
            <h1 className="text-xl mb-4 text-center">Login</h1>
            <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className="p-2 rounded bg-stone-700 text-white"
                required
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="p-2 rounded bg-stone-700 text-white"
                required
            />
            <button type="submit" className="bg-stone-800 rounded-xl p-2 mt-4">
                Login
            </button>
            {error && <p className="text-red-400 mt-2 text-center">{error}</p>}
            <Link to="/signup">No account? Sign up here.</Link>
        </form>
    );
}
