<template>
  <div class="wrapper">
    <OtherTop/>
    <div class="main">
      <div class="menuwrapper"><Menu :dtype="2" class="menu"/></div>
      <router-view></router-view>
    </div>
    <Footer/>


  </div>
</template>

<script>
import OtherTop from "@/components/header/OtherTop"
import Menu from "@/components/header/Menu"
import Footer from "@/components/footer/Footer"
export default {
  name:"Other",
  components:{
    OtherTop,
    Menu,
    Footer
  }
}
</script>
<style scoped>
.main{
  display: flex;
  width: 100%;
}
.menuwrapper{
  width: 120px;
  z-index: 100;
  
}
.menu{
  position: fixed;
}
</style>