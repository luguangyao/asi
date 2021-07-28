<template>
  <div>
    <a-button-group v-if="!$store.state.isLogin">
      <a-button size="small" @click="gotoLogin" ><a-icon type="fullscreen-exit"/>{{$t('m.login')}}</a-button>
      <a-button size="small" @click="gotoLogin"> 注册 <a-icon type="fullscreen"/></a-button>
    </a-button-group>
    <a-button-group v-if="$store.state.isLogin">
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
    setIsLogin(s){
      this.$store.commit("setIsLogin",s)
    },
    logout(){
      LoginNet.logout(this.logoutSuccess.bind(this))
    },
    logoutSuccess(){
      this.$message.info("登出成功")
      this.router.history.go(0)
    }
  },
  created(){
    LoginNet.checkLogin(this.setIsLogin.bind(this))
  }
};
</script>
<style scoped>
</style>
