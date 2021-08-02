import axios from "axios"
const admin=axios.create({
    baseURL: '/admin',
    timeout:1000
})
export default{
    queryOrders(ordersData,success,failure){
        let keys=Object.keys(ordersData)
        let formdata=new FormData()
        for(let i=0;i<keys.length;i++){
            formdata.append(keys[i],ordersData[keys[i]])
        }
        admin.post("/queryOrders",formdata)
        .then(function (response) {
            success(response.data)
        })
        .catch(function (error) {
            console.log(error);
            failure()
        });
    },
    refundOrders(data,success,failure){
        let formdata=new FormData()
        formdata.append("id",data.orderid)
        formdata.append("date",data.flightdate)
        admin.post("/refundOrders",formdata)
        .then(function(response) {
            console.log(response)
            success(response.data)
        })
        .catch(function(error) {
            console.log(error)
            failure(error)
        })
    }
}