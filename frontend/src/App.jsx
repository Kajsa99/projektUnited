import "./App.css";
import { Navbar } from "../components/navbar.jsx";
import { Footer } from "../components/footer.jsx";
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

const Home = lazy(() => import("./pages/home.jsx"));
const New = lazy(() => import("./pages/new.jsx"));
const ProfileDetail = lazy(() => import("./pages/profiledetail.jsx"));
const Login = lazy(() => import("./pages/login.jsx"));
const Signup = lazy(() => import("./pages/signup.jsx"));

function App() {
  console.log(" App component rendered");

  return (
    <div>
      <Navbar />

      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<New />} />
          <Route path="/profile/:id" element={<ProfileDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Suspense>
      <Footer />
    </div>
  );
}

export default App;
