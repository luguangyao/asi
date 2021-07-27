import axios from "axios"
// http://139.159.153.12/
const LoginNet={
    checkLogin(){
        axios.get('loginnet/admin/checkLogin')
        .then(function (response) {
            console.log("/admin/checkLogin   返回数据")
            console.log(response);
            return response.data
         })
        .catch(function (error) {
        console.log(error);
        });
    }
}
export default LoginNet