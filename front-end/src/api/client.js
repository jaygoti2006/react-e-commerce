export default async function api(url, options, timeoutMs = 5000) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeoutMs);

    try {
        const res = await fetch(url, { ...options, signal: controller.signal });
        clearTimeout(id);

        if (res.ok) {
            try {
                if (res.status === 204) return {};

                const data = await res.json();
                return data;
            } catch (e) {
                console.error(e);
                return Promise.reject({
                    type: "INVALID_JSON",
                    message: "Invalid data recieved from server!"
                });
            }
        }

        return Promise.reject({
            type: 'HTTP_ERROR',
            status: res.status,
            message: `Server replied with status code${res.status}`
        });
    } catch (e) {
        let eobj;
        if (e.name === "AbortError") eobj = {
            type: 'TIMEOUT',
            message: 'The server took too long to respond.'
        };
        else if (!navigator.onLine) eobj = {
            type: 'OFFLINE',
            message: 'You are completely offline. Check your Wi-Fi.'
        };
        else {
            try {
                await fetch('https://google.com', { mode: 'no-cors', method: 'HEAD' });
                eobj = { type: 'CORS_ERROR', message: 'Access blocked by security policies (CORS).' };
            } catch {
                eobj = { type: 'SERVER_DOWN', message: 'The target server is down or unreachable.' };
            }
        }
        
        return Promise.reject(eobj);
    }
}