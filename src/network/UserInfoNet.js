import axios from "axios"
const user = axios.create({
    baseURL: '/user',
    timeout: 2000,
});
function displayUserInfo() {
    return user.post('/displayUserInfo')
}

function updateUserInfo(nInfo) {
    let formData = new FormData();
    for (let key of Object.keys(nInfo)){
        formData.append(key, nInfo[key]);
    }
   return user.post('/updateUserInfo', formData);
} 

function updatePwd(nPwd) {
    let formData = new FormData();
    for (let key of Object.keys(nPwd)){
        formData.append(key, nPwd[key]);
    }
    return user.post('/updatePwd', formData);
}
export default {
    displayUserInfo,
    updateUserInfo,
    updatePwd,
}