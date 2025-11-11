import React, { useState, useEffect } from "react";
import LoginForm from "../../components/login-form";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const username = localStorage.getItem("username");
        if (token && username) {
            setUser({ token, username });
        }
    }, []);

    const handleLogin = (userData) => {
        setUser(userData);
        localStorage.setItem("token", userData.token);
        localStorage.setItem("username", userData.username);
        localStorage.setItem("userId", String(user.id));
        console.log("Logged in user:", userData);
        navigate(`/profile/${userData.id}`);
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-lime-900 text-white p-10">
            {!user ? (
                <LoginForm onLogin={handleLogin} />
            ) : (
                <p className="text-center text-lime-800">
                    Welcome, {user.username}!
                </p>
            )}
        </div>
    );
}
