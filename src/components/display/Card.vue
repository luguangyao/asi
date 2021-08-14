<template>
  <div class="wrapper" @click="clickF(item)">
        <RotateImg :title="item.info.pname" :text="''"/>
        <a-card :title="item.info.aname" :bordered="false" class="card"  >
          <!-- <a slot="extra" href="#">more</a> -->
          <p>{{$t("m.longitude")}} : {{item.info.py}}</p>
          <p>{{$t("m.latitude") }}:  {{item.info.px}}</p>
          <p></p>
        </a-card>
  </div>
</template>
<script>
import RotateImg from "../../components/function/RotateImg.vue";
export default {
  name: "Card",
  props:['item', 'clickF'],
  components: {
    RotateImg,
  },
};
</script>
<style scoped>
.wrapper {
  display: flex;
  border: 1px solid grey;
  border-radius: 10px;
  margin: 0%;
  padding: 0%;
  width: 100%;
}
.card{
    width: 100%;
    background-color: rgba(0,0,0,0);
    border-radius: 10px;
    height: 150px;
}
</style>