import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./ProfilePage.css";

import ProfileInfo from "../components/profile/ProfileInfo";
import MyAds from "../components/profile/MyAds";
import Favorites from "../components/profile/Favorites";
import Settings from "../components/profile/Settings";

export default function ProfilePage() {
    const { user, logout } = useAuth();
    const [activeTab, setActiveTab] = useState("profile");

    if (!user) {
        return (
            <div className="profile-unauthorized">
                <h2>Unauthorized</h2>
            </div>
        );
    }

    return (
        <div className="container">

            {/* HEADER */}
            <div className="card profile-header">
                <div className="profile-avatar">
                    {user.email[0].toUpperCase()}
                </div>

                <div>
                    <h2 className="title">{user.email}</h2>
                    <p className="subtitle">Аккаунт пользователя</p>
                </div>
            </div>

            {/* TAB MENU */}
            <div className="tabs">
                <button
                    className={`tab ${activeTab === "profile" ? "active" : ""}`}
                    onClick={() => setActiveTab("profile")}
                >
                    Профиль
                </button>

                <button
                    className={`tab ${activeTab === "ads" ? "active" : ""}`}
                    onClick={() => setActiveTab("ads")}
                >
                    Мои объявления
                </button>

                <button
                    className={`tab ${activeTab === "favorites" ? "active" : ""}`}
                    onClick={() => setActiveTab("favorites")}
                >
                    Избранное
                </button>

                <button
                    className={`tab ${activeTab === "settings" ? "active" : ""}`}
                    onClick={() => setActiveTab("settings")}
                >
                    Настройки
                </button>
            </div>

            {/* CONTENT */}
            <div className="card tab-content">
                {activeTab === "profile" && <ProfileInfo user={user} />}
                {activeTab === "ads" && <MyAds />}
                {activeTab === "favorites" && <Favorites />}
                {activeTab === "settings" && <Settings logout={logout} />}
            </div>

        </div>
    );
}