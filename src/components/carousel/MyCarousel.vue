<template>
<div class="carouselwrapper">
  <a-carousel autoplay >
    <div><img src="~@/common/images/travel/1.jpg" alt="" class="carouselImg" width="100%" height="100%"/></div>
    <div><img src="~@/common/images/travel/2.jpg" alt="" class="carouselImg" width="100%" height="100%"/></div>
    <div><img src="~@/common/images/travel/3.jpg" alt="" class="carouselImg" width="100%" height="100%"/></div>
    <div><img src="~@/common/images/travel/4.jpg" alt="" class="carouselImg" width="100%" height="100%"/></div>
    <div><img src="~@/common/images/travel/5.jpg" alt="" class="carouselImg" width="100%" height="100%"/></div>
  </a-carousel>
  </div>
</template>
<script>
export default {
    name:'MyCarousel'
}
</script>
<style scoped>
/* For demo */

.ant-carousel >>> .slick-slide {
  text-align: center;
  height: 600px;
  line-height: 160px;
  background: grey ;
  overflow: hidden;
}

.ant-carousel >>> .slick-slide h3 {
  color: #fff;
}
.carouselImg{
  box-shadow: 15px 15px 15px grey inset;

}
.carouselwrapper{
  margin:5px;
  margin-top: 2px;
  box-shadow: 5px 5px 5px gray ;
}
</style>