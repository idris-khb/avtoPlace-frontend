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
        return <div className="profile-unauthorized">Unauthorized</div>;
    }

    return (
        <div className="profile-page">

            {/* HEADER */}
            <div className="profile-header">
                <div className="profile-avatar">
                    {user.email[0].toUpperCase()}
                </div>

                <div>
                    <h2 className="profile-name">{user.email}</h2>
                    <p className="profile-subtitle">Аккаунт пользователя</p>
                </div>
            </div>

            {/* TAB MENU */}
            <div className="tabs">
                <button className={activeTab === "profile" ? "active" : ""} onClick={() => setActiveTab("profile")}>
                    Профиль
                </button>
                <button className={activeTab === "ads" ? "active" : ""} onClick={() => setActiveTab("ads")}>
                    Мои объявления
                </button>
                <button className={activeTab === "favorites" ? "active" : ""} onClick={() => setActiveTab("favorites")}>
                    Избранное
                </button>
                <button className={activeTab === "settings" ? "active" : ""} onClick={() => setActiveTab("settings")}>
                    Настройки
                </button>
            </div>

            {/* CONTENT */}
            <div className="tab-content">
                {activeTab === "profile" && <ProfileInfo user={user} />}
                {activeTab === "ads" && <MyAds />}
                {activeTab === "favorites" && <Favorites />}
                {activeTab === "settings" && <Settings logout={logout} />}
            </div>

        </div>
    );
}