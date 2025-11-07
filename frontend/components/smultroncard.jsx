import { useEffect, useState } from "react";

export function SmultronCard() {
    const [cards, setCards] = useState([]);
    useEffect(() => {
        fetch("/api/smultron")
            .then((res) => res.json())
            .then(setCards)
            .catch(console.error);
    }, []);

    return (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2 pl-10 pr-10">
            {cards.map((s) => (
                <li key={s.id}>
                    <div className="max-w-sm rounded-lg bg-white my-4 px-6 py-6 ">
                        <h2 className="text-xl text-black">{s.user_id}</h2>
                        <div className="bg-stone-200 max-w-sm h-48 rounded-md mb-4 flex items-center justify-center text-stone-500">
                            {s.image_url}
                        </div>
                        <div className="flex justify-between items-baseline mb-2">
                            <h3 className="text-lg text-black">{s.title}</h3>
                            <h3 className="text-sm text-stone-500">
                                {s.location}
                            </h3>
                        </div>
                        <p className="text-stone-700 mb-2 truncate italic">
                            {s.description}
                        </p>
                    </div>
                </li>
            ))}
        </ul>
    );
}
