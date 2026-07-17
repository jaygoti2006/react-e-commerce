import { useContext } from 'react';
import convertMoney from '../../utils/money';
import CartContext from '../../contexts/CartContext';
import getDate from '../../utils/getDate';

export default function DeliveryOption({ deliveryOption: { id, priceCents, deliveryDays }, product, currDeliveryOption }) {
    const { cart, requestDebounceAction } = useContext(CartContext);

    function handleChange() {
        const currCartItem = cart.items.find(el => el.productId === product.id);
        const newCartItem = {
            product,
            productId: product.id,
            quantity: currCartItem.quantity,
            deliveryOptionId: id
        };

        requestDebounceAction(product.id, newCartItem, "Updating delivery option failed!", "Updated delivery option!");
    }

    return (
        <label className="flex items-center gap-2 hover:opacity-70 cursor-pointer">
            <input className="cursor-pointer w-5 h-5" type="radio" name={`delivery-option-${product.id}`} checked={currDeliveryOption?.id === id} onChange={handleChange} />
            <div className="flex flex-col gap-0.5">
                <span className="font-medium">{getDate(deliveryDays)}</span>
                <span className="text-neutral-500 leading-none"> {(priceCents === 0) ? "Free" : `$${convertMoney(priceCents)} -`} Shipping</span>
            </div>
        </label>
    );
}