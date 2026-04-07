import { useEffect, useState } from "react";
import Header from "../components/Header";
import AdList from "../components/AdList";
import FiltersDrawer from "../components/FiltersDrawer";
import type { CarAd } from "../types/CarAd";

export default function HomePage() {
    const [ads, setAds] = useState<CarAd[]>([]);
    const [loading, setLoading] = useState(true);
    const [filtersOpen, setFiltersOpen] = useState(false);

    const [filters, setFilters] = useState<any>({});

    // 🔥 загрузка объявлений
    const fetchAds = async (f: any) => {
        try {
            setLoading(true);

            const params = new URLSearchParams();

            Object.entries(f).forEach(([key, value]) => {
                if (value !== undefined && value !== "") {
                    params.append(key, String(value));
                }
            });

            const res = await fetch(
                `http://localhost:8080/media/api/ads?${params}`
            );

            const data = await res.json();
            setAds(data);

        } catch (e) {
            console.error("Ошибка загрузки:", e);
        } finally {
            setLoading(false);
        }
    };

    // 🔥 реакция на фильтры
    useEffect(() => {
        fetchAds(filters);
    }, [filters]);

    // первый запуск
    useEffect(() => {
        fetchAds({});
    }, []);

    return (
        <>
            <Header onOpenFilters={() => setFiltersOpen(true)} />

            <FiltersDrawer
                open={filtersOpen}
                onClose={() => setFiltersOpen(false)}
                filters={filters}
                onChange={setFilters}
            />

            <div style={{
                maxWidth: 1200,
                margin: "0 auto",
                padding: "20px 16px"
            }}>

                {/* 🔥 ЧИПСЫ АКТИВНЫХ ФИЛЬТРОВ */}
                <div style={{
                    marginBottom: 20,
                    display: "flex",
                    gap: 10,
                    flexWrap: "wrap"
                }}>
                    {filters.brand && (
                        <div style={chipStyle}>
                            {filters.brand}
                            <span onClick={() =>
                                setFilters({ ...filters, brand: "" })
                            }>✕</span>
                        </div>
                    )}

                    {filters.maxPrice && (
                        <div style={chipStyle}>
                            до {filters.maxPrice} ₸
                            <span onClick={() =>
                                setFilters({ ...filters, maxPrice: "" })
                            }>✕</span>
                        </div>
                    )}
                </div>

                {/* 📦 КОНТЕНТ */}
                {loading && (
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                        gap: 20
                    }}>
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div key={i} style={skeletonCard} />
                        ))}
                    </div>
                )}

                {!loading && ads.length === 0 && (
                    <p>Нет объявлений</p>
                )}

                {!loading && ads.length > 0 && (
                    <AdList ads={ads} />
                )}
            </div>
        </>
    );
}

// 🎨 стиль чипсов
const chipStyle: React.CSSProperties = {
    padding: "8px 12px",
    background: "#eef3ff",
    borderRadius: 20,
    display: "flex",
    gap: 8,
    alignItems: "center",
    fontSize: 14,
    border: "1px solid #d6e0ff"
};

const skeletonCard = {
    height: 240,
    borderRadius: 12,
    background: "#eee"
};