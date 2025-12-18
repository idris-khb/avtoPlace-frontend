import Header from "../components/Header";
import Hero from "../components/Hero";
import CarCard, { cars } from "../components/CarCard";

export default function HomePage() {
    return (
        <div>
            <Header />
            <Hero />
            <section className="cars-container">
                {cars.map(car => <CarCard key={car.id} car={car} />)}
            </section>
        </div>
    );
}
