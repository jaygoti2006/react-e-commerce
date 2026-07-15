import { useContext } from 'react';
import convertMoney from '../../utils/money';
import CartContext from '../../contexts/CartContext';
import OrdersContext from '../../contexts/OrdersContext';
import { useNavigate } from 'react-router';
import ToastContext from '../../contexts/ToastContext';

export default function PaymentSummary({ payment }) {
    const { cart } = useContext(CartContext);
    const { placeOrder } = useContext(OrdersContext);
    const { showToast } = useContext(ToastContext);
    const navigate = useNavigate();

    function handlePlaceOrder() {
        placeOrder().then(() => {
            showToast({
                message: "Placed order successfully!",
                type: "success"
            });
            navigate({
                pathname: '/orders'
            });
        }).catch(()=> showToast({
            message: "Failed to place order!",
            type: "error"
        }));
    }

    return (
        <div className="w-87.5 shrink-0 p-4 flex flex-col gap-2 border border-neutral-300 rounded-md">
            <h4 className="text-[19px] font-bold">Payment Summary</h4>
            <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between">
                        <span>Items ({cart.count}):</span>
                        <span>${convertMoney(payment.base)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Shipping & handling:</span>
                        <span>${convertMoney(payment.shipping)}</span>
                    </div>
                    <div className="self-end border-t border-neutral-300 w-12"></div>
                    <div className="flex justify-between">
                        <span>Total before tax:</span>
                        <span>${convertMoney(payment.base + payment.shipping)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Estimated tax ({payment.taxPr}%):</span>
                        <span>${convertMoney((payment.base + payment.shipping) * payment.taxPr / 100)}</span>
                    </div>
                </div>
                <div className="border-t border-neutral-300"></div>
                <div className="flex justify-between text-green-700 font-bold text-lg py-2">
                    <span>Order total:</span>
                    <span>${convertMoney((payment.base + payment.shipping) * (1 + payment.taxPr / 100))}</span>
                </div>
                <button className="btn-primary py-3.5" disabled={payment.base === 0} onClick={handlePlaceOrder}>Place your order</button>
            </div>
        </div>
    );
}