import axios from "axios"
const dVis = axios.create({
    baseURL: '/admin',
    timeout: 2000,
});
dVis;
function weekOrders() {
    return dVis.post('/weekOrders');
}

function dayOrders() {
    return dVis.post('/dayOrders');
}

function planeTopN() {
    return dVis.post('/PlaneTopN');
}

export default {
    weekOrders,
    dayOrders,
    planeTopN,
}