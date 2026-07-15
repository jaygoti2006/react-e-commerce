import api from './client';

export async function getDeliveryOptionsApi() {
    try {
        const data = await api("/api/delivery-options?" + new URLSearchParams({
            "expand": "estimatedDeliveryTime"
        }).toString());
        return data;
    } catch (e) {
       return Promise.reject(e);
    }
}

export async function getCartItemsApi() {
    try {
        const data = await api("/api/cart-items?" + new URLSearchParams({
            "expand": "product"
        }).toString());
        return data;
    } catch (e) {
       return Promise.reject(e);
    }
}

export async function updateCartItemApi(productId, options) {
    try {
        const obj = {};
        if (options.quantity) obj.quantity = options.quantity;
        if (options.dId) obj.deliveryOptionId = options.dId;

        const data = await api(`/api/cart-items/${productId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        });
        return data;
    } catch (e) {
       return Promise.reject(e);
    }
}

export async function addCartItemApi(productId, quantity) {
    try {
        const data = await api("/api/cart-items", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "productId": productId,
                "quantity": Number(quantity)
            })
        });
        return data;
    } catch (e) {
       return Promise.reject(e);
    }
}

export async function deleteCartItemApi(productId) {
    try {
        const data = await api(`/api/cart-items/${productId}`, {
            method: "DELETE"
        });
        return data;
    } catch (e) {
       return Promise.reject(e);
    }
}