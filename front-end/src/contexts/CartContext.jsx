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
                setCart({ items: data, count: c });
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

    async function updateCartItem(product, options) {
        try {
            const obj={};
            if(options.quantity) obj.quantity=options.quantity;
            if(options.dId) obj.deliveryOptionId=options.dId;

            const res = await fetch(`/api/cart-items/${product.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(obj)
            });
            if (res.ok) {
                const data = await res.json();
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
                    count: c
                });
            } else console.error(res.status);
        } catch (e) {
            console.error(e);
        }
    };

    async function addCartItem(product, quantity) {
        try {
            const res = await fetch("/api/cart-items", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "productId": product.id,
                    "quantity": Number(quantity)
                })
            });
            if (!res.ok) {
                console.error(res.status);
            } else {
                const data = await res.json();
                setCart({
                    items: [{product,...data},...cart.items],
                    count: cart.count+quantity
                });
            }
        } catch (e) {
            console.error(e);
        }
    }

    async function deleteCartItem(id, quantity) {
        try {
            const res = await fetch(`/api/cart-items/${id}`, {
                method: "DELETE"
            });
            if (res.ok) {
                setCart({
                    items: cart.items.filter((el) => { return el.productId !== id; }),
                    count: cart.count - quantity
                });
            } else console.error(res.status);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <CartContext value={{
            cart,
            setCart,
            updateCartItem,
            deleteCartItem,
            addCartItem
        }}>
            {children}
        </CartContext>
    );
}