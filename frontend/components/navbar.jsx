export function Navbar() {
    const tabs = [
        { label: "EXPLORE", href: "/" },
        { label: "ADD NEW", href: "/new" },
        { label: "PROFILE", href: "/profile" },
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
        </nav>
    );
}
