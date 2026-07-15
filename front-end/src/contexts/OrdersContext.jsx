import { createContext, useEffect, useState, useContext } from "react";
import CartContext from "./CartContext";
import { getOrdersApi, placeOrderApi } from "../api/orders";

const OrdersContext = createContext();

export default OrdersContext;

export function OrdersContextProvider({ children }) {
    const [orders, setOrders] = useState({
        data: [],
        loaded: true
    });
    const {clearCart} = useContext(CartContext);

    useEffect(() => {
        getOrdersApi().then(data=>{
            setOrders({
                data: data,
                loaded: true
            })
        }).catch(()=>{
            setOrders({
                data: [],
                loaded: false
            })
        });
    }, []);

    async function placeOrder() {
        try {
            const data = await placeOrderApi();
            setOrders({
                data: [data, ...orders.data],
                loaded: true
            });
            clearCart();
        } catch (e) {
            console.error(e);
            return Promise.reject(e);
        }
    }

    return (
        <OrdersContext value={{ orders, placeOrder }}>
            {children}
        </OrdersContext>
    );
}