interface Car {
    id: number;
    brand: string;
    name: string;
    price: string;
    image: string;
}

const cars: Car[] = [
    { id: 1, brand: "Toyota", name: "Camry", price: "$20,000", image: "https://via.placeholder.com/200x120" },
    { id: 2, brand: "Honda", name: "Civic", price: "$18,500", image: "https://via.placeholder.com/200x120" },
    { id: 3, brand: "Tesla", name: "Model 3", price: "$35,000", image: "https://via.placeholder.com/200x120" },
];

export default function CarCard({ car }: { car: Car }) {
    return (
        <div className="car-card">
            <img src={car.image} alt={car.name} />
            <h3>{car.brand} {car.name}</h3>
            <p>{car.price}</p>
        </div>
    );
}

export { cars };
