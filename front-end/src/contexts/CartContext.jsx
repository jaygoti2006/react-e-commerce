import { createContext, useEffect, useMemo, useState } from "react";
import { getCartItemsApi, updateCartItemApi, addCartItemApi, deleteCartItemApi } from "../api/cart";

const CartContext = createContext();

export default CartContext;

export function CartContextProvider({ children }) {
    const [cart, setCart] = useState({
        items: [],
        loaded: true
    });

    useEffect(() => {
        getCartItemsApi().then(data => {
            setCart({
                items: data,
                loaded: true
            });
        }).catch(() => {
            setCart({
                items: [],
                loaded: false
            })
        });
    }, []);

    const count = useMemo(() => {
        let c = 0;
        for (let el of cart.items) c += el.quantity;
        return c;
    }, [cart.items]);

    async function updateCartItem(product, options) {
        try {
            const data = await updateCartItemApi(product.id, options);
            setCart(cart => {
                const newItems = cart.items.map((el) => {
                    if (el.productId !== product.id) {
                        return el;
                    }
                    return { ...data, product };
                });
                return {
                    items: newItems,
                    loaded: true
                }
            });
        } catch (e) {
            console.error(e);
            return Promise.reject(e);
        }
    };

    async function addCartItem(product, quantity) {
        try {
            const data = await addCartItemApi(product.id, quantity);
            setCart(cart => {
                let ok = 0;
                let newItems = cart.items.map((el) => {
                    if (el.productId !== product.id) {
                        return el;
                    }
                    ok = 1;
                    return { ...data, product };
                });
                if (!ok) newItems = [{ ...data, product }, ...newItems];
                return {
                    items: newItems,
                    loaded: true
                }
            });
        } catch (e) {
            console.error(e);
            return Promise.reject(e);
        }
    }

    async function deleteCartItem(productId) {
        try {
            await deleteCartItemApi(productId);
            setCart(cart => {
                return {
                    items: cart.items.filter((el) => { return el.productId !== productId; }),
                    loaded: true
                }
            });
        } catch (e) {
            console.error(e);
            return Promise.reject(e);
        }
    }

    async function deleteAll() {
        try {
            await Promise.all(cart.items.map((el) => deleteCartItemApi(el.productId)));
            setCart({
                items: [],
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
            loaded: true
        })
    }

    return (
        <CartContext value={{
            cart,
            count,
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