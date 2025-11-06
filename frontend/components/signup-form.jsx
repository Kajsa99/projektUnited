import React, { useState } from "react";

export default function SignUpForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="flex flex-col p-10 bg-stone-500 text-white min-h-screen">
      <h1 className="flex m-4 text-xl justify-center">Signup</h1>
      <p className="flex m-4 text-center justify-center">
        Please enter your credentials.
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col max-w-sm mx-auto gap-4"
      >
        <label className="flex flex-col">
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="mt-1 p-2 rounded bg-stone-700 text-white"
            required
          />
        </label>

        <label className="flex flex-col">
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 p-2 rounded bg-stone-700 text-white"
            required
          />
        </label>

        <label className="flex flex-col">
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 p-2 rounded bg-stone-700 text-white"
            required
          />
        </label>

        <button className="bg-stone-800 rounded-xl text-white p-2 mt-4">
          Signup
        </button>
      </form>
    </div>
  );
}
