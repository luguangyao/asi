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
    margin-top: 25px;
    margin-bottom: 5px;
    display: flex;
    height: 100px;
    justify-content: center;
    overflow: hidden;
    position: relative;
}

.content{
    /* background: rgb(245, 255, 101);
    background-image: linear-gradient(45deg,white 25%,#f0f0f0 0,#f0f0f0 50%,white 0,white 75%,#f0f0f0  0);
    background-size: 80px 80px; */
    display: flex;
    justify-content: center;
    width:80%;
    border-radius: 5px;
    align-items:center;
    z-index: 0;
}
.wrapper::before{
    height: 100%;
    width: 300%;
    content: "";
    position: absolute;
    background: rgb(245, 255, 101);
    background-image: linear-gradient(45deg,white 25%,#f0f0f0 0,#f0f0f0 50%,white 0,white 75%,#f0f0f0  0);
    background-size: 80px 80px;
    animation: move 30s linear infinite;
}
@keyframes move {
  0%   {left:0px; top:0px;}
  100% { left:-100%; top:0px;}
}
</style>