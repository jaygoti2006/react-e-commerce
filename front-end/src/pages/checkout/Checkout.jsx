import CartContext from '../../contexts/CartContext';
import CheckoutHeader from './CheckoutHeader';
import CartItem from './CartItem';
import { useCallback, useContext, useEffect, useState } from 'react';
import PaymentSummary from './PaymentSummary';

export default function Checkout() {
    const [deliveryOptions,setDeliveryOptions]=useState([]);
    const {cartItems}=useContext(CartContext);
    const [payment,setPayment]=useState({
        "base": 0,
        "shipping": 0,
        "taxPr": 10,
    });

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
                <div className="flex gap-2 items-start">
                    <div className="flex flex-col grow gap-3">
                        {cartItems.map((el)=>{
                            return (<CartItem product={el.product} quantity={el.quantity} deliveryOptions={deliveryOptions} key={el.productId}/>);
                        })}
                    </div>
                    <PaymentSummary payment={payment}/>
                </div>
            </div>
        </>
    );
};