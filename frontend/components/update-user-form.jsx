import { useState } from "react";

export default function UpdateUserForm({ user, onUpdate }) {
    // Form state
    const [formData, setFormData] = useState({
        username: user.username || "",
        email: user.email || "",
        password: "",
    });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const token = localStorage.getItem("token");
            console.log("Submitting update", {
                userId: user.id,
                formData,
                token: !!token,
            });

            const res = await fetch(
                `http://localhost:3000/api/users/${user.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(formData),
                }
            );
            const data = await res.json().catch(() => ({}));
            if (!res.ok) {
                setError(data.error || "Update failed");
                return;
            }
            onUpdate(data); // Notify parent component
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
            <h1 className="text-xl mb-4 text-center">Update User Info</h1>
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
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="p-2 rounded bg-stone-700 text-white"
                required
            />
            <input
                type="text"
                name="password"
                placeholder="New password"
                value={formData.password}
                onChange={handleChange}
                className="p-2 rounded bg-stone-700 text-white"
            />
            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
            >
                Update
            </button>
            {error && <p className="text-red-400 mt-2 text-center">{error}</p>}
        </form>
    );
}
