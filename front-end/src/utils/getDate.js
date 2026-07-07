export default function getDate(days) {
    let res = new Date();
    res.setDate(res.getDate() + days);

    return res.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
};