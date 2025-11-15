import { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

export function SmultronCard() {
  const [cards, setCards] = useState([]);
  useEffect(() => {
    fetch("http://4.210.254.154:3000/api/smultron")
      .then((res) => res.json())
      .then(setCards)
      .catch(console.error);
  }, []);

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2 pl-10 pr-10">
      {cards.map((s) => (
        <li key={s.id}>
          <div className="max-w-sm rounded-lg bg-lime-50 my-4 px-6 py-6 ">
            <h2 className="text-xl text-lime-900">{s.user_id}</h2>
            <div className="bg-rose-50 max-w-sm h-48 rounded-md mb-4 flex items-center justify-center text-rose-200">
              {s.image_url ? (
                <LazyLoadImage
                  src={s.image_url}
                  alt={s.title || "Smultron image"}
                  className="w-full h-48 object-cover rounded-md"
                />
              ) : (
                <span className="text-sm">No image</span>
              )}
            </div>
            <div className="flex justify-between items-baseline mb-2">
              <h3 className="text-lg text-lime-900">{s.title}</h3>
              <h3 className="text-sm text-rose-400">{s.location}</h3>
            </div>
            <p className="text-rose-400 mb-2 truncate italic">
              {s.description}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
