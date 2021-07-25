<template>
  <div class="wrapper" >
        <RotateImg/>
        <a-card title="Default size card" :bordered="false" class="card"  >
          <a slot="extra" href="#">more</a>
          <p>card content</p>
        </a-card>
  </div>
</template>
<script>
import RotateImg from "../../components/function/RotateImg.vue";
export default {
  name: "Card",
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
}
.card{
    width: 100%;
    background-color: rgba(0,0,0,0);
    border-radius: 10px;
    height: 150px;
}
</style>