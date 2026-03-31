import { useNavigate } from "react-router-dom";
import "./MyAds.css"

export default function MyAds() {
    const navigate = useNavigate();

    return (
        <div className="myads-container">

            {/* HEADER ВКЛАДКИ */}
            <div className="myads-header">
                <h3>Мои объявления</h3>

                <button
                    className="add-ad-btn"
                    onClick={() => navigate("/create-ad")}
                >
                    + Добавить объявление
                </button>
            </div>

            {/* СПИСОК ОБЪЯВЛЕНИЙ */}
            <div className="myads-list">
                {/* тут потом будут карточки */}
                <p>Пока нет объявлений</p>
            </div>

        </div>
    );
}