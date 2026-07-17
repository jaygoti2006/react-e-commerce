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
    const serverCart = useRef({});
    const version = useRef({});

    useEffect(() => {
        getCartItemsApi().then(data => {
            for (const el of data) serverCart.current[el.productId] = el;
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
            if(version.current[product.id]===undefined) version.current[product.id]=0;
            const reqversion = version.current[product.id];
            const data = await updateCartItemApi(product.id, options);
            if (reqversion === version.current[product.id]) {
                setCart(cart => {
                    const newItems = cart.items.map((el) => {
                        if (el.productId !== product.id) {
                            return el;
                        }
                        return { ...data, product };
                    });
                    serverCart.current[product.id] = { ...data, product };
                    return {
                        items: newItems,
                        loaded: true
                    }
                });
                version.current[product.id]++;
            }
        } catch (e) {
            console.error(e);
            const items = [];
            for (const value of Object.values(serverCart.current)) if (value) items.push(value);
            setCart({
                items: items,
                loaded: true
            });
            return Promise.reject(e);
        }
    };

    async function addCartItem(product, quantity) {
        try {
            if(version.current[product.id]===undefined) version.current[product.id]=0;
            const reqversion = version.current[product.id];
            const data = await addCartItemApi(product.id, quantity);
            if (reqversion === version.current[product.id]) {
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
                    serverCart.current[product.id] = { ...data, product };
                    return {
                        items: newItems,
                        loaded: true
                    }
                });
                version.current[product.id]++;
            }
        } catch (e) {
            console.error(e);
            const items = [];
            for (const value of Object.values(serverCart.current)) if (value) items.push(value);
            setCart({
                items: items,
                loaded: true
            });
            return Promise.reject(e);
        }
    }

    async function deleteCartItem(productId) {
        try {
            if(version.current[productId]===undefined) version.current[productId]=0;
            const reqversion = version.current[productId];
            await deleteCartItemApi(productId);
            if (reqversion === version.current[productId]) {
                setCart(cart => {
                    serverCart.current[productId] = undefined;
                    return {
                        items: cart.items.filter((el) => { return el.productId !== productId; }),
                        loaded: true
                    }
                });
                version.current[productId]++;
            }
        } catch (e) {
            console.error(e);
            const items = [];
            for (const value of Object.values(serverCart.current)) if (value) items.push(value);
            setCart({
                items: items,
                loaded: true
            });
            return Promise.reject(e);
        }
    }

    async function deleteAll() {
        for (const id of Object.keys(debounceActionTimers.current)) {
            clearTimeout(debounceActionTimers.current[id]);
            debounceActionTimers.current[id] = undefined;
        }
        try {
            await Promise.all(cart.items.map((el) => deleteCartItemApi(el.productId)));
            setCart({
                items: [],
                loaded: true
            });
            serverCart.current = {};
            for (let id of Object.keys(version.current)) version.current[id]++;
        } catch (e) {
            console.error(e);
            setTimeout(() => location.reload(), 500)
            return Promise.reject(e);
        }
    }

    function clearCart() {
        setCart({
            items: [],
            loaded: true
        })
        serverCart.current = {};
    }

    const debounceActionTimers = useRef({});
    function requestDebounceAction(id, newCartItem, delay = 300) {
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

        clearTimeout(debounceActionTimers.current[id]);
        debounceActionTimers.current[id] = setTimeout(() => {
            const prevCartItem = serverCart.current[id];
            let requestPromise;
            let successMessage, failureMessage;

            if (!newCartItem && prevCartItem) {
                requestPromise = deleteCartItem(id);
                successMessage = "Removed item from cart!";
                failureMessage = "Failed removing item from cart!";
            }
            else if (newCartItem) {
                if (prevCartItem) {
                    requestPromise = updateCartItem(newCartItem.product, {
                        quantity: newCartItem.quantity,
                        deliveryOptionId: newCartItem.deliveryOptionId
                    });
                    if (prevCartItem.quantity !== newCartItem.quantity && prevCartItem.deliveryOptionId !== newCartItem.deliveryOptionId) {
                        successMessage = "Updated quantity and delivery option!";
                        failureMessage = "Failed updating quantity and delivery option!";
                    } else if (prevCartItem.quantity !== newCartItem.quantity) {
                        successMessage = "Updated quantity of item!";
                        failureMessage = "Failed updating quantity of item!";
                    } else if (prevCartItem.deliveryOptionId !== newCartItem.deliveryOptionId) {
                        successMessage = "Updated delivery option of item!";
                        failureMessage = "Failed updating delivery option of item!";
                    }
                } else {
                    requestPromise = addCartItem(newCartItem.product, newCartItem.quantity);
                    successMessage = "Added item to cart!";
                    failureMessage = "Failed adding item to cart!";
                }
            }

            if (requestPromise) {
                requestPromise.then(() => {
                    if (successMessage) showToast({
                        message: successMessage,
                        type: "success"
                    });
                }).catch(() => {
                    if (failureMessage) showToast({
                        message: failureMessage,
                        type: "error"
                    });
                });
            }

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