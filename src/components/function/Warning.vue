<template>
  <div class="wrapper">
      <div  class="content">
      <div>
              <a-icon type="warning" style="font-size:60px;text-align:center "></a-icon>
      </div>
      <a-divider type="vertical" style="height:80%;width:2px" />
      <div>
             <h1>{{$t('m.warningTitle')}}</h1>
             <h4>{{$t('m.warningTitleSub')}}</h4>
      </div>
      </div>
  </div>
</template>
<script>
export default{
    name:"Warning"
}
</script>
<style scoped>
.wrapper{
    margin: 5px;
    display: flex;
    justify-content: center;
}
.content{
    background: white;
    display: flex;
    justify-content: center;
    height: 100px;
    border:1px grey solid;
    width:80%;
    border-radius: 5px;
    align-items:center;
}
</style>