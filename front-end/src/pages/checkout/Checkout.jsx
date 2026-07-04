import CheckoutHeader from './CheckoutHeader';
import CheckoutItem from './CheckoutItem';


export default function Checkout() {
    return (
        <>
            <CheckoutHeader />
            <div className="lg:max-w-6xl mx-auto px-3 py-15">
                <h2 className="text-[22px] font-bold mb-4">Review your order</h2>
                <div className="flex gap-2">
                    <div className="grow">
                        <CheckoutItem />
                    </div>
                    <div className="w-87.5">

                    </div>
                </div>
            </div>
        </>
    );
};