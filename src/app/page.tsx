import Filter from "../components/Filter";
import ProductList from "../components/ProductList";

export default function Home() {
    return (
        <main className="min-h-screen py-4 px-4">
            <div className="flex flex-col items-center lg:items-start lg:flex-row lg:gap-x-8">
                <Filter className="w-full lg:max-w-[250px] mb-6" />
                <ProductList className="grow w-full" />
            </div>
        </main>
    );
}
