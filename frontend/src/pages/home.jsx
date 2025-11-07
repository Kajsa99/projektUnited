import { SmultronCard } from "../../components/smultroncard";

export default function Home() {
    return (
        <div className="flex flex-col p-10 bg-stone-500 text-white min-h-screen">
            <h1 className="flex m-4 text-xl justify-center">
                Explore smultron
            </h1>
            <SmultronCard />
        </div>
    );
}
