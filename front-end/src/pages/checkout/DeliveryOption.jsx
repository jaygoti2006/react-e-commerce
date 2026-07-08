import { useContext } from 'react';
import convertMoney from '../../utils/money';
import CartContext from '../../contexts/CartContext';

export default function DeliveryOption({ product, priceCents, date, id, currDeliveryOption }) {
    const { cart, setCart } = useContext(CartContext);
    async function updateCartItem() {
        try {
            const res = await fetch(`/api/cart-items/${product.id}`, {
                method: "PUT", 
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "deliveryOptionId": id
                })
            });
            if (res.ok) {
                const data = await res.json();
                setCart({
                    items: cart.items.map((el) => {
                        if (el.productId !== product.id) return el;
                        return { ...data, product };
                    }),
                    count: cart.count
                });
            } else console.error(res.status);
        } catch (e) {
            console.error(e);
        }
    };

    function handleChange() {
        updateCartItem();
    }

    return (
        <label className="flex items-center gap-2 hover:opacity-70 cursor-pointer">
            <input className="cursor-pointer w-5 h-5" type="radio" name={`delivery-option-${product.id}`} checked={currDeliveryOption.id === id} onChange={handleChange} />
            <div className="flex flex-col gap-0.5">
                <span className="font-medium">{date}</span>
                <span className="text-neutral-500 leading-none"> {(priceCents === 0) ? "Free" : `$${convertMoney(priceCents)} -`} Shipping</span>
            </div>
        </label>
    );
}