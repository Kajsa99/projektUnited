import React, { useState, useEffect } from "react";
import LoginForm from "../../components/login-form";

export default function Login() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    if (token && username) {
      setUser({ token, username });
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("username", userData.username);
    console.log("Logged in user:", userData);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      {!user ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <p className="text-center text-green-400">Welcome, {user.username}!</p>
      )}
    </div>
  );
}
