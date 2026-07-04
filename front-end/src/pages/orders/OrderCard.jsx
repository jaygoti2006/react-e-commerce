import OrderItem from './OrderItem';

export default function OrderCard() {
    return (
        <div className="border border-neutral-300 rounded-md">
            <div className="py-5 px-6 flex items-center gap-8 justify-between border-b border-neutral-300">
                <div className="flex items-center gap-11">
                    <div className="flex flex-col">
                        <span className="font-bold">Order Placed:</span>
                        <span className="leading-none">July 3</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold">Total:</span>
                        <span className="leading-none">$388.81</span>
                    </div>
                </div>
                <div className="flex flex-col">
                    <span className="font-bold">Order ID:</span>
                    <span className="leading-none">4c004ad4-3aa4-52d3-60da-350a3fa7082f</span>
                </div>
            </div>
            <div className="px-6 py-2 flex flex-col">
                <OrderItem />
                <OrderItem />
            </div>
        </div>
    );
}