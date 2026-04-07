import { useState } from "react";
import "./CreateAd.css";

const sections = [
    { key: "brand", label: "Марка" },
    { key: "model", label: "Модель" },
    { key: "specs", label: "Характеристики" },
    { key: "mileage", label: "Пробег" },
    { key: "photos", label: "Фото" },
    { key: "package", label: "Комплектация" },
    { key: "description", label: "Описание" },
    { key: "contacts", label: "Контакты" },
    { key: "price", label: "Цена" },
];

export default function CreateAd() {

    const [step, setStep] = useState(-1); // intro
    const [activeSection, setActiveSection] = useState<string | null>(null);
    const [files, setFiles] = useState<File[]>([]);
    const [form, setForm] = useState({
        vin: "",
        brand: "",
        model: "",
        year: "",
        price: "",
        city: "",
        mileage: "",
        condition: "",
        description: "",
        phone: "",
    });
    const handleFiles = (e: any) => {
        setFiles([...e.target.files]);
    };

    const handleChange = (e: any) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    // mock VIN
    const handleVin = () => {
        const vin = form.vin;

        let data: any = {};

        if (vin.startsWith("WVW")) {
            data = { brand: "Volkswagen", model: "Golf", year: "2019" };
        } else if (vin.startsWith("JT")) {
            data = { brand: "Toyota", model: "Camry", year: "2020" };
        }

        setForm(prev => ({ ...prev, ...data }));
    };

    const startForm = () => {
        if (!form.vin || form.vin.length < 3) {
            setStep(0);
            return;
        }

        handleVin();
        setStep(0);
    };

    const handleSubmit = async () => {
        try {
            const payload = {
                ...form,
                year: form.year ? Number(form.year) : null,
                price: form.price ? Number(form.price) : null,
                mileage: form.mileage ? Number(form.mileage) : null,
            };

            const formData = new FormData();

            formData.append(
                "data",
                new Blob([JSON.stringify(payload)], { type: "application/json" })
            );

            files.forEach(file => {
                formData.append("photos", file);
            });

            const res = await fetch("http://localhost:8080/media/api/ads", {
                method: "POST",
                body: formData
            });

            if (!res.ok) {
                const text = await res.text();
                console.error(text);
                throw new Error("Ошибка создания объявления");
            }

            const data = await res.json();

            console.log("SUCCESS:", data);
            alert("Объявление создано");

        } catch (e) {
            console.error(e);
            alert("Ошибка");
        }
    };


    return (
        <div className="create-ad-page">

            <div className="create-ad-card">

                {/* INTRO */}
                {step === -1 && (
                    <div className="intro">
                        <h1>Продайте свой автомобиль</h1>

                        <p className="subtitle">
                            Укажите VIN, а мы заполним объявление за вас
                        </p>

                        <div className="vin-box">
                            <input
                                name="vin"
                                placeholder="Введите VIN"
                                value={form.vin}
                                onChange={handleChange}
                            />

                            <button onClick={startForm}>
                                Далее
                            </button>

                            <span
                                className="manual-link"
                                onClick={() => setStep(0)}
                            >
                                Заполнить вручную
                            </span>
                        </div>
                    </div>
                )}

                {/* FORM */}
                {step >= 0 && (
                    <>
                        <h2 className="page-title">
                            Добавление объявления
                        </h2>

                        <div className="sections">
                            {sections.map((section) => (
                                <div key={section.key} className="section">

                                    {/* HEADER */}
                                    <div
                                        className="section-header"
                                        onClick={() =>
                                            setActiveSection(activeSection === section.key ? null : section.key)
                                        }
                                    >
                                        {section.label}
                                    </div>

                                    {/* CONTENT */}
                                    {activeSection === section.key && (
                                        <div className="section-content">

                                            {section.key === "brand" && (
                                                <input
                                                    name="brand"
                                                    placeholder="Марка"
                                                    value={form.brand}
                                                    onChange={handleChange}
                                                />
                                            )}

                                            {section.key === "model" && (
                                                <input
                                                    name="model"
                                                    placeholder="Модель"
                                                    value={form.model}
                                                    onChange={handleChange}
                                                />
                                            )}

                                            {section.key === "specs" && (
                                                <input
                                                    name="year"
                                                    placeholder="Год"
                                                    value={form.year}
                                                    onChange={handleChange}
                                                />
                                            )}

                                            {section.key === "mileage" && (
                                                <input
                                                    name="mileage"
                                                    placeholder="Пробег"
                                                    value={form.mileage}
                                                    onChange={handleChange}
                                                />
                                            )}

                                            {section.key === "photos" && (
                                                <div className="section-content">
                                                <input type="file" multiple onChange={handleFiles} />
                                                </div>
                                            )}

                                            {section.key === "package" && (
                                                <input
                                                    name="condition"
                                                    placeholder="Комплектация"
                                                    value={form.condition}
                                                    onChange={handleChange}
                                                />
                                            )}

                                            {section.key === "description" && (
                                                <textarea
                                                    name="description"
                                                    placeholder="Описание"
                                                    value={form.description}
                                                    onChange={handleChange}
                                                />
                                            )}

                                            {section.key === "contacts" && (
                                                <input
                                                    name="phone"
                                                    placeholder="Телефон"
                                                    value={form.phone}
                                                    onChange={handleChange}
                                                />
                                            )}

                                            {section.key === "price" && (
                                                <input
                                                    name="price"
                                                    placeholder="Цена"
                                                    value={form.price}
                                                    onChange={handleChange}
                                                />
                                            )}

                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* SUBMIT */}
                        <div className="submit-wrapper">
                            <button className="btn btn-primary" onClick={handleSubmit}>
                                Опубликовать
                            </button>
                        </div>
                    </>
                )}

            </div>

        </div>
    );
}