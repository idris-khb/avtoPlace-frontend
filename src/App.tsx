import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import type { CarAd } from "./types/CarAd";
import "./index.css";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import {AuthProvider} from "./context/AuthContext.tsx";

function App() {
    const [ads, setAds] = useState<CarAd[]>([]);

    const addAd = (ad: CarAd) => {
        setAds((prev) => [ad, ...prev]);
    };

    return (
        <AuthProvider>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage ads={ads} />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <ProfilePage />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
