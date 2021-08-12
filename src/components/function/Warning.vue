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
    background: rgb(245, 255, 101);
    background-image: linear-gradient(45deg,white 25%,#f0f0f0 0,#f0f0f0 50%,white 0,white 75%,#f0f0f0  0);
    background-size: 80px 80px;
    display: flex;
    justify-content: center;
    height: 100px;
    border:2px #F0F0F0 solid;
    width:80%;
    border-radius: 5px;
    align-items:center;
}
</style>