import "./App.css";
import { Navbar } from "../components/navbar.jsx";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import New from "./pages/new.jsx";
import Profiles from "./pages/profiles.jsx";
import ProfileDetail from "./pages/profiledetail.jsx";
import Settings from "./pages/settings.jsx";
import Login from "./pages/login.jsx";
import Signup from "./pages/signup.jsx";
import { Footer } from "../components/footer.jsx";

function App() {
    console.log(" App component rendered");

    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/new" element={<New />} />
                <Route path="/profile" element={<Profiles />} />
                <Route path="/profile/:id" element={<ProfileDetail />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
