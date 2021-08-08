import axios from "axios"
const dVis = axios.create({
    baseURL: '/admin',
    timeout: 2000,
});
dVis;
function weekOrders() {
    return dVis.post('/weekOrders');
    // return axios.post('http://139.159.153.12/admin/weekOrders');
}

function dayOrders() {
    return dVis.post('/dayOrders');
    // return axios.post('http://139.159.153.12/admin/dayOrders');
}

function planeTopN() {
    return dVis.post('/PlanTopN');
    // return axios.post('http://139.159.153.12/admin/PlaneTopN');
}

export default {
    weekOrders,
    dayOrders,
    planeTopN,
}