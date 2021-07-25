<template>
<div>
  <a-carousel autoplay>
    <div><h3>1</h3></div>
    <div><h3>2</h3></div>
    <div><h3>3</h3></div>
    <div><h3>4</h3></div>
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
  height: 460px;
  line-height: 160px;
  background: grey ;
  overflow: hidden;
}

.ant-carousel >>> .slick-slide h3 {
  color: #fff;
}
</style>