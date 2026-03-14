import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import HomePage from "./pages/HomePage";
import AddCarPage from "./pages/AddCarPage";
import RegisterPage from "./pages/RegisterPage";
import type { CarAd } from "./types/CarAd";
import "./index.css";

function App() {
    const [ads, setAds] = useState<CarAd[]>([]);

    const addAd = (ad: CarAd) => {
        setAds((prev) => [ad, ...prev]);
    };

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage ads={ads} />} />
                <Route path="/add-car" element={<AddCarPage onAddAd={addAd} />} />
                <Route path="/register" element={<RegisterPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
