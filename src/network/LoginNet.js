import axios from "axios"
// http://139.159.153.12/
const LoginNet={
    checkLogin(success){
        axios.get('loginnet/admin/checkLogin')
        .then(function (response) {
            if(success!=undefined){
                if(response.data==true){
                    success(true)
                }
                else{
                    success(false)
                }
            }
            return response
         })
        .catch(function (error) {
        console.log(error);
        });
    },
    login(loginData,success,failure){
        let data = new FormData();
        data.append('account',loginData.account);
        data.append('password',loginData.password);     
        data.append('code',loginData.code);     
        data.append('codekey',loginData.codekey);     
        axios.post('loginnet/admin/doLogin', data)
          .then(function (response) {
            console.log(response);
            switch(response.data){
                case 1:
                    success()
                    break;
                case -1:
                    failure("验证码错误")
                    break;
                case -2:
                    failure("密码为空")
                    break;
                case -3:
                    failure("验证码错误")
                    break;
                default:
                    failure("登录失败")
                    break;
            }   
          })
          .catch(function (error) {
            failure(error)
          });
    },
    getCode(success){
        axios.get('loginnet/admin/getCode?'+Math.random())
        .then(function (response) {
            success(response.data)
            //return response.data

         })
        .catch(function (error) {
        console.log(error);
        });
    },
    logout(success){
        axios.get('loginnet/admin/loginOut')
        .then(function (response) {
            localStorage.removeItem("account");
            if(success!=undefined){
                success()
            }
            return response
         })
        .catch(function (error) {
        console.log(error);
        });
    }
}
export default LoginNet