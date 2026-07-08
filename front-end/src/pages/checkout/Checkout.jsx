import CartContext from '../../contexts/CartContext';
import CheckoutHeader from './CheckoutHeader';
import CartItem from './CartItem';
import { useCallback, useContext, useEffect, useState, useMemo } from 'react';
import {Link} from 'react-router';
import PaymentSummary from './PaymentSummary';

export default function Checkout() {
    const [deliveryOptions, setDeliveryOptions] = useState([]);
    const { cart } = useContext(CartContext);

    const getDeliveryOptions = useCallback(async function () {
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
    }, []);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        getDeliveryOptions();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const payment = useMemo(() => {
        let base = 0;
        let shipping = 0;
        for (let el of cart.items) {
            base += el.quantity * el.product.priceCents;
            const t = deliveryOptions.filter((d) => d.id === el.deliveryOptionId);
            if (t.length !== 0) shipping += t[0].priceCents;
        }
        return {
            base,
            shipping,
            "taxPr": 10
        };
    }, [cart.items, deliveryOptions]);

    return (
        <>
            <title>Checkout</title>
            <link rel="icon" href="cart-favicon.png"></link>
            <CheckoutHeader />
            <div className="lg:max-w-6xl mx-auto px-3 py-15">
                <h2 className="text-[22px] font-bold mb-4">Review your order</h2>
                <div className="flex gap-2 items-start">
                    {(cart.items.length === 0) ?
                        <div className="flex flex-col grow items-start gap-2">
                            <p>You cart is Empty.</p>
                            <Link to="/" className="btn-primary px-4 py-2.5 text-[16px]">View products</Link>
                        </div>
                        :
                        <div className="flex flex-col grow gap-3">
                            {cart.items.map((el) => {
                                return (<CartItem product={el.product} quantity={el.quantity} deliveryOptionId={el.deliveryOptionId} deliveryOptions={deliveryOptions} key={el.productId} />);
                            })}
                        </div>
                    }
                    <PaymentSummary payment={payment} />
                </div>
            </div>
        </>
    );
};