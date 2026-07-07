import { useState } from 'react';
import convertMoney from '../../utils/money';
import DeliveryOption from './DeliveryOption';
import getDate from '../../utils/getDate';

export default function CartItem({product,quantity,deliveryOptions}){
    const [currDeliveryOption,setCurrDeliveryOption]=useState("1");
    const [currDate,setCurrDate]=useState(getDate(0));

    return (
        <div className="px-4 py-5 border border-neutral-300 rounded-md flex flex-col gap-4">
            <h4 className="text-[19px] text-green-700 font-bold">Delivery date: {currDate}</h4>
            <div className="flex justify-between gap-2">
                <div className="flex grow items-start gap-6">
                    <img className="w-25" src={product.image} alt="" />
                    <div className="flex flex-col">
                        <h6 className="font-bold">{name}</h6>
                        <span className="font-bold">${convertMoney(product.priceCents)}</span>
                        <div className="flex gap-1.5">
                            <span>Quantity: {quantity}</span>
                            <button className="text-green-700 hover:text-green-700/70 active:text-green-700 cursor-pointer">Update</button>
                            <button className="text-green-700 hover:text-green-700/70 active:text-green-700 cursor-pointer">Delete</button>
                        </div>
                    </div>
                </div>
                <fieldset className="w-75 shrink-0 flex flex-col gap-2">
                    <legend className="font-bold">Choose a delivery option:</legend>
                    <div className="flex flex-col gap-3">
                        {deliveryOptions.map((el)=>{
                            return <DeliveryOption productId={product.id} priceCents={el.priceCents} date={getDate(el.deliveryDays)} id={el.id} key={el.id} currDeliveryOption={currDeliveryOption} setCurrDeliveryOption={setCurrDeliveryOption} setCurrDate={setCurrDate}/>;
                        })}
                    </div>
                </fieldset>
            </div>
        </div>
    );
}