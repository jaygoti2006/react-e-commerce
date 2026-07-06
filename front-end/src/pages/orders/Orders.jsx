import Header from '../../components/Header';
import OrderCard from './OrderCard';

export default function Orders(){
    return (
        <>
            <title>Orders</title>
            <link rel="icon" href="orders-favicon.png"></link>
            <Header />
            <div className="max-w-4xl mx-auto py-6 px-4">
                <h1 className="mb-5 font-bold text-[26px]">Your Orders</h1>
                <OrderCard />
            </div>
        </>
    );
}