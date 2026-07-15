import { createContext, useEffect, useState } from "react";
import { getCartItemsApi, updateCartItemApi, addCartItemApi, deleteCartItemApi } from "../api/cart";

const CartContext = createContext();

export default CartContext;

export function CartContextProvider({ children }) {
    const [cart, setCart] = useState({
        items: [],
        count: 0,
        loaded: true
    });

    useEffect(() => {
        getCartItemsApi().then(data => {
            let c = 0;
            for (let el of data) c += el.quantity;
            setCart({ 
                items: data, 
                count: c, 
                loaded: true
            });
        }).catch(() => {
            setCart({
                items: [],
                count: 0,
                loaded: false
            })
        });
    }, []);

    async function updateCartItem(product, options) {
        try {
            const data = await updateCartItemApi(product.id, options);
            let c = 0;
            const t = cart.items.map((el) => {
                if (el.productId !== product.id) {
                    c += el.quantity;
                    return el;
                }
                c += data.quantity;
                return { ...data, product };
            });
            setCart({
                items: t,
                loaded: true,
                count: c
            });
        } catch (e) {
            console.error(e);
            return Promise.reject(e);
        }
    };

    async function addCartItem(product, quantity) {
        try {
            const data = await addCartItemApi(product.id, quantity);
            setCart({
                items: [{ product, ...data }, ...cart.items],
                loaded: true,
                count: cart.count + quantity
            });
        } catch (e) {
            console.error(e);
            return Promise.reject(e);
        }
    }

    async function deleteCartItem(productId, quantity) {
        try {
            await deleteCartItemApi(productId);
            setCart({
                items: cart.items.filter((el) => { return el.productId !== productId; }),
                loaded: true,
                count: cart.count - quantity
            });
        } catch (e) {
            console.error(e);
            return Promise.reject(e);
        }
    }

    async function deleteAll() {
        try {
            for (const el of cart.items) await deleteCartItemApi(el.productId);
            setCart({ 
                items: [], 
                count: 0,
                loaded: true 
            });
        } catch (e) {
            console.error(e);
            return Promise.reject(e);
        }
    }

    function clearCart() {
        setCart({
            items: [],
            loaded: true,
            count: 0
        })
    }

    return (
        <CartContext value={{
            cart,
            updateCartItem,
            deleteCartItem,
            addCartItem,
            deleteAll,
            clearCart
        }}>
            {children}
        </CartContext>
    );
}