import "./App.css";
import { Navbar } from "../components/navbar.jsx";

function App() {
    return (
        <>
            <div>
                <Navbar />
                <div className="flex flex-col p-10 bg-stone-500 text-white min-h-screen">
                    <h1 className="flex m-4 text-xl justify-center">
                        Explore smultron
                    </h1>
                </div>
            </div>
        </>
    );
}

export default App;
