import { useCallback, useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { useSearchParams } from 'react-router';

export default function Home() {
    const [products,setProducts]=useState([]);

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

    return (
        <>
            <title>E Commerce App</title>
            <link rel="icon" href="home-favicon.png"></link>
            <div className="grid grid-cols-2 divide-x-2 divide-y-2 divide-neutral-100 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {products.map((el) => {
                    return <ProductCard image={el.image} name={el.name} rating={el.rating} priceCents={el.priceCents} key={el.id} />
                })}
            </div>
        </>
    );
}