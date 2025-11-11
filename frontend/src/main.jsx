import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { registerSW } from "virtual:pwa-register";

registerSW({
    onRegistered(r) {
        console.log("Service worker registered:", r);
    },
    onRegisterError(err) {
        console.error("SW registration failed:", err);
    },
    onOfflineReady() {
        console.log("App ready for offline use");
    },
});

createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);
