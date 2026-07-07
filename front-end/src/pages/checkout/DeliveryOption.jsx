import { useCallback } from 'react';
import convertMoney from '../../utils/money';

export default function DeliveryOption({productId,priceCents,date,id,currDeliveryOption,setCurrDeliveryOption,setCurrDate}) {
    const handleChange = useCallback(()=>{
        setCurrDeliveryOption(id);
        setCurrDate(date);
    },[date,id,setCurrDate,setCurrDeliveryOption]);

    return (
        <label className="flex items-center gap-2 hover:opacity-70 cursor-pointer">
            <input className="cursor-pointer w-5 h-5" type="radio" name={`delivery-option-${productId}`} checked={currDeliveryOption===id} onChange={handleChange} />
            <div className="flex flex-col gap-0.5">
                <span className="font-medium">{date}</span>
                <span className="text-neutral-500 leading-none"> {(priceCents===0)?"Free":`$${convertMoney(priceCents)} -`} Shipping</span>
            </div>
        </label>
    );
}