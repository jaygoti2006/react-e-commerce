export default function CheckoutItem(){
    return (
        <div className="px-4 py-5 border border-neutral-300 rounded-md flex flex-col gap-4">
            <h4 className="text-[19px] text-green-700 font-bold"><span>Delivery date: </span> <span>Tuesday, July 14</span></h4>
            <div className="flex justify-between gap-2">
                <div className="flex items-start gap-6">
                    <img className="w-25" src="https://supersimple.dev/projects/ecommerce/images/products/intermediate-composite-basketball.jpg" alt="" />
                    <div className="flex flex-col">
                        <h6 className="font-bold">Intermediate Size Basketball</h6>
                        <span className="font-bold">$20.95</span>
                        <div className="flex gap-1.5">
                            <span>Quantity: <span>1</span></span>
                            <button className="text-green-700 hover:text-green-700/70 active:text-green-700 cursor-pointer">Update</button>
                            <button className="text-green-700 hover:text-green-700/70 active:text-green-700 cursor-pointer">Delete</button>
                        </div>
                    </div>
                </div>
                <fieldset className="w-75 flex flex-col gap-2">
                    <legend className="font-bold">Choose a delivery option:</legend>
                    <div className="flex flex-col gap-3">
                        <label className="flex items-center gap-2 hover:opacity-70 cursor-pointer">
                            <input className="cursor-pointer w-5 h-5" type="radio" name="delivery-option"/>
                            <div className="flex flex-col gap-0.5">
                                <span className="font-medium">Tuesday, July 14</span>
                                <span className="text-neutral-500 leading-none"> <span>Free</span> - <span>Shipping</span> </span>
                            </div>
                        </label>
                        
                        <label className="flex items-center gap-2 hover:opacity-70 cursor-pointer">
                            <input className="cursor-pointer w-5 h-5" type="radio" name="delivery-option"/>
                            <div className="flex flex-col gap-0.5">
                                <span className="font-medium">Tuesday, July 14</span>
                                <span className="text-neutral-500 leading-none"> <span>Free</span> - <span>Shipping</span> </span>
                            </div>
                        </label>

                        <label className="flex items-center gap-2 hover:opacity-70 cursor-pointer">
                            <input className="cursor-pointer w-5 h-5" type="radio" name="delivery-option"/>
                            <div className="flex flex-col gap-0.5">
                                <span className="font-medium">Tuesday, July 14</span>
                                <span className="text-neutral-500 leading-none"> <span>Free</span> - <span>Shipping</span> </span>
                            </div>
                        </label>
                    </div>
                </fieldset>
            </div>
        </div>
    );
}