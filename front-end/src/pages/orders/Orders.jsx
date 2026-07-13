import { useContext } from 'react';
import Header from '../../components/Header';
import OrderCard from './OrderCard';
import OrdersContext from '../../contexts/OrdersContext';

export default function Orders() {
    const {orders}=useContext(OrdersContext);
    return (
        <>
            <title>Orders</title>
            <link rel="icon" href="orders-favicon.png"></link>
            <Header />
            <div className="max-w-4xl mx-auto py-6 px-4">
                <h1 className="mb-5 font-bold text-[26px]">Your Orders</h1>
                <div className="flex flex-col gap-12.5">
                    {orders.map((order) => {
                        return <OrderCard order={order} key={order.id} />;
                    })}
                </div>
            </div>
        </>
    );
}