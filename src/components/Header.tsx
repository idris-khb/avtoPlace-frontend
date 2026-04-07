import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Header.css";

type Props = {
    onOpenFilters: () => void;
};

export default function Header({ onOpenFilters }: Props) {
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

    return (
        <header className="header">

            {/* ЛОГО */}
            <div className="logo">AutoPlace</div>

            {/* ПОИСК */}
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

            {/* ПРАВАЯ ЧАСТЬ */}
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>

                {/* 🔥 ФИЛЬТРЫ */}
                <span
                    onClick={onOpenFilters}
                    style={{
                        cursor: "pointer",
                        color: "#1976d2",
                        fontWeight: 600
                    }}
                >
                    Фильтры
                </span>

                {/* ПРОФИЛЬ */}
                <button className="profile-btn" onClick={handleProfileClick}>
                    {user ? user.email : "👤"}
                </button>
            </div>

        </header>
    );
}