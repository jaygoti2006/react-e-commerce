import { createContext, useEffect, useState, useCallback } from "react";

const CartContext=createContext();

export default CartContext;

export function CartContextProvider({children}){
    const [cartItems,setCartItems]=useState([]);

    const getCartItems=useCallback(async function(){
            try {
                const res = await fetch("/api/cart-items?" + new URLSearchParams({
                    "expand": "product"
                }).toString());
                if (res.ok) {
                    const data = await res.json();
                    setCartItems(data);
                } else console.error(res.status);
            } catch (e) {
                console.error(e);
            }
    },[]);

    useEffect(()=>{
        // eslint-disable-next-line react-hooks/set-state-in-effect
        getCartItems();
    },[getCartItems]);

    let c=0;
    for(let el of cartItems) c+=el.quantity; 

    return (
        <CartContext value={{
            getCartItems,
            cartItems,
            itemsCount: c
        }}>
            {children}
        </CartContext>
    );
}