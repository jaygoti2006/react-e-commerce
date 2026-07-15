import { useState, useRef, useContext, useMemo } from 'react';
import convertMoney from '../../utils/money';
import DeliveryOption from './DeliveryOption';
import getDate from '../../utils/getDate';
import CartContext from '../../contexts/CartContext';
import ToastContext from '../../contexts/ToastContext';

export default function CartItem({ cartItem: {product, quantity, deliveryOptionId}, deliveryOptions }) {
    const { updateCartItem, deleteCartItem } = useContext(CartContext);
    const { showToast } = useContext(ToastContext);
    const [updateEnable, setUpdateEnable] = useState(false);
    const updateInputRef = useRef(null);
    const currDeliveryOption = useMemo(()=>{
        const res=deliveryOptions.filter((d)=>d.id===deliveryOptionId);
        if(res.length===0) return null;
        return res[0];
    },[deliveryOptionId,deliveryOptions]);

    function handleUpdate() {
        setUpdateEnable(!updateEnable);
        if (updateEnable) updateCartItem(product,{quantity: Number(updateInputRef.current.value)}).then(()=>showToast({
            type: "success",
            message: "Updated quantity of item!"
        })).catch(()=>showToast({
            type: "error",
            message: "Updating quantity failed!"
        }));
    }

    function handleDelete() {
        deleteCartItem(product.id,quantity).then(()=>showToast({
            type: "success",
            message: "Removed item from cart!"
        })).catch(()=>showToast({
            type: "error",
            message: "Removing item failed!"
        }));
    }

    return (
        <div className="px-4 py-5 border border-neutral-300 rounded-md flex flex-col gap-4">
            <h4 className="text-[19px] text-green-700 font-bold">Delivery date: {(currDeliveryOption)?getDate(currDeliveryOption.deliveryDays):""}</h4>
            <div className="flex justify-between gap-2">
                <div className="flex grow items-start gap-6">
                    <img className="w-25" src={product.image} alt="" />
                    <div className="flex flex-col">
                        <h6 className="font-bold">{name}</h6>
                        <span className="font-bold">${convertMoney(product.priceCents)}</span>
                        <div className="flex gap-1.5 items-center">
                            <span>Quantity: {(!updateEnable) ? quantity : ""}</span>
                            <input type="number" className={`${(updateEnable) ? "block" : "hidden"} w-12 border border-neutral-300 rounded-sm pl-1`} defaultValue={quantity} min="1" ref={updateInputRef} />
                            <button className="text-green-700 hover:text-green-700/70 active:text-green-700 cursor-pointer" onClick={handleUpdate}>{(updateEnable) ? "Save" : "Update"}</button>
                            <button className="text-green-700 hover:text-green-700/70 active:text-green-700 cursor-pointer" onClick={handleDelete}>Delete</button>
                        </div>
                    </div>
                </div>
                <fieldset className="w-75 shrink-0 flex flex-col gap-2">
                    <legend className="font-bold">Choose a delivery option:</legend>
                    <div className="flex flex-col gap-3">
                        {deliveryOptions.map((el) => {
                            return <DeliveryOption deliveryOptions={deliveryOptions} deliveryOption={el} product={product} key={el.id} currDeliveryOption={currDeliveryOption} />;
                        })}
                    </div>
                </fieldset>
            </div>
        </div>
    );
}