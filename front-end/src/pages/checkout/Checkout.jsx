import CheckoutHeader from './CheckoutHeader';
import { useCallback, useEffect, useState } from 'react';

export default function Checkout() {
    const [deliveryOptions,setDeliveryOptions]=useState([]);

    const getDeliveryOptions=useCallback(async function(){
        try {
            const res = await fetch("/api/delivery-options?" + new URLSearchParams({
                "expand": "estimatedDeliveryTime"
            }).toString());
            if (res.ok) {
                const data = await res.json();
                setDeliveryOptions(data);
            } else console.error(res.status);
        } catch (e) {
            console.error(e);
        }
    },[]);

    useEffect(()=>{
        // eslint-disable-next-line react-hooks/set-state-in-effect
        getDeliveryOptions();
    },[getDeliveryOptions]);

    return (
        <>
            <title>Checkout</title>
            <link rel="icon" href="cart-favicon.png"></link>
            <CheckoutHeader />
            <div className="lg:max-w-6xl mx-auto px-3 py-15">
                <h2 className="text-[22px] font-bold mb-4">Review your order</h2>
                <div className="flex gap-2">
                    <div className="grow">
                        []
                    </div>
                    <div className="w-87.5 p-4 flex flex-col gap-2 border border-neutral-300 rounded-md">
                        <h4 className="text-[19px] font-bold">Payment Summary</h4>
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-col gap-1.5">
                                <div className="flex justify-between">
                                    <span>Items (7):</span>
                                    <span>$86.35</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping & handling:</span>
                                    <span>$9.99</span>
                                </div>
                                <div className="self-end border-t border-neutral-300 w-12"></div>
                                <div className="flex justify-between">
                                    <span>Total before tax:</span>
                                    <span>$96.34</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Estimated tax (10%):</span>
                                    <span>$9.63</span>
                                </div>
                            </div>
                            <div className="border-t border-neutral-300"></div>
                            <div className="flex justify-between text-green-700 font-bold text-lg py-2">
                                <span>Order total:</span>
                                <span>$9.63</span>
                            </div>
                            <button className="btn-primary py-3.5">Place your order</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};