import { createContext, useEffect, useState, useCallback } from "react";

const OrdersContext = createContext();

export default OrdersContext;

export function OrdersContextProvider({ children }) {
    const [orders, setOrders] = useState([]);

    const getOrders = useCallback(async function () {
        try {
            const res = await fetch("/api/orders?expand=products");
            if (res.ok) {
                const data = await res.json();
                setOrders(data);
            } else console.error(res.status);
        } catch (e) {
            console.error(e);
        }
    }, []);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        getOrders();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <OrdersContext value={{orders,setOrders,getOrders}}>
            {children}
        </OrdersContext>
    );
}