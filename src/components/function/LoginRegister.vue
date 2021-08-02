<template>
  <div>
    <a-button-group v-if="!$store.state.loginData.isLogin">
      <a-button size="small" @click="gotoLogin" ><a-icon type="fullscreen-exit"/>{{$t('m.login')}}</a-button>
      <a-button size="small" @click="gotoLogin"> 注册 <a-icon type="fullscreen"/></a-button>
    </a-button-group>
    <a-button-group v-if="$store.state.loginData.isLogin">
      <a-button size="small" @click="logout" type="primary" ghost ><a-icon type="fullscreen-exit"/>{{$t('m.logout')}}</a-button>
      <a-button size="small" type="primary"> 欢迎 <a-icon type="user"/></a-button>
    </a-button-group>
  </div>
</template>
<script>
import LoginNet from "@/network/LoginNet"

export default {
  name: "LoginRegister",
  methods:{
    gotoLogin(){
      this.$router.push({path:"/login"})
    },
    setLoginData(s){
      this.$store.commit("setLoginData",s)
    },
    logout(){
      if(this.$store.state.loginData.loginType==1){
        LoginNet.userLogout(this.logoutSuccess.bind(this))
      }
      else{
        LoginNet.logout(this.logoutSuccess.bind(this))
      }
    },
    logoutSuccess(){
      this.$message.info("登出成功")
      this.$router.history.go(0)
    },
    
  },
  created(){
        this.setLoginData(false)
        if(sessionStorage.getItem("loginType")==1){
          LoginNet.userCheckLogin(this.setLoginData.bind(this))
        }else{
          LoginNet.checkLogin(this.setLoginData.bind(this))
        }
  }
  
};
</script>
<style scoped>
</style>
