import axios from "axios"
const orders=axios.create({
    baseURL: '/orders',
    timeout:10000
})
export default{
    showorder(success,failure){
        orders.post('/showorder')
        .then(function(response) {
            success(response.data)
        })
        .catch(function(error){
            failure()
            console.log(error)
        })
    },
    payorder(data,success,failure){
        let formdata=new FormData()
        formdata.append("orderid",data.orderid)
        orders.post('/payorder',formdata)
        .then(function(response) {
            console.log(response.data)
            switch(response.data){
                case 1:
                    success()
                    break
                case -3:
                    failure("飞机起飞的日期在今天之前，不允许支付")
                    break
                case -2:
                    failure("订单号不存在")
                    break
                case -1:
                    failure("支付状态不是未支付")
                    break
                default:
                    failure("")
            }
        })
        .catch(function(error){
            failure(error)
            console.log(error)
        })
    },
    delorder(data,success,failure){
        let formdata=new FormData()
        formdata.append("orderid",data.orderid)
        orders.post('/payorder',formdata)
        .then(function(response) {
            console.log(response.data)
            switch(response.data){
                case 1:
                    success()
                    break
                case -3:
                    failure("订单号不存在")
                    break
                case -2:
                    failure("支付状态不为1")
                    break
                case -1:
                    failure("飞机起飞时间在今天之前，不可以删除订单")
                    break
                default:
                    failure("")
            }
        })
        .catch(function(error){
            failure(error)
            console.log(error)
        })
    },
}