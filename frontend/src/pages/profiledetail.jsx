import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UpdateUserForm from "../../components/update-user-form";

export default function ProfileDetail() {
  const [user, setUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const loggedInId = localStorage.getItem("userId");

    if (!token || !loggedInId) {
      navigate("/login");
      return;
    }

    fetch(`http://4.210.254.154:3000/api/users/${loggedInId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then(setUser)
      .catch(() => setUser(null));
  }, [navigate]);

  if (!user) return <div className="p-6">User not found</div>;

  const handleUpdate = (updatedUser) => {
    // Update parent state and hide form
    setUser(updatedUser);
    setShowForm(false);
    if (updatedUser.username)
      localStorage.setItem("username", updatedUser.username);
  };
  const handleDelete = async () => {
    // confirm deletion
    const ok = window.confirm(
      "Are you sure you want to permanently delete your account?"
    );
    if (!ok) return;

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    try {
      const res = await fetch(`http://4.210.254.154:3000/api/users/${userId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        alert(json.error || "Failed to delete account");
        return;
      }
      // remove from local storage
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("username");
      navigate("/signup");
    } catch (err) {
      console.error(err);
      alert("Network error when deleting account");
    }
  };

  return (
    <div className="bg-lime-900 min-h-screen flex flex-col items-center p-10 gap-4">
      {!showForm ? (
        <>
          <div className="flex justify-center flex-col items-center bg-lime-50 min-w-70 max-w-300 rounded-lg p-4">
            <img
              src="/user.png"
              alt="profile picture"
              className="w-20 h-20 object-cover rounded-full mb-4"
            />
            <h1 className="text-2xl mb-2">{user.username}</h1>
            <p>Email: {user.email}</p>
            <div className="flex flex-row items-baseline gap-4">
              <button
                onClick={() => setShowForm(true)}
                className="bg-rose-400 text-rose-800 px-4 py-2 rounded mt-4 hover:bg-rose-200"
              >
                Update info
              </button>
            </div>
          </div>
          <button
            onClick={handleDelete}
            className="bg-rose-900 text-rose-100 px-4 py-2 rounded m-2 hover:bg-rose-700"
          >
            Delete account
          </button>
        </>
      ) : (
        <div>
          <UpdateUserForm user={user} onUpdate={handleUpdate} />
          <button
            onClick={() => setShowForm(false)}
            className="mt-4 text-sm text-rose-200 underline"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
