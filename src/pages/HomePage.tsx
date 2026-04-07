import { useEffect, useState } from "react";
import Header from "../components/Header";
import AdList from "../components/AdList";
import type { CarAd } from "../types/CarAd";

export default function HomePage() {
    const [ads, setAds] = useState<CarAd[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:8080/media/api/ads")
            .then(res => {
                if (!res.ok) {
                    throw new Error("Ошибка загрузки");
                }
                return res.json();
            })
            .then(data => {
                setAds(data);
            })
            .catch(err => {
                console.error("Ошибка:", err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <>
            <Header />

            {loading && <p>Загрузка...</p>}

            {!loading && ads.length === 0 && (
                <p>Нет объявлений</p>
            )}

            {!loading && ads.length > 0 && (
                <AdList ads={ads} />
            )}
        </>
    );
}