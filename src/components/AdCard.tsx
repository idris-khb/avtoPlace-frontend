export default function AdCard({ ad }: any) {
    console.log("AD-images:", ad.images);
    return (
        <div style={{
            borderRadius: 12,
            border: "1px solid #e5e5e5",
            overflow: "hidden",
            background: "#fff",
            cursor: "pointer"
        }}>

            {/* КАРТИНКА */}
            <div style={{ position: "relative" }}>
                <img
                    src={ad.images?.[0]}
                    style={{
                        width: "100%",
                        height: 180,
                        objectFit: "cover"
                    }}
                />

                {/* Цена поверх картинки */}
                <div style={{
                    position: "absolute",
                    bottom: 10,
                    left: 10,
                    background: "rgba(0,0,0,0.6)",
                    color: "#fff",
                    padding: "4px 8px",
                    borderRadius: 6,
                    fontWeight: "bold"
                }}>
                    {ad.price} ₸
                </div>
            </div>

            {/* ИНФО */}
            <div style={{ padding: 12 }}>

                <h3 style={{ margin: 0 }}>
                    {ad.brand} {ad.model}, {ad.year}
                </h3>

                <p style={{ margin: "6px 0", color: "#555" }}>
                    {ad.mileage} km · {ad.city}
                </p>

                <p style={{ margin: "6px 0", color: "#777", fontSize: 14 }}>
                    {ad.description?.slice(0, 80)}
                </p>

            </div>

        </div>
    );
}