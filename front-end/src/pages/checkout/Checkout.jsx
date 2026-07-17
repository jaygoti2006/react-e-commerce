import CartContext from '../../contexts/CartContext';
import CheckoutHeader from './CheckoutHeader';
import CartItem from './CartItem';
import { useContext, useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router';
import PaymentSummary from './PaymentSummary';
import { getDeliveryOptionsApi } from '../../api/cart';
import ErrorFetchFailed from '../error/ErrorFetchFailed';
import ToastContext from '../../contexts/ToastContext';

export default function Checkout() {
    const [deliveryOptions, setDeliveryOptions] = useState({
        data: [],
        status: 0
    });
    const { cart, deleteAll } = useContext(CartContext);
    const { showToast } = useContext(ToastContext);

    useEffect(() => {
        getDeliveryOptionsApi().then(data => { setDeliveryOptions({ data: data, status: 1 }) }).catch(() => {
            showToast({
                type: "error",
                message: "Failed to load delivery options!"
            });
            setDeliveryOptions({ data: [], status: -1 });
        });
    }, []);

    const payment = useMemo(() => {
        let base = 0;
        let shipping = 0;
        for (let el of cart.items) {
            base += el.quantity * el.product.priceCents;
            const t = deliveryOptions.data.filter((d) => d.id === el.deliveryOptionId);
            if (t.length !== 0) shipping += t[0].priceCents;
        }
        return {
            base,
            shipping,
            "taxPr": 10
        };
    }, [cart.items, deliveryOptions]);

    function handleClear() {
        if (cart.items.length > 0) {
            deleteAll().then(() => showToast({
                type: "success",
                message: "Cleared cart!"
            })).catch(() => showToast({
                type: "error",
                message: "Clearing cart failed!"
            }));
        }
    }

    return (
        <>
            <title>Checkout</title>
            <link rel="icon" href="cart-favicon.png"></link>
            <CheckoutHeader />

            {(cart.loaded && deliveryOptions.status!==-1) ?
                <>
                    <button onClick={handleClear} className="flex items-center gap-2 fixed bottom-10 right-10 btn-primary text-[16px] px-4 py-2.5 rounded-full" >
                        <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 1024 1024"><path d="M352 192V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64H96a32 32 0 0 1 0-64h256zm64 0h192v-64H416v64zM192 960a32 32 0 0 1-32-32V256h704v672a32 32 0 0 1-32 32H192zm224-192a32 32 0 0 0 32-32V416a32 32 0 0 0-64 0v320a32 32 0 0 0 32 32zm192 0a32 32 0 0 0 32-32V416a32 32 0 0 0-64 0v320a32 32 0 0 0 32 32z" /></svg>
                        <span>Clear</span>
                    </button>
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
                                        return (<CartItem cartItem={el} deliveryOptions={deliveryOptions} key={el.productId} />);
                                    })}
                                </div>
                            }
                            <PaymentSummary payment={payment} />
                        </div>
                    </div>
                </> :
                <ErrorFetchFailed />
            }
        </>
    );
};