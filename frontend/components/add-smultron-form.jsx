import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function AddSmultronForm() {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [image_url, setImageUrl] = useState("");
  const navigate = useNavigate();

  const user_id = localStorage.getItem("userId");

  async function handleSubmit(e) {
    e.preventDefault();

    const newSmultron = {
      user_id,
      title,
      location,
      description,
      image_url,
    };

    try {
      await fetch("http://4.210.254.154:3000/api/smultron", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSmultron),
      });
      console.log("Smultron added!");

      navigate("/");
    } catch (error) {
      console.error("Error adding smultron:", error);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-lime-50 rounded-lg mt-10"
    >
      <h2 className="text-xl text-lime-900 mb-4 text-center">
        Add Smultronställe
      </h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 mb-3 border rounded"
      />

      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="w-full p-2 mb-3 border rounded"
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 mb-3 border rounded"
      ></textarea>

      <input
        type="text"
        placeholder="Image URL"
        value={image_url}
        onChange={(e) => setImageUrl(e.target.value)}
        className="w-full p-2 mb-3 border rounded"
      />

      <button
        type="submit"
        className="w-full bg-lime-700 text-white py-2 rounded hover:bg-lime-800"
      >
        Add Smultron
      </button>
    </form>
  );
}
