import { useEffect, useState } from "react";

export default function Home() {
    const [cards, setCards] = useState([]);
    useEffect(() => {
        fetch("/api/smultron")
            .then((res) => res.json())
            .then(setCards)
            .catch(console.error);
    }, []);
    return (
        <div className="flex flex-col p-10 bg-stone-500 text-white min-h-screen">
            <h1 className="flex m-4 text-xl justify-center">
                Explore smultron
            </h1>

            <ul>
                {cards.map((s) => (
                    <li key={s.id}>
                        {s.title}
                        {s.description}
                        {s.location}
                        {s.image_url}
                        {s.created_at}
                    </li>
                ))}
            </ul>
        </div>
    );
}