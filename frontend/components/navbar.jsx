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
        <nav className="text-white pt-4 px-4 bg-lime-50 flex flex-col">
            <h2 className="text-2xl flex items-center text-lime-800">
                <img
                    src="/strawberry.png"
                    alt="strawberry"
                    className="w-10 h-10 mr-2"
                />
                SmultronStällen
            </h2>
            <div className="flex items-end justify-center gap-2">
                {tabs.map((t) => (
                    <a
                        key={t.href}
                        href={t.href}
                        className="px-10 py-2 rounded-t-lg bg-lime-900 text-lime-50 hover:bg-lime-600"
                    >
                        {t.label}
                    </a>
                ))}
            </div>
            <div className="absolute top-2 right-4 flex items-center gap-3 m-4">
                {user ? (
                    <>
                        <p className="text-md text-rose-400">
                            Howdy, <strong>{user.username}!</strong>
                        </p>
                        <button
                            onClick={Logout}
                            className="text-md bg-rose-400 text-rose-900 px-5 pt-2 pb-3 rounded-2xl hover:text-rose-900 hover:bg-rose-200"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <a
                        to="/login"
                        className="bg-rose-400 text-rose-900 text-md p-3 rounded-2xl hover:text-white"
                    >
                        Login
                    </a>
                )}
            </div>
        </nav>
    );
}
