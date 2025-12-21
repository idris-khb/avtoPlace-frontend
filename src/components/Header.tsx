import { useState } from "react";
import "./Header.css";

export default function Header() {
    const [search, setSearch] = useState("");

    return (
        <header className="header">
            {/* Логотип слева */}
            <div className="logo">AutoPlace</div>

            {/* Поле поиска с иконкой */}
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

            {/* Кнопка профиля справа */}
            <button className="profile-btn">👤</button>
        </header>
    );
}
