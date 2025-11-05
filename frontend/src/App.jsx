import "./App.css";
import { Navbar } from "../components/navbar.jsx";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Profiles from "./pages/Profiles.jsx";
import ProfileDetail from "./pages/ProfileDetail.jsx";
import Settings from "./pages/Settings.jsx";
import { Footer } from "../components/footer.jsx";

function App() {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profiles />} />
                <Route path="/profile/:id" element={<ProfileDetail />} />
                <Route path="/settings" element={<Settings />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
