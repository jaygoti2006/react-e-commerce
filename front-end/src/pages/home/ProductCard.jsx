import convertMoney from '../../utils/money';
import { useRef } from 'react';

export default function ProductCard({image,name,rating,priceCents}) {
    const addedLabelRef=useRef(null);
    function handleAdd(){
        addedLabelRef.current.style.opacity=1;
        setTimeout(()=>{addedLabelRef.current.style.opacity=0;},2000);
    }
    return (
        <div className="p-6">
            <div className="p-4">
                <img className="w-full rounded-md" src={image} alt="" />
            </div>
            <div className="flex flex-col gap-2.5">
                <h4 className="line-clamp-2 h-12">{name}</h4>
                <div className="flex items-center gap-2">
                    <img className="max-w-25" src={`/images/ratings/rating-${rating.stars*10}.png`} alt="" />
                    <a href="" className="cursor-pointer text-green-700 hover:text-green-700/70 active:text-green-700">{rating.count}</a>
                </div>
                <span className="font-bold text-black">${convertMoney(priceCents)}</span>
                <select className="self-start cursor-pointer border border-neutral-300 rounded-sm px-1 py-0.5 text-[15px] focus-visible:ring-green-700!" name="quantity">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
                <div className="flex flex-col mt-2 gap-2">
                    <div className="flex gap-1 items-center text-green-700 opacity-0" ref={addedLabelRef}>
                        <span><svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g id="evaCheckmarkFill0"><g id="evaCheckmarkFill1"><path id="evaCheckmarkFill2" d="M9.86 18a1 1 0 0 1-.73-.32l-4.86-5.17a1 1 0 1 1 1.46-1.37l4.12 4.39l8.41-9.2a1 1 0 1 1 1.48 1.34l-9.14 10a1 1 0 0 1-.73.33Z" /></g></g></svg></span>
                        <span>Added</span>
                    </div>
                    <button className="btn-primary py-2" onClick={handleAdd}>Add to Cart</button>
                </div>
            </div>
        </div>
    );
}