<template>
  <div class="homewrapper">
    <div class="headerwrapper">
      <IndexTop></IndexTop>
      <IndexHeader class="header"></IndexHeader>
    </div>
    <div class="carouse-and-search">
      <div  class="carouse">
        <MyCarousel class="myCarousel"></MyCarousel>
      </div>
      <div class="search">
        <PlaneSearch></PlaneSearch>
      </div>
    </div>
    
    <Warning/>
     <hr>
     <div class="des">
      <Destination/>
    </div>
    
    <hr>
    <Footer></Footer>
  </div>
</template>

<script>
import IndexTop from "@/components/header/HomeTop.vue";
import IndexHeader from "@/components/header/HomeHeader";
import MyCarousel from "@/components/carousel/MyCarousel";
import PlaneSearch from "@/components/plane/PlaneSearch";
import Warning from "@/components/function/Warning";
import Destination from "@/components/display/Destination";
import Footer from "@/components/footer/Footer"

export default {
  name: "Home",
  methods: {},
  components: {
    IndexTop,
    IndexHeader,
    MyCarousel,
    PlaneSearch,
    Warning,
    Destination,
    Footer
  },
};
</script>
<style  scoped>
.headerwrapper{
    background-color: rgba(255  , 255, 255, 0.5);
}
.carouse-and-search{
  position: relative;
  width:100%;
}

.search{
  position: absolute;
  top:100px;
  left: 10%;
}
hr{
  width: 80%;
  margin-top: 20px;
  margin-bottom: 20px;
  border: 1px blueviolet solid;
}
.des{
  display: flex;
  width: 80%;
  margin-left: 10%;
}
</style>
