import { useCallback, useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { useSearchParams } from 'react-router';

const countPerPage=18;

export default function Home() {
    const [products,setProducts]=useState([]);
    const [page,setPage]=useState(1);

    const getProducts = useCallback(async function (search) {
        try {
            const res = await fetch("/api/products?" + new URLSearchParams({
                "search": search
            }).toString());
            if (res.ok) {
                const data = await res.json();
                setProducts(data);
            } else console.error(res.status);
        } catch (e) {
            console.error(e);
        }
    }, []);

    const [params]=useSearchParams();
    const search=(params.get("search"))?params.get("search"):"";

    useEffect(()=>{
        // eslint-disable-next-line react-hooks/set-state-in-effect
        getProducts(search);
    },[search,getProducts]);

    function handleLoad(){
        setPage(page+1);
    }

    return (
        <>
            <title>E Commerce App</title>
            <link rel="icon" href="home-favicon.png"></link>
            <div className="grid grid-cols-2 divide-x-2 divide-y-2 divide-neutral-100 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {products.slice(0,page*countPerPage).map((product) => {
                    return <ProductCard product={product} key={product.id}/>
                })}
            </div>
            { (products.length>page*countPerPage) ?
                <button className="block btn-secondary px-4 py-2.5 mx-auto my-6" onClick={handleLoad}>Load More</button> : ""
            }
        </>
    );
}