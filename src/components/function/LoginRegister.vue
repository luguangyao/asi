<template>
  <div>
    <a-button-group v-if="!$store.state.loginData.isLogin">
      <a-button size="small" @click="gotoLogin" ><a-icon type="fullscreen-exit"/>{{$t('m.login')}}</a-button>
      <a-button size="small" @click="gotoLogin"> {{$t('m.regist')}} <a-icon type="fullscreen"/></a-button>
    </a-button-group>
    <a-button-group v-if="$store.state.loginData.isLogin">
      <a-button size="small" @click="logout" type="primary" ghost ><a-icon type="fullscreen-exit"/>{{$t('m.logout')}}</a-button>
      <a-button size="small" type="primary"> {{$t('m.welcome')}} <a-icon type="user"/></a-button>
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
      sessionStorage.setItem("isLogin",s)
    },
    logout(){
        LoginNet.userLogout(this.logoutSuccess.bind(this))
        LoginNet.logout(this.logoutSuccess.bind(this))
        this.setLoginData(false)
    },
    logoutSuccess(){
      this.$message.info("登出成功")
      this.$router.history.go(0)
    },
    
  },
  created(){
        this.setLoginData(false)
          LoginNet.userCheckLogin(this.setLoginData.bind(this))
          LoginNet.checkLogin(this.setLoginData.bind(this))
  }
  
};
</script>
<style scoped>
</style>
