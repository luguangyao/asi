<template>
  <a-page-header
    style="border: 1px solid rgb(235, 237, 240);background:white"
    @back="() => null"
  >
  <a-icon type="unordered-list" slot="backIcon" class="back-icon"></a-icon>
  <template slot="title">
      <h3>{{$t('m.title')}}</h3>
  </template>
  <template slot="subTitle">
      <h4>{{$t('m.sub_title')}}</h4>
  </template>
  <template slot="extra">
      <LoginRegister/>
  </template>
  </a-page-header>
</template>
<script>
import LoginRegister from "@/components/function/LoginRegister.vue"
export default {
  name: "OtherTop",
  components:{
      LoginRegister
  }
};
</script>
<style scoped>
.back-icon{
  color:grey;
  font-size:20px;
}
</style>