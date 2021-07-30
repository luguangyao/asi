import axios from "axios"
const plane=axios.create({
    baseURL: '/data/plane',
    timeout:1000
})
const admin=axios.create({
    baseURL: '/data/admin',
    timeout:1000
})
export default{
    queryFlights(searchData,success,failure){
        let keys=Object.keys(searchData)
        let formdata=new FormData()
        for(let i=0;i<keys.length;i++){
            formdata.append(keys[i],searchData[keys[i]])
        }
        admin.post("/queryFlights",formdata)
        .then(function (response) {
            success(response.data)
        })
        .catch(function (error) {
            console.log(error);
            failure()
            });
    },
    updateFlights(updated,success,failure){
        let keys=Object.keys(updated)
        let formdata=new FormData()
        for(let i=0;i<keys.length;i++){
            formdata.append(keys[i],updated[keys[i]])
        }
        admin.post("/updateFlights",formdata)
        .then(function (response) {
           if(response.data==1){
            success()
           }
           else failure()
        })
        .catch(function (error) {
            console.log(error);
            failure()
            });
    },
    deleteFlights(deleted,success,failure){
        let formdata=new FormData()
        formdata.append("flightid",deleted.flightid)
        formdata.append("flightdate",deleted.flightdate)
        admin.post("/deleteFlights",formdata)
        .then(function (response) {
           if(response.data==1){
            success()
           }
           else failure()
        })
        .catch(function (error) {
            console.log(error);
            failure()
            });
    },
    insertFlights(insertd,success,failure){
        let keys=Object.keys(insertd)
        let formdata=new FormData()
        for(let i=0;i<keys.length;i++){
            formdata.append(keys[i],insertd[keys[i]])
        }
        admin.post("/insertFlights",formdata)
        .then(function (response) {
            console.log(response)
           if(response.data==1){
            success()
           }
           else failure()
        })
        .catch(function (error) {
            console.log(error);
            failure()
            });
    },
    flightsPOI(){
        admin.get("/flightsPOI")
        .then(function (response) {
            console.log(response)
           
        })
        .catch(function (error) {
            console.log(error);
            });
    },
    searchAllFlightId(success){
        plane.get("/flightsDistinct?column=flightid&min=0&max=40")
        .then(function (response) {
            success(response.data)
        })
        .catch(function (error) {
            console.log(error);
            });
    },
    searchAllAirline(success){
        plane.get("/flightsDistinct?column=airline&min=0&max=40")
        .then(function (response) {
            success(response.data)
        })
        .catch(function (error) {
            console.log(error);
            });
    },
    searchAllModel(success){
        plane.get("/flightsDistinct?column=model&min=0&max=40")
        .then(function (response) {
            success(response.data)
        })
        .catch(function (error) {
            console.log(error);
            });
    },
    searchAllDeparture(success){
        plane.get("/flightsDistinct?column=departure&min=0&max=40")
        .then(function (response) {
            success(response.data)
        })
        .catch(function (error) {
            console.log(error);
        });
    },
    searchAllDestination(success){
        plane.get("/flightsDistinct?column=destination&min=0&max=40")
        .then(function (response) {
            success(response.data)
        })
        .catch(function (error) {
            console.log(error);
        });
    },
    searchAllSeatallList(success){
        plane.get("/flightsDistinct?column=seatall&min=0&max=40")
        .then(function (response) {
            success(response.data)
        })
        .catch(function (error) {
            console.log(error);
        });
    },
}