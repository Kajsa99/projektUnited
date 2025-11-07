import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export function Navbar() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const username = localStorage.getItem("username");
        const userId = localStorage.getItem("userId");
        if (username) setUser({ username, id: userId });
        else setUser(null);
    }, []);

    function Logout(e) {
        e.preventDefault();
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        setUser(null);
        navigate("/login");
    }

    const tabs = [
        { label: "EXPLORE", href: "/" },
        { label: "ADD NEW", href: "/new" },
        { label: "PROFILE", href: user ? `/profile/${user.id}` : "/login" },
    ];

    return (
        <nav className="text-white pt-4 px-4 bg-stone-400 flex flex-col">
            <h2 className="text-2xl flex items-center">
                <img
                    src="/strawberry.png"
                    alt="strawberry"
                    className="w-6 h-6 mr-2"
                />
                SmultronStällen
            </h2>
            <div className="flex items-end justify-center gap-2">
                {tabs.map((t) => (
                    <a
                        key={t.href}
                        href={t.href}
                        className="px-10 py-2 rounded-t-lg bg-stone-500 text-white hover:bg-stone-300"
                    >
                        {t.label}
                    </a>
                ))}
            </div>
            <div className="absolute top-2 right-4 flex items-center gap-3 m-4">
                {user ? (
                    <>
                        <p className="text-md">
                            Howdy, <strong>{user.username}!</strong>
                        </p>
                        <button
                            onClick={Logout}
                            className="text-md bg-stone-700 px-5 pt-2 pb-3 rounded-2xl hover:bg-stone-600"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <a
                        to="/login"
                        className="text-md bg-stone-700 p-3 rounded-2xl hover:bg-stone-600"
                    >
                        Login
                    </a>
                )}
            </div>
        </nav>
    );
}
