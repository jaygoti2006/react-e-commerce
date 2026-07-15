import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { useSearchParams } from 'react-router';
import { getProductsApi } from '../../api/products';
import ErrorFetchFailed from '../error/ErrorFetchFailed';

const countPerPage = 18;

export default function Home() {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [loaded, setLoaded] = useState(true);

    const [params] = useSearchParams();
    const search = (params.get("search")) ? params.get("search") : "";

    useEffect(() => {
        getProductsApi(search).then(data => { setProducts(data) }).catch((e) => {
            if (e.type === "HTTP_ERROR" && e.status >= 500) setLoaded(false);
        });
    }, [search]);

    function handleLoad() {
        setPage(page + 1);
    }

    return (
        <>
            <title>E Commerce App</title>
            <link rel="icon" href="home-favicon.png"></link>
            {
                (loaded) ?
                    <>
                        {
                            (products.length > 0) ?
                                <div className="grid grid-cols-2 divide-x-2 divide-y-2 divide-neutral-100 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                                    {products.slice(0, page * countPerPage).map((product) => {
                                        return <ProductCard product={product} key={product.id} />
                                    })}
                                </div> :
                                <h2 className="w-fit mx-auto py-15 text-4xl font-bold">
                                    No data found!
                                </h2>
                        }
                        {(products.length > page * countPerPage) ?
                            <button className="block btn-secondary px-4 py-2.5 mx-auto my-6" onClick={handleLoad}>Load More</button> : ""
                        }
                    </> :
                    <ErrorFetchFailed />
            }
        </>
    );
}