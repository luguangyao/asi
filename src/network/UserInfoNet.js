import axios from "axios"
const user = axios.create({
    baseURL: '/user',
    timeout: 20000
});
function displayUserInfo() {
    return user.post('/displayUserInfo')
}

function updateUserInfo(nInfo) {
   return user.post('/updateUserInfo', nInfo);
} 

export default {
    displayUserInfo,
    updateUserInfo,
}