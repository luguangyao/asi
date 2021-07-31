import axios from "axios"
const admin=axios.create({
    baseURL: '/admin',
    timeout:1000
})
export default{
    queryOrders(ordersData){
        console.log(ordersData)
        let keys=Object.keys(ordersData)
        let formdata=new FormData()
        for(let i=0;i<keys.length;i++){
            formdata.append(keys[i],ordersData[keys[i]])
        }
        admin.post("/queryOrders",formdata)
        .then(function (response) {
            console.log(response)
        })
        .catch(function (error) {
            console.log(error);
        });
    }
}