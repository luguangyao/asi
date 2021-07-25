<template>
  <div class="wrapper" style="margin:30px">
    <a-card >
      <h5 slot="title" ><strong>为您推荐的酒店</strong></h5>
      <a-button slot="extra" size="small">探索跟多目的地<a-icon type="select" /></a-button>
      <div class="main">
          <div class="search" >
            <HotelSearch/>
            <hr style="margin:10px;margin-top:30px">
            <HotelList/>
          </div>
          <div class="map">
              map
          </div>
      </div>
    </a-card>
  </div>
</template>
<script>
import HotelSearch from "@/components/function/HotelSearch";
import HotelList from "@/components/function/HotelList";


export default {
  name: "Hotel",
  components: {
    HotelSearch,
    HotelList
  },
};
</script>
<style scoped>
.wrapper{
    width: 100%;
}
.search{
  width: 55%;
  margin-right: 15px;
}
.main{
    display: flex;
}
.map {
  width: 45%;
  border: 1px grey solid;
}
</style>