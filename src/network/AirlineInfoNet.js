import axios from "axios"
const airport = axios.create({
    baseURL: '/plane',
    timeout: 2000,
});

function getAirportInfo (aname) {
    let fd = new FormData();
    fd.append('aname', aname);
    return airport.post('/getAirportInfo', fd);
}

export default {
    getAirportInfo
}