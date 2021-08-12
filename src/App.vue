<template>
  <div id="app">
    <transition name="slide-fade">
          <router-view></router-view>
        </transition>
  </div>
</template>
<script>
export default {
  name:"App",
  components:{
  }
}
</script>

<style>
#app{
  background-image: url("~@/common/images/background.png") ;

}
body::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
body::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgba(68, 67, 67, 0.2);
  background: grey;
}
body::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: #ededed;
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
