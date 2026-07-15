import api from './client';

export async function getProductsApi(search) {
    try {
        const data = await api("/api/products?" + new URLSearchParams({
            "search": search
        }).toString());
        return data;
    } catch (e) {
        return Promise.reject(e);
    }
}