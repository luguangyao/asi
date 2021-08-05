import axios from "axios"
const plane=axios.create({
    baseURL: '/plane',
    timeout:5000
})

export default{
    queryFlights(data,success){
        let keys=Object.keys(data)
        let formdata=new FormData()
        for(let i=0;i<keys.length;i++){
            formdata.append(keys[i],data[keys[i]])
        }
        plane.post("/queryFlights",formdata)
        .then(function(response) {
            success(response.data)
        })
        .catch(function(error) {
            console.log(error)
        })
    },
    checkFlightInfo(flightid,success){
        let formdata=new FormData()
        formdata.append("flight_id",flightid)
        plane.post("/checkFlightInfo",formdata)
        .then(function(response){
            success(response.data)
        })
        .catch(function(error){
            console.log(error)
        })
    },
    changeOnce(data,success){
        let formdata=new FormData()
        formdata.append("start_des",data.departure)
        formdata.append("end_des",data.destination)
        plane.post("/changeOnce",formdata)
        .then(function(response) {
            success(response.data)
        })
        .catch(function(error) {
            console.log(error)
        })
    },
    changeTwice(data,success){
        let formdata=new FormData()
        formdata.append("start_des",data.departure)
        formdata.append("end_des",data.destination)
        plane.post("/changeTwice",formdata)
        .then(function(response) {
            success(response.data)
        })
        .catch(function(error) {
            console.log(error)
        })
    }
    
}