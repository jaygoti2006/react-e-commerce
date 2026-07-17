import convertMoney from '../../utils/money';
import { useContext } from 'react';
import CartContext from '../../contexts/CartContext';

const limit = 10;

export default function ProductCard({ product: { image, name, rating, priceCents, id }, product }) {
    const { cart, requestDebounceAction } = useContext(CartContext);
    const currQuantity = function () {
        const t = cart.items.find((el) => el.productId === id);
        if (t) return t.quantity;
        return 0;
    }();

    function handleAdd() {
        if (currQuantity < limit) {
            const currCartItem = cart.items.find(el => el.productId === product.id);
            const newCartItem = {
                product,
                productId: product.id,
                quantity: currQuantity + 1,
                deliveryOptionId: (currCartItem) ? currCartItem.deliveryOptionId : "1"
            };

            requestDebounceAction(product.id, newCartItem, "Failed adding to cart!");
        }
    }

    function handleRemove() {
        const currCartItem = cart.items.find(el => el.productId === product.id);
        const newCartItem = (currQuantity===1) ? null : {
            product,
            productId: product.id,
            quantity: currQuantity - 1,
            deliveryOptionId: (currCartItem) ? currCartItem.deliveryOptionId : "1"
        };

        requestDebounceAction(product.id, newCartItem, "Failed removing from cart!");
    }

    return (
        <div className="p-6">
            <div className="p-4">
                <img className="w-full rounded-md" src={image} alt="" />
            </div>
            <div className="flex flex-col gap-2.5">
                <h4 className="line-clamp-2 h-12">{name}</h4>
                <div className="flex items-center gap-2">
                    <img className="max-w-25" src={`/images/ratings/rating-${rating.stars * 10}.png`} alt="" />
                    <a href="" className="cursor-pointer text-green-700 hover:text-green-700/70 active:text-green-700">{rating.count}</a>
                </div>
                <span className="font-bold text-black">${convertMoney(priceCents)}</span>
                <div className="flex flex-col mt-2 gap-2">
                    {(currQuantity !== 0) ?
                        <div className="flex items-center bg-[#198754] rounded-md text-white self-start h-7.5">
                            <button className="cursor-pointer pl-1" onClick={handleRemove}>
                                <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 36 36"><path d="M26 17H10a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2Z" className="clr-i-outline clr-i-outline-path-1" /><path fill="none" d="M0 0h36v36H0z" /></svg>
                            </button>
                            <span className="min-w-5 text-center">
                                {currQuantity}
                            </span>
                            <button className="cursor-pointer pr-1 disabled:text-white/70" onClick={handleAdd} disabled={currQuantity === limit}>
                                <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16"><path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" /></svg>
                            </button>
                        </div> :
                        <button className="h-7.5 btn-tertiary self-start px-4 text-[16px]" onClick={handleAdd}>Add</button>
                    }
                </div>
            </div>
        </div>
    );
}