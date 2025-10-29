export function Navbar() {
    return (
        <nav className="text-white p-4 bg-blue-300 flex flex-col">
            <h2 className="text-xl flex items-center">
                <img
                    src="/strawberry.png"
                    alt="strawberry"
                    className="w-6 h-6 mr-2"
                />
                SmultronStällen
            </h2>
            <div className="flex justify-between mt-2">
                <a href="/" className="ml-4 bg-blue-500 p-2 rounded-lg">
                    EXPLORE
                </a>
                <a href="/new" className="ml-4 bg-blue-500 p-2 rounded-lg">
                    ADD NEW
                </a>
                <a href="/profile" className="ml-4 bg-blue-500 p-2 rounded-lg">
                    PROFILE
                </a>
            </div>
        </nav>
    );
}
