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

        fetch(`/api/users/${loggedInId}`, {
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

    return (
        <div className="bg-stone-500 min-h-screen flex flex-col items-center p-10 gap-4">
            {!showForm ? (
                <>
                    <div className="flex justify-center flex-col items-center bg-white max-w-300 rounded-lg p-4">
                        <h1 className="text-2xl mb-2">{user.username}</h1>
                        <p>{user.email}</p>

                        <button
                            onClick={() => setShowForm(true)}
                            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
                        >
                            Update info
                        </button>
                    </div>
                </>
            ) : (
                <div>
                    <UpdateUserForm user={user} onUpdate={handleUpdate} />
                    <button
                        onClick={() => setShowForm(false)}
                        className="mt-4 text-sm text-gray-200 underline"
                    >
                        Cancel
                    </button>
                </div>
            )}
        </div>
    );
}
