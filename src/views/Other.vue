<template>
  <div class="wrapper">
    <OtherTop>
       
    </OtherTop>
    <div class="main">
      <div class="menuwrapper"><Menu :dtype="2" class="menu"/></div>
      <div style="width:100%">
        <transition name="slide-fade">
          <router-view></router-view>
        </transition>
      </div>
      
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

}
.menu{
  position: fixed;
}

.slide-fade-enter-active {
  transition: all 1s ease .3s;
}
.slide-fade-leave-active {
  transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  opacity: 0;
}
</style>