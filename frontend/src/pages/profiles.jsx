import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Profiles() {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetch("/api/users")
            .then((res) => res.json())
            .then(setUsers)
            .catch(console.error);
    }, []);

    return (
        <div className="bg-stone-500 min-h-screen flex flex-col items-center p-10 gap-4">
            <h1 className="text-2xl mb-4 text-white">Users</h1>
            <ul>
                {users.map((u) => (
                    <li key={u.id}>
                        <Link
                            to={`/profile/${u.id}`}
                            className="text-white hover:underline bg-stone-700 rounded-xl p-4 m-2 block max-w-35"
                        >
                            {u.username}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
