import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Header.css";

export default function Header() {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const { user } = useAuth();

    const handleProfileClick = () => {
        if (user) {
            navigate("/profile");
        } else {
            navigate("/register");
        }
    };
    console.log("USER:", user);
    return (
        <header className="header">
            {/* Логотип слева */}
            <div className="logo">AutoPlace</div>

            {/* Поиск */}
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Поиск автомобилей..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="search-input"
                />
                <span className="search-icon">🔍</span>
            </div>

            {/* Профиль */}
            <button className="profile-btn" onClick={handleProfileClick}>
                {user ? user.email : "👤"}
            </button>
        </header>
    );
}