import api from "./client";

export async function getOrdersApi() {
    try {
        const data = await api("/api/orders?expand=products");
        return data;
    } catch (e) {
        return Promise.reject(e);
    }
}

export async function placeOrderApi() {
    try {
        const data = await api("/api/orders", {
            method: "POST"
        });
        const data1 = await api(`/api/orders/${data.id}?expand=products`);
        return data1;
    } catch (e) {
        return Promise.reject(e);
    }
}