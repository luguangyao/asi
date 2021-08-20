import axios from "axios"
const admin=axios.create({
    baseURL: '/admin',
    timeout:1000
})
const user=axios.create({
    baseURL: '/user',
    timeout:10000
})
const LoginNet={
    checkLogin(success){
        admin.get('/checkLogin')
        .then(function (response) {
            if(success!=undefined){
                if(response.data==true){
                    console.log(response)
                    success(true)
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
        admin.post('/doLogin', data)
          .then(function (response) {
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
    adminGetCode(success){
        admin.get('/getCode?'+Math.random())
        .then(function (response) {
            success(response.data)
            //return response.data

         })
        .catch(function (error) {
        console.log(error);
        });
    },
    logout(success){
        admin.get('/loginOut')
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
    },
    doRegister(registData,success,failure){
        console.log(registData)
        let formData=new FormData()
        formData.append("account",registData.account)
        formData.append("password",registData.password)
        formData.append("chkpassword",registData.chkpassword)
        admin.post("/doRegister",formData)
        .then(function (response) {
            if(response.data==1){
                success()
            }
            else{
                failure()
            }
         })
        .catch(function (error) {
        console.log(error);
        failure()

        });
    },
    checkAccount(account,success,failure){
        let formData=new FormData()
        formData.append("account",account)
        admin.post("/checkAccount",formData)
        .then(function (response) {
            if(response.data==0){
                success()
            }
            else{
                failure()
            }
         })
        .catch(function (error) {
        console.log(error);
        failure()

        });
    },
    updatePwd(updatePwdData,success,failure){
        let formData=new FormData()
        formData.append("account",updatePwdData.account)
        formData.append("oldpassword",updatePwdData.oldpassword)
        formData.append("newpassword",updatePwdData.newpassword)
        formData.append("chkpassword",updatePwdData.chkpassword)
        admin.post("/checkAccount",formData)
        .then(function (response) {
            console.log(response)
            if(response.data==1){
                success()
            }
            else{
                failure()
            }
         })
        .catch(function (error) {
        console.log(error);
        failure()
        });
    },
    userGetCode(success){
        user.get('/getCode?'+Math.random())
        .then(function (response) {
            success(response.data)
         })
        .catch(function (error) {
        console.log(error);
        });
    },
    userLogin(loginData,success,failure){
        let data = new FormData();
        data.append('idcard',loginData.account);
        data.append('password',loginData.password);     
        data.append('code',loginData.code);     
        data.append('codekey',loginData.codekey);     
        user.post('/doLogin', data)
          .then(function (response) {
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
    userCheckLogin(success){
        user.get('/checkLogin')
        .then(function (response) {
            if(success!=undefined){
                if(response.data==true){
                    success(true)
                }
            }
            return response
         })
        .catch(function (error) {
        console.log(error);
        });
    },
    userLogout(success){
        user.get('/loginOut')
        .then(function (response) {
            if(success!=undefined){
                success()
            }
            return response
         })
        .catch(function (error) {
        console.log(error);
        });
    },
}
export default LoginNet