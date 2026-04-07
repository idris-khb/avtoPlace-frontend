import { useEffect, useState } from "react";

type Props = {
    open: boolean;
    onClose: () => void;
    filters: any;
    onChange: (filters: any) => void;
};

const brands = ["BMW", "Toyota", "Mercedes", "Audi"];
const modelsMap: Record<string, string[]> = {
    BMW: ["X5", "X6", "3 Series"],
    Toyota: ["Camry", "Corolla", "Land Cruiser"],
    Mercedes: ["E200", "C180", "S500"],
    Audi: ["A6", "A4", "Q7"]
};

export default function FiltersDrawer({
                                          open,
                                          onClose,
                                          filters,
                                          onChange
                                      }: Props) {

    const [local, setLocal] = useState(filters);

    useEffect(() => {
        setLocal(filters);
    }, [filters]);

    useEffect(() => {
        const t = setTimeout(() => {
            onChange(local);
        }, 300);

        return () => clearTimeout(t);
    }, [local]);

    if (!open) return null;

    const models = local.brand ? modelsMap[local.brand] || [] : [];

    return (
        <>
            {/* overlay */}
            <div
                onClick={onClose}
                style={{
                    position: "fixed",
                    inset: 0,
                    background: "rgba(0,0,0,0.4)",
                    zIndex: 1000
                }}
            />

            {/* drawer */}
            <div style={drawerStyle}>

                {/* HEADER */}
                <div style={headerStyle}>
                    <h2>Фильтры</h2>
                    <span onClick={onClose} style={{ cursor: "pointer" }}>✕</span>
                </div>

                {/* CONTENT */}
                <div style={{ overflowY: "auto", flex: 1 }}>

                    {/* БРЕНД */}
                    <Field label="Марка">
                        <select
                            value={local.brand || ""}
                            onChange={(e) =>
                                setLocal({
                                    ...local,
                                    brand: e.target.value,
                                    model: ""
                                })
                            }
                            style={input}
                        >
                            <option value="">Все</option>
                            {brands.map(b => (
                                <option key={b}>{b}</option>
                            ))}
                        </select>
                    </Field>

                    {/* МОДЕЛЬ */}
                    <Field label="Модель">
                        <select
                            value={local.model || ""}
                            onChange={(e) =>
                                setLocal({ ...local, model: e.target.value })
                            }
                            style={input}
                            disabled={!local.brand}
                        >
                            <option value="">Все</option>
                            {models.map(m => (
                                <option key={m}>{m}</option>
                            ))}
                        </select>
                    </Field>

                    {/* ГОД */}
                    <Field label="Год">
                        <div style={row}>
                            <input
                                placeholder="От"
                                value={local.yearFrom || ""}
                                onChange={(e) =>
                                    setLocal({ ...local, yearFrom: e.target.value })
                                }
                                style={input}
                            />
                            <input
                                placeholder="До"
                                value={local.yearTo || ""}
                                onChange={(e) =>
                                    setLocal({ ...local, yearTo: e.target.value })
                                }
                                style={input}
                            />
                        </div>
                    </Field>

                    {/* ОБЪЁМ */}
                    <Field label="Объём двигателя">
                        <div style={row}>
                            <input
                                placeholder="От (1.6)"
                                value={local.engineFrom || ""}
                                onChange={(e) =>
                                    setLocal({ ...local, engineFrom: e.target.value })
                                }
                                style={input}
                            />
                            <input
                                placeholder="До (5.0)"
                                value={local.engineTo || ""}
                                onChange={(e) =>
                                    setLocal({ ...local, engineTo: e.target.value })
                                }
                                style={input}
                            />
                        </div>
                    </Field>

                    {/* ПРОБЕГ */}
                    <Field label="Пробег (км)">
                        <input
                            placeholder="До"
                            value={local.mileageTo || ""}
                            onChange={(e) =>
                                setLocal({ ...local, mileageTo: e.target.value })
                            }
                            style={input}
                        />
                    </Field>

                    {/* ЦЕНА */}
                    <Field label="Цена">
                        <div style={row}>
                            <input
                                placeholder="От"
                                value={local.minPrice || ""}
                                onChange={(e) =>
                                    setLocal({ ...local, minPrice: e.target.value })
                                }
                                style={input}
                            />
                            <input
                                placeholder="До"
                                value={local.maxPrice || ""}
                                onChange={(e) =>
                                    setLocal({ ...local, maxPrice: e.target.value })
                                }
                                style={input}
                            />
                        </div>
                    </Field>

                </div>

                {/* FOOTER */}
                <div style={{ borderTop: "1px solid #eee", paddingTop: 12 }}>

                    <button
                        onClick={() => setLocal({})}
                        style={btnReset}
                    >
                        Сбросить
                    </button>

                    <button
                        onClick={onClose}
                        style={btnApply}
                    >
                        Показать
                    </button>
                </div>
            </div>
        </>
    );
}

/* ---------- UI helpers ---------- */

function Field({ label, children }: any) {
    return (
        <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, color: "#666" }}>{label}</label>
            {children}
        </div>
    );
}

const drawerStyle: React.CSSProperties = {
    position: "fixed",
    right: 0,
    top: 0,
    width: 360,
    height: "100%",
    background: "#fff",
    padding: 20,
    zIndex: 1001,
    display: "flex",
    flexDirection: "column"
};

const headerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20
};

const input: React.CSSProperties = {
    width: "100%",
    padding: 10,
    borderRadius: 8,
    border: "1px solid #ddd",
    marginTop: 6
};

const row: React.CSSProperties = {
    display: "flex",
    gap: 10
};

const btnReset: React.CSSProperties = {
    width: "100%",
    padding: 10,
    marginBottom: 8,
    border: "none",
    borderRadius: 8,
    background: "#eee",
    cursor: "pointer"
};

const btnApply: React.CSSProperties = {
    width: "100%",
    padding: 12,
    border: "none",
    borderRadius: 8,
    background: "#1976d2",
    color: "#fff",
    fontWeight: 600,
    cursor: "pointer"
};