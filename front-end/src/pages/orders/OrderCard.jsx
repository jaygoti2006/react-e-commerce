import OrderItem from './OrderItem';
import convertMoney from '../../utils/money';

export default function OrderCard({id,orderTime,totalCostCents,products}) {
    return (
        <div className="border border-neutral-300 rounded-md">
            <div className="py-5 px-6 flex items-center gap-8 justify-between border-b border-neutral-300">
                <div className="flex items-center gap-11">
                    <div className="flex flex-col">
                        <span className="font-bold">Order Placed:</span>
                        <span className="leading-none">{new Date(orderTime).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold">Total:</span>
                        <span className="leading-none">${convertMoney(totalCostCents)}</span>
                    </div>
                </div>
                <div className="flex flex-col">
                    <span className="font-bold">Order ID:</span>
                    <span className="leading-none">{id}</span>
                </div>
            </div>
            <div className="px-6 py-2 flex flex-col gap-4">
                {products.map((el)=>{
                    return <OrderItem id={id} product={el.product} quantity={el.quantity} deliveryTime={el.estimatedDeliveryTimeMs} key={el.productId}/>
                })}
            </div>
        </div>
    );
}