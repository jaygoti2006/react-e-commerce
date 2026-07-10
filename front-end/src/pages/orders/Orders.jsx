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
            <button className="flex items-center gap-2 fixed bottom-10 right-10 btn-primary text-[16px] px-4 py-2.5 rounded-full">
                <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 1024 1024"><path d="M352 192V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64H96a32 32 0 0 1 0-64h256zm64 0h192v-64H416v64zM192 960a32 32 0 0 1-32-32V256h704v672a32 32 0 0 1-32 32H192zm224-192a32 32 0 0 0 32-32V416a32 32 0 0 0-64 0v320a32 32 0 0 0 32 32zm192 0a32 32 0 0 0 32-32V416a32 32 0 0 0-64 0v320a32 32 0 0 0 32 32z" /></svg>
                <span>Reset</span>
            </button>
            <Header />
            <div className="max-w-4xl mx-auto py-6 px-4">
                <h1 className="mb-5 font-bold text-[26px]">Your Orders</h1>
                <div className="flex flex-col gap-12.5">
                    {orders.map((el) => {
                        return <OrderCard id={el.id} orderTime={el.orderTimeMs} totalCostCents={el.totalCostCents} products={el.products} key={el.id} />;
                    })}
                </div>
            </div>
        </>
    );
}