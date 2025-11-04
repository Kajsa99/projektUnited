import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function ProfileDetail() {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    useEffect(() => {
        if (!id) return;
        fetch(`/api/users/${id}`)
            .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
            .then(setUser)
            .catch(() => setUser(null));
    }, [id]);

    if (!user) return <div className="p-6">User not found</div>;

    return (
        <div className="bg-stone-500 min-h-screen flex flex-col items-center p-10 gap-4">
            <div className="flex justify-center flex-col items-center bg-white max-w-300 rounded-lg p-4">
                <h1 className="text-2xl mb-2">{user.username}</h1>
                <p>{user.email}</p>
                <p>Personnummer: {user.personnummer}</p>
            </div>
            <div>
                <Link
                    to="/profile"
                    className="text-md bg-stone-800 rounded-xl max-w-35 text-white m-2 flex justify-start p-4"
                >
                    Back to users
                </Link>
            </div>
        </div>
    );
}
