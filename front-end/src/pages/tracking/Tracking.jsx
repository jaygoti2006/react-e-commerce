import { useContext, useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router";
import OrdersContext from "../../contexts/OrdersContext";

export default function Tracking() {
    const [ searchParams ] = useSearchParams();
    const { orders } = useContext(OrdersContext);
    const progressRef = useRef(null);

    const product=useRef(undefined);

    useEffect(()=>{
        if(product.current) {
            if(Number(Date.now()) > Number(product.current.estimatedDeliveryTimeMs)) progressRef.current.style.width="90%";
            else progressRef.current.style.width="10%";
        }
    },[product.current]);

    if (!searchParams.has("orderId") || !searchParams.has("productId")) return <></>;
    
    orders.forEach((el) => {
        if (el.id === searchParams.get("orderId")) {
            el.products.forEach((el1) => {
                if (el1.productId === searchParams.get("productId")) {
                    product.current = el1;
                    return;
                }
            });
            return;
        }
    });

    if(!product.current) return <></>;
    

    return (
        <>
            <title>Tracking</title>
            <link rel="icon" href="tracking-favicon.png"></link>
            <div className="max-w-4xl px-4 mx-auto py-8 flex flex-col">
                <Link to='/orders' className="underline text-green-700 hover:text-green-700/70 self-start">View all orders</Link>
                <div className="flex flex-col gap-3 py-6 mb-7">
                    <h2 className="font-bold text-2xl">Arriving on {new Date(product.current.estimatedDeliveryTimeMs).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</h2>
                    <div className="flex flex-col leading-none gap-1.5 mb-4">
                        <h4>{product.current.product.name}</h4>
                        <span>Quantity: {product.current.quantity}</span>
                    </div>
                    <img className="w-37.5" src={product.current.product.image} alt="" />
                </div>
                <div className="flex flex-col gap-3.5">
                    <div className="flex justify-between">
                        <span className="font-medium text-xl">Preparing</span>
                        <span className="font-medium text-xl">Shipped</span>
                        <span className="font-medium text-xl">Delivered</span>
                    </div>
                    <div className="border border-neutral-300 rounded-full h-6 relative">
                        <div className="absolute inset-0 bg-[#198754] rounded-full w-0 transition-all duration-500" ref={progressRef}>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};