import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { CarAd } from "../types/CarAd";
import Header from "../components/Header";
import "./AddCarPage.css";

interface Props {
    onAddAd: (ad: CarAd) => void;
}

const BRANDS = [
    { name: "Toyota", logo: "/brands/toyota.png" },
    { name: "BMW", logo: "/brands/bmw.png" },
    { name: "Mercedes-Benz", logo: "/brands/mercedes.png" },
    { name: "Hyundai", logo: "/brands/hyundai.png" },
    { name: "Kia", logo: "/brands/kia.png" },
    { name: "Volkswagen", logo: "/brands/vw.png" },
    { name: "Honda", logo: "/brands/honda.png" },
    { name: "Chevrolet", logo: "/brands/chevrolet.png" },
    { name: "Lexus", logo: "/brands/lexus.png" },
    { name: "Nissan", logo: "/brands/nissan.png" },
];

export default function AddCarPage({ onAddAd }: Props) {
    const navigate = useNavigate();

    const [brand, setBrand] = useState("");
    const [isBrandOpen, setIsBrandOpen] = useState(false);
    const [model, setModel] = useState("");
    const [price, setPrice] = useState("");
    const [photos, setPhotos] = useState<File[]>([]);

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const selectedFiles = Array.from(e.target.files);
        const newPhotos = [...photos, ...selectedFiles].slice(0, 5);
        setPhotos(newPhotos);
    };

    const removePhoto = (index: number) => {
        setPhotos(photos.filter((_, i) => i !== index));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!brand || !model || !price || photos.length === 0) {
            alert("Пожалуйста, заполните все поля и добавьте хотя бы одно фото.");
            return;
        }

        const ad: CarAd = {
            id: crypto.randomUUID(),
            brand,
            model,
            price: Number(price),
            photos: photos.map((p) => URL.createObjectURL(p)),
        };

        onAddAd(ad);
        navigate("/");
    };

    return (
        <>
            <Header />

            <div className="add-car">
                <h2>Публикация автомобиля</h2>

                <form className="add-car-form" onSubmit={handleSubmit}>
                    {/* Выбор марки */}
                    <div className="brand-field">
                        <div
                            className="brand-input"
                            onClick={() => setIsBrandOpen(!isBrandOpen)}
                        >
                            {brand || "Выберите марку"}
                        </div>

                        {isBrandOpen && (
                            <div className="brand-dropdown">
                                {BRANDS.map((b) => (
                                    <div
                                        key={b.name}
                                        className="brand-item"
                                        onClick={() => {
                                            setBrand(b.name);
                                            setIsBrandOpen(false);
                                        }}
                                    >
                                        <img src={b.logo} alt={b.name} />
                                        <span>{b.name}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Модель */}
                    <input
                        type="text"
                        placeholder="Модель"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        required
                    />

                    {/* Цена */}
                    <input
                        type="number"
                        placeholder="Цена"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />

                    {/* Фото */}
                    <div className="photo-section">
                        {/* Кнопка Добавить фото */}
                        <label className="photo-upload">
                            Добавить фото
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                style={{ display: "none" }} // полностью скрываем input
                                onChange={handlePhotoUpload}
                            />
                        </label>

                        <div className="photo-preview">
                            {photos.map((photo, index) => (
                                <div key={index} className="photo-item">
                                    <img src={URL.createObjectURL(photo)} alt="preview" />
                                    <button type="button" onClick={() => removePhoto(index)}>×</button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Кнопка Опубликовать */}
                    <button type="submit">Опубликовать</button>
                </form>
            </div>
        </>
    );
}
