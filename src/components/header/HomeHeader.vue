<template>
  <div class="wrapper">
    <a-page-header  @back="() => $router.go(-1)"  class="pageheader" :backIcon="false">

      <template slot="extra" > 
            <Menu :dtype="1"></Menu>
      </template>

      <template slot="subTitle" >
        {{$t('m.sub_title')}}
      </template>

      <template slot="title">
          <img :src="headIcon[selectedIcon]" alt="" class="iconclass">
          <h1 class="title">{{$t('m.title')}}</h1>
      </template>
    </a-page-header>
  </div>
</template>
<script>
import Menu from './Menu'
export default {
  name: "HomeHeader",
  data(){
      return{
          headIcon:[
            require('@/common/images/doge/doge1.png'),
            require('@/common/images/doge/doge2.png'),
            require('@/common/images/doge/doge3.png'),
            require('@/common/images/doge/doge4.png'),
            require('@/common/images/doge/doge5.png'),
            require('@/common/images/doge/doge6.png'),
          ],
          selectedIcon:0
      }
  },
  created(){
    setInterval(()=>{
      this.selectedIcon=(this.selectedIcon+1)%this.headIcon.length
    },200)
  },
  components:{
      Menu
  }
};
</script>

<style scoped>
.iconclass{
  height: 60px;
}
tr:last-child td {
  padding-bottom: 0;
}
#components-page-header-demo-responsive .content {
  display: flex;
}
#components-page-header-demo-responsive .ant-statistic-content {
  font-size: 20px;
  line-height: 28px;
}
@media (max-width: 576px) {
  #components-page-header-demo-responsive .content {
    display: block;
  }

  #components-page-header-demo-responsive .main {
    width: 100%;
    margin-bottom: 12px;
  }

  #components-page-header-demo-responsive .extra {
    width: 100%;
    margin-left: 0;
    text-align: left;
  }
}
.pageheader{
     border: 1px solid rgb(235, 237, 240) ;
     border-top: 0px;
}
.title{
    display: inline;
    
}
.title-icon{
    font-size: 50px;
    padding:5px
}
.wrapper{
    box-shadow: gray 1px 1px 1px;
}

</style>