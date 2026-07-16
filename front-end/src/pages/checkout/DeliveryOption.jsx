import { useContext } from 'react';
import convertMoney from '../../utils/money';
import CartContext from '../../contexts/CartContext';
import getDate from '../../utils/getDate';
import ToastContext from '../../contexts/ToastContext';

export default function DeliveryOption({ deliveryOption: {id, priceCents, deliveryDays} , product, currDeliveryOption }) {
    const { updateCartItem } = useContext(CartContext);
    const { showToast } = useContext(ToastContext);

    function handleChange() {
        updateCartItem(product,{dId: id}).then(()=>showToast({
            type: "success",
            message: "Updated delivery option!"
        })).catch(()=>showToast({
            type: "error",
            message: "Updating delivery option failed!"
        }));
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