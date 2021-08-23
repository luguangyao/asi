import axios from "axios"
const dVis = axios.create({
    baseURL: '/admin',
    timeout: 2000,
});
function weekOrders() {
    return dVis.post('/weekOrders');
}

function dayOrders(daytime) {
    let fd = new FormData();
    fd.append('daytime', daytime);
    return dVis.post('/dayOrders', fd);
}

function planeTopN() {
    return dVis.post('/PlaneTopN');
}

export default {
    weekOrders,
    dayOrders,
    planeTopN,
}