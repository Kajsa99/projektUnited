import { Link } from "react-router-dom";

export function Navbar() {
    const tabs = [
        { label: "EXPLORE", to: "/" },
        { label: "ADD NEW", to: "/new" },
        { label: "PROFILE", to: "/profile" },
        { label: "SETTINGS", to: "/settings" },
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
                    <Link
                        key={t.to}
                        to={t.to}
                        className="px-10 py-2 rounded-t-lg bg-stone-500 text-white hover:bg-stone-300"
                    >
                        {t.label}
                    </Link>
                ))}
            </div>
        </nav>
    );
}
