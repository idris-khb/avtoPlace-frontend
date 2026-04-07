interface Car {
    id: number;
    brand: string;
    name: string;
    price: string;
    images: string[];
}

export default function CarCard({ car }: { car: any }) {
    console.log("CAR:", car);

    return (
        <div className="car-card">
            <img
                src={car.images?.[0]}
                alt={car.name}
                onError={() => console.log("IMAGE ERROR:", car.images?.[0])}
            />
            <h3>{car.brand} {car.name}</h3>
            <p>{car.price}</p>
        </div>
    );
}
