export default function AdCard({ ad }: any) {
    return (
        <div
            style={{
                borderRadius: 16,
                overflow: "hidden",
                background: "#fff",
                cursor: "pointer",
                transition: "0.2s",
                boxShadow: "0 2px 10px rgba(0,0,0,0.06)"
            }}
            onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.1)";
            }}
            onMouseLeave={e => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,0.06)";
            }}
        >
            {/* IMAGE */}
            <div style={{ position: "relative" }}>
                <img
                    src={ad.images?.[0]}
                    style={{
                        width: "100%",
                        height: 180,
                        objectFit: "cover",
                        background: "#f0f0f0"
                    }}
                />

                {/* PRICE */}
                <div style={{
                    position: "absolute",
                    bottom: 10,
                    left: 10,
                    background: "rgba(0,0,0,0.7)",
                    color: "#fff",
                    padding: "6px 10px",
                    borderRadius: 8,
                    fontWeight: 600
                }}>
                    {ad.price} ₸
                </div>
            </div>

            {/* INFO */}
            <div style={{ padding: 12 }}>
                <h3 style={{
                    margin: 0,
                    fontSize: 16,
                    fontWeight: 600
                }}>
                    {ad.brand} {ad.model}, {ad.year}
                </h3>

                <p style={{
                    margin: "6px 0",
                    color: "#666",
                    fontSize: 14
                }}>
                    {ad.mileage} км · {ad.city}
                </p>

                <p style={{
                    margin: 0,
                    color: "#999",
                    fontSize: 13
                }}>
                    {ad.description?.slice(0, 60)}
                </p>
            </div>
        </div>
    );
}