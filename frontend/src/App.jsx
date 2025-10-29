import "./App.css";
import { Navbar } from "../components/navbar.jsx";

function App() {
    return (
        <>
            <div>
                <Navbar />
                <div className="flex flex-col p-10 bg-blue-800 text-white">
                    <h1 className="flex m-4">Homepage</h1>
                    <div>
                        <p>Alla kort</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
