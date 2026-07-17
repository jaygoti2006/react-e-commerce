import { useContext } from 'react';
import { Link } from 'react-router';
import CartContext from '../../contexts/CartContext';

export default function OrderItem({ id, product: { product, quantity, estimatedDeliveryTimeMs } }) {
    const { cart, requestDebounceAction } = useContext(CartContext);

    function handleAdd() {
        const currCartItem = cart.items.find(el => el.productId === product.id);
        const newCartItem = {
            product,
            productId: product.id,
            quantity: (currCartItem) ? currCartItem.quantity+1 : 1,
            deliveryOptionId: (currCartItem) ? currCartItem.deliveryOptionId : "1"
        };
        requestDebounceAction(product.id,newCartItem);
    }

    return (
        <div className="py-6 flex flex-col xs:flex-row items-start gap-8">
            <div className="xs:w-27.5">
                <img className="w-full" src={product.image} alt="" />
            </div>
            <div className="grow flex flex-col items-start gap-2">
                <div className="flex flex-col">
                    <h4 className="font-bold">{product.name}</h4>
                    <span>
                        Arriving on: {new Date(estimatedDeliveryTimeMs).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                    </span>
                    <span>
                        Quantity: {quantity}
                    </span>
                </div>
                <div className="flex flex-col gap-2">
                    <button className="max-w-35 w-35 text-white shadow-md bg-[#198754] hover:bg-[#198754]/80 active:bg-[#198754] px-4 py-1 text-[14px] cursor-pointer rounded-md leading-none" onClick={handleAdd}>
                        <div className="flex justify-center items-center gap-2">
                            <span>
                                <svg className="block fill-current" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path fillRule="evenodd" d="M9.5 19.5a1 1 0 1 0 0-2a1 1 0 0 0 0 2m0 1a2 2 0 1 0 0-4a2 2 0 0 0 0 4m7-1a1 1 0 1 0 0-2a1 1 0 0 0 0 2m0 1a2 2 0 1 0 0-4a2 2 0 0 0 0 4M3 4a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .476.348L9.37 14.5H17a.5.5 0 0 1 0 1H9.004a.5.5 0 0 1-.476-.348L5.135 4.5H3.5A.5.5 0 0 1 3 4" clipRule="evenodd"></path><path d="M8.5 13L6 6h13.337a.5.5 0 0 1 .48.637l-1.713 6a.5.5 0 0 1-.481.363z"></path></svg>
                            </span>
                            <span>Add to Cart</span>
                        </div>
                    </button>
                    <Link to="/tracking" className="md:hidden text-center border border-neutral-300 shadow-sm rounded-md py-2.5 leading-none text-[14px] hover:bg-neutral-50 active:bg-white">Track Package</Link>
                </div>
            </div>
            <Link to={`/tracking?${new URLSearchParams({ orderId: id, productId: product.id }).toString()}`} className="hidden md:block text-center w-55  border border-neutral-300 shadow-sm rounded-md py-2.5 leading-none text-[14px] hover:bg-neutral-50 active:bg-white">Track Package</Link>
        </div>
    );
}