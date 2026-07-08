import { createContext, useEffect, useState, useCallback } from "react";

const CartContext = createContext();

export default CartContext;

export function CartContextProvider({ children }) {
    const [cart, setCart] = useState({
        items: [],
        count: 0
    });

    const getCartItems = useCallback(async function () {
        try {
            const res = await fetch("/api/cart-items?" + new URLSearchParams({
                "expand": "product"
            }).toString());
            if (res.ok) {
                const data = await res.json();
                let c = 0;
                for (let el of data) c += el.quantity;
                setCart({items:data, count:c});
            } else console.error(res.status);
        } catch (e) {
            console.error(e);
        }
    }, []);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        getCartItems();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <CartContext value={{
            getCartItems,
            cart,
            setCart
        }}>
            {children}
        </CartContext>
    );
}