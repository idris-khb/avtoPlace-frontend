import { Link } from "react-router-dom";
import Header from "../components/Header";
import type { CarAd } from "../types/CarAd";
import "./HomePage.css";

interface Props {
    ads: CarAd[];
}

export default function HomePage({ ads }: Props) {
    return (
        <>
            <Header />

            <div className="feed">
                {ads.length === 0 && (
                    <p className="empty-feed">
                        Пока нет объявлений. Добавьте первое авто.
                    </p>
                )}

                {ads.map((ad) => (
                    <div key={ad.id} className="ad-card">
                        {ad.photos[0] && (
                            <img
                                src={ad.photos[0]}
                                alt={`${ad.brand} ${ad.model}`}
                            />
                        )}
                        <h3>{ad.brand} {ad.model}</h3>
                        <p>{ad.price.toLocaleString()} ₸</p>
                    </div>
                ))}
            </div>

            {/* Кнопка добавления объявления внизу по центру */}
            <Link to="/add-car" className="center-add-button">+ Добавить объявление</Link>
        </>
    );
}
