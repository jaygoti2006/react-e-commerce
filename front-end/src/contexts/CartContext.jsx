import { createContext, useEffect, useMemo, useState, useRef, useContext } from "react";
import { getCartItemsApi, updateCartItemApi, addCartItemApi, deleteCartItemApi } from "../api/cart";
import ToastContext from "./ToastContext";

const CartContext = createContext();

export default CartContext;

export function CartContextProvider({ children }) {
    const [cart, setCart] = useState({
        items: [],
        loaded: true
    });
    
    const { showToast } = useContext(ToastContext);
    const serverCart = useRef([]);
    const version = useRef(0);

    useEffect(() => {
        getCartItemsApi().then(data => {
            serverCart.current = data;
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
            const reqversion=version.current;
            const data = await updateCartItemApi(product.id, options);
            if (reqversion === version.current) {
                setCart(cart => {
                    const newItems = cart.items.map((el) => {
                        if (el.productId !== product.id) {
                            return el;
                        }
                        return { ...data, product };
                    });
                    serverCart.current = newItems;
                    return {
                        items: newItems,
                        loaded: true
                    }
                });
                version.current++;
            }
        } catch (e) {
            console.error(e);
            setCart({
                items: serverCart.current,
                loaded: true
            });
            return Promise.reject(e);
        }
    };

    async function addCartItem(product, quantity) {
        try {
            const reqversion=version.current;
            const data = await addCartItemApi(product.id, quantity);
            if (reqversion === version.current) {
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
                    serverCart.current = newItems;
                    return {
                        items: newItems,
                        loaded: true
                    }
                });
                version.current++;
            }
        } catch (e) {
            console.error(e);
            setCart({
                items: serverCart.current,
                loaded: true
            });
            return Promise.reject(e);
        }
    }

    async function deleteCartItem(productId) {
        try {
            const reqversion=version.current;
            await deleteCartItemApi(productId);
            if (reqversion === version.current) {
                setCart(cart => {
                    serverCart.current = cart.items.filter((el) => { return el.productId !== productId; })
                    return {
                        items: cart.items.filter((el) => { return el.productId !== productId; }),
                        loaded: true
                    }
                });
                version.current++;
            }
        } catch (e) {
            console.error(e);
            setCart({
                items: serverCart.current,
                loaded: true
            });
            return Promise.reject(e);
        }
    }

    async function deleteAll() {
        const reqversion=version.current;
        for (const id in debounceActionTimers.current) {
            clearTimeout(debounceActionTimers.current[id]);
            debounceActionTimers.current[id] = undefined;
        }
        try {
            await Promise.all(cart.items.map((el) => deleteCartItemApi(el.productId)));
            if (reqversion === version.current) {
                setCart({
                    items: [],
                    loaded: true
                });
                serverCart.current=[];
                version.current++;
            }
        } catch (e) {
            console.error(e);
            setTimeout(()=>location.reload(),500)
            return Promise.reject(e);
        }
    }

    function clearCart() {
        setCart({
            items: [],
            loaded: true
        })
        serverCart.current=[];
    }

    const debounceActionTimers = useRef({});
    function requestDebounceAction(id, newCartItem, failureMessage, successMessage, delay = 300) {
        let ok = 0;
        let newCartItems = [...cart.items.map(el => {
            if (el.productId !== id) return el;
            ok = 1;
            if (newCartItem) return newCartItem;
        }).filter(el => el)];
        if (!ok && newCartItem) newCartItems = [newCartItem, ...newCartItems];
        setCart({
            items: newCartItems,
            loaded: true
        })
        if (successMessage) showToast({
            message: successMessage,
            type: "success"
        });

        clearTimeout(debounceActionTimers.current[id]);
        debounceActionTimers.current[id] = setTimeout(() => {
            const prevCartItem = serverCart.current.find(el => el.productId === id);
            let requestPromise;
            if (!newCartItem && prevCartItem) requestPromise = deleteCartItem(id);
            else if (newCartItem) {
                if (prevCartItem) requestPromise = updateCartItem(newCartItem.product, {
                    quantity: newCartItem.quantity,
                    deliveryOptionId: newCartItem.deliveryOptionId
                });
                else requestPromise = addCartItem(newCartItem.product, newCartItem.quantity);
            }

            requestPromise.catch(() => showToast({
                message: failureMessage,
                type: "error"
            }));

        }, delay);
    }

    return (
        <CartContext value={{
            cart,
            count,
            updateCartItem,
            deleteCartItem,
            addCartItem,
            deleteAll,
            clearCart,
            requestDebounceAction
        }}>
            {children}
        </CartContext>
    );
}