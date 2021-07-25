<template>
  <div>
    <a-button-group>
      <a-button size="small" @click="gotoLogin" ><a-icon type="fullscreen-exit"/>{{$t('m.login')}}</a-button>
      <a-button size="small" >{{$t('m.login')}}<a-icon type="fullscreen"/></a-button>
    </a-button-group>
  </div>
</template>
<script>
export default {
  name: "LoginRegister",
  methods:{
    gotoLogin(){
      this.$router.push({path:"/login"})
    }
  }
};
</script>
<style scoped>
</style>
