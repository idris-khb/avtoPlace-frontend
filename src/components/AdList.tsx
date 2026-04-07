import AdCard from "./AdCard";

export default function AdList({ ads }: any) {
    return (
        <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 20
        }}>
            {ads.map((ad: any) => (
                <AdCard key={ad.id} ad={ad} />
            ))}
        </div>
    );
}