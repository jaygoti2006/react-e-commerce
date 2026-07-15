import { useContext, useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router";
import OrdersContext from "../../contexts/OrdersContext";

export default function Tracking() {
    const [searchParams] = useSearchParams();
    const { orders } = useContext(OrdersContext);
    const progressRef = useRef(null);

    const product = orders.data.find(order => order.id === searchParams.get("orderId"))?.products.find(
        product => product.productId === searchParams.get("productId")
    );

    useEffect(() => {
        if (product) {
            if (Number(Date.now()) > Number(product.estimatedDeliveryTimeMs)) progressRef.current.style.width = "90%";
            else progressRef.current.style.width = "10%";
        }
    }, [product]);

    if (!searchParams.has("orderId") || !searchParams.has("productId") || !product) return <></>;

    return (
        <>
            <title>Tracking</title>
            <link rel="icon" href="tracking-favicon.png"></link>
            <div className="max-w-4xl px-4 mx-auto py-8 flex flex-col">
                <Link to='/orders' className="underline text-green-700 hover:text-green-700/70 self-start">View all orders</Link>
                <div className="flex flex-col gap-3 py-6 mb-7">
                    <h2 className="font-bold text-2xl">Arriving on {new Date(product.estimatedDeliveryTimeMs).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</h2>
                    <div className="flex flex-col leading-none gap-1.5 mb-4">
                        <h4>{product.product.name}</h4>
                        <span>Quantity: {product.quantity}</span>
                    </div>
                    <img className="w-37.5" src={product.product.image} alt="" />
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