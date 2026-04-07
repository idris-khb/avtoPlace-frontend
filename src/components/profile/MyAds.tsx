import { useNavigate } from "react-router-dom";

export default function MyAds() {
    const navigate = useNavigate();

    return (
        <div className="myads-container">

            {/* LIST */}
            <div className="myads-list">
                <p className="subtitle">Пока нет объявлений</p>
            </div>

            {/* FOOTER BUTTON */}
            <div className="myads-footer">
                <button
                    className="btn btn-primary"
                    onClick={() => navigate("/create-ad")}
                >
                    + Добавить объявление
                </button>
            </div>

        </div>
    );
}