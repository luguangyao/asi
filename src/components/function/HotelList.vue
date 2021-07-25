<template>
  <div class="hotellistwrapper">
    <div class="top">
      <a-button type="primary" style="float: left">饭店(2500间)</a-button>
      <a-dropdown>
        <a-menu slot="overlay" @click="handleMenuClick">
          <a-menu-item key="1"> 1st item </a-menu-item>
          <a-menu-item key="2"> 2nd item </a-menu-item>
          <a-menu-item key="3"> 3rd item </a-menu-item>
        </a-menu>
        <a-button type="primary" style="float: right"> {{$t('m.sortBy')}} <a-icon type="down" /> </a-button>
      </a-dropdown>
    </div>
    <div class="hotellist">
      <Card class="card" />
      <Card class="card" />
      <Card class="card" />
      <Card class="card" />
      <Card class="card" />
    </div>
    <div class="nextpage">
      <a-button type="primary" ghost
        >下一页 <a-icon type="right"></a-icon
      ></a-button>

      <h5 style="margin-top: 20px; color: grey">共显示2500笔交易 50页</h5>
    </div>
  </div>
</template>
<script>
import Card from "@/components/display/Card";
export default {
  name: "HotelList",
  components: {
    Card,
  },
};
</script>
<style scoped>
.hotellistwrapper {
  display: flex;
  flex-direction: column;
}
.top {
  margin-bottom: 30px;
  padding-left: 10px;
  padding-right: 10px;
}
.card {
  margin-top: 3px;
}
.hotellist {
  height: 520px;
  overflow: scroll;
  overflow-x: hidden;
}
.hotellist::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
.hotellist::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgba(68, 67, 67, 0.2);
  background: grey;
}
.hotellist::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: #ededed;
}
.nextpage {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>