export default function Profile() {
    return (
        <div className="flex flex-col p-10 bg-stone-500 text-white min-h-screen">
            <h1 className="flex m-4 text-xl justify-center">User Profile</h1>
            <div className="bg-stone-200 rounded-lg text-black">
                <h2 className="flex m-4 text-center justify-center">
                    profile.name
                </h2>
                <p className="flex m-4 text-center justify-center">
                    Email: profile.email
                </p>
                <p className="flex m-4 text-center justify-center">
                    Password:
                    <button>Change password</button>
                </p>
                <p className="flex m-4 text-center justify-center">
                    Member since: profile.memberSince
                </p>
            </div>
        </div>
    );
}
