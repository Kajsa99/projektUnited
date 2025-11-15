import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignUpForm from "../../components/signup-form";

export default function Signup() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (formData) => {
    try {
      const res = await fetch("http://4.210.254.154:3000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Signup successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setMessage(data.error || "Signup failed");
      }
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong");
    }
  };

  return (
    <div>
      <SignUpForm onSubmit={handleSignUp} />
      {message && (
        <p className="text-center mt-4 text-yellow-300 font-semibold">
          {message}
        </p>
      )}
    </div>
  );
}
