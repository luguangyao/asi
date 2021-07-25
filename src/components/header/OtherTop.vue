<template>
  <a-page-header
    style="border: 1px solid rgb(235, 237, 240); background: white"
    @back="() => null"
  >
    <template slot="backIcon">
      <a-icon v-if="this.icontype==1" type="unordered-list" class="back-icon" ></a-icon>
      <a-icon v-else-if="this.icontype==2" type="left" class="back-icon" @click="back"></a-icon>
    </template>
    <template slot="title">
      <h3>{{ $t("m.title") }}</h3>
    </template>
    <template slot="subTitle">
      <h4>{{ $t("m.sub_title") }}</h4>
    </template>
    <template slot="extra">
      <LoginRegister />
    </template>
  </a-page-header>
</template>
<script>
import LoginRegister from "@/components/function/LoginRegister.vue";
export default {
  name: "OtherTop",
  props: {
    icontype: {
      type: Number,
      default: 1,
    },
  },
  components: {
    LoginRegister,
  },
  methods: {
    back() {
      history.go(-1);
    },
  },
};
</script>
<style scoped>
.back-icon {
  color: grey;
  font-size: 20px;
  transition: all 0.5s;
}
.back-icon:hover{
  color: blueviolet;
  font-size: 25px;
  font: bolder;
  transition: all 0.5s;
}
</style>