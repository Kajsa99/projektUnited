export function SmultronCard() {
    return (
        <>
            <div className="max-w-sm rounded-lg bg-white my-4 px-6 py-4">
                <h2 className="text-xl text-black">Profilename</h2>
                <div className="bg-stone-200 max-w-sm h-48 rounded-md mb-4 flex items-center justify-center text-stone-500">
                    Img
                </div>
                <div className="flex justify-between">
                    <h3 className="text-lg text-black">Title</h3>
                    <h3 className="text-md text-gray-500">Place</h3>
                </div>
                <p className="text-gray-700 text-base">
                    Bla bla bla description of the smultronställe.
                </p>
            </div>
        </>
    );
}