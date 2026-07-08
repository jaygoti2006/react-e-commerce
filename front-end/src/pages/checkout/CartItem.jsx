import { useState, useRef, useContext, useMemo } from 'react';
import convertMoney from '../../utils/money';
import DeliveryOption from './DeliveryOption';
import getDate from '../../utils/getDate';
import CartContext from '../../contexts/CartContext';

export default function CartItem({ product, quantity, deliveryOptionId, deliveryOptions }) {
    const { cart, setCart } = useContext(CartContext);
    const [updateEnable, setUpdateEnable] = useState(false);
    const updateInputRef = useRef(null);
    const currDeliveryOption = useMemo(()=>{
        const res=deliveryOptions.filter((d)=>d.id===deliveryOptionId);
        if(res.length===0) return null;
        return res[0];
    },[deliveryOptionId,deliveryOptions]);

    async function updateCartItem() {
        try {
            const res = await fetch(`/api/cart-items/${product.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "quantity": Number(updateInputRef.current.value)
                })
            });
            if (res.ok) {
                const data = await res.json();
                setCart({
                    items: cart.items.map((el) => {
                        if(el.productId !== product.id) return el;
                        return {...data,product};
                    }),
                    count: cart.count
                });
            } else console.error(res.status);
        } catch (e) {
            console.error(e);
        }
    };

    function handleUpdate() {
        setUpdateEnable(!updateEnable);
        if (updateEnable) updateCartItem();
    }

    async function handleDelete() {
        try {
            const res = await fetch(`/api/cart-items/${product.id}`, {
                method: "DELETE"
            });
            if (res.ok) {
                setCart({
                    items: cart.items.filter((el) => { return el.productId !== product.id; }),
                    count: cart.count - quantity
                });
            } else console.error(res.status);
        } catch (e) {
            console.error(e);
        }
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
                            return <DeliveryOption product={product} priceCents={el.priceCents} date={getDate(el.deliveryDays)} id={el.id} key={el.id} currDeliveryOption={currDeliveryOption} />;
                        })}
                    </div>
                </fieldset>
            </div>
        </div>
    );
}