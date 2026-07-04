import Header from '../../Header';
import OrderCard from './OrderCard';

export default function Orders(){
    return (
        <>
            <Header />
            <div className="max-w-4xl mx-auto py-6 px-4">
                <h1 className="mb-5 font-bold text-[26px]">Your Orders</h1>
                <OrderCard />
            </div>
        </>
    );
}