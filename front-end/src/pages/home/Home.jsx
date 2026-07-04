import Header from '../../Header';
import ProductCard from './ProductCard';

export default function Home() {
    return (
        <>
            <Header />
            <div className="grid grid-cols-2 divide-x-2 divide-y-2 divide-neutral-100 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
            </div>
        </>
    );
}