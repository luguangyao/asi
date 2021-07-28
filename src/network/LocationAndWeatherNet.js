import axios from "axios";

export default{
    getLocation(success){
        axios
        .get("/location/cityjson?ie=utf-8")
        .then(function (response) {
          let data=JSON.parse(response.data.split("=")[1].split(';')[0])
          success(data)
          //return response.data
        });
    }
}