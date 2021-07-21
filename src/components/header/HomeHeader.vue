<template>
  <div class="wrapper">
    <a-page-header  @back="() => $router.go(-1)"  class="pageheader" :backIcon="false">

      <template slot="extra" > 
            <Menu ></Menu>
      </template>

      <template slot="subTitle" >
        {{subTitle}}
      </template>

      <template slot="title">
          <a-icon type="twitter" class="title-icon"></a-icon>
          <h1 class="title">{{title}}</h1>
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
          title:"Air System",
          subTitle:"The most valuable Flight Network",
          choices:['Message','Flight','Hotel','Personal','FAQ']
      }
  },
  components:{
      Menu
  }
};
</script>

<style scoped>
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
}
.title{
    display: inline;
}
.title-icon{
    font-size: 50px;
    padding:5px
}
.wrapper{
    box-shadow: grey 5px 5px 5px;
}

</style>