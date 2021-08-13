<template>
  <div>
    <a-tabs :default-active-key="this.selected" tab-position="top">
      <template slot="tabBarExtraContent">
          <div>
              <h1>{{selected}}</h1>
            下载数据
          <a-button type="primary" shape="circle" icon="download"  />
          </div>
      </template>
      <a-tab-pane :key="me.name" :tab="me.name" v-for="me in this.menu.children"> 
        <UserInfoDataJoin :title="me.name" />
      </a-tab-pane>
      
    </a-tabs>
  </div>
</template>
<script>
import UserInfoDataJoin from '@/components/function/UserInfoDataJoin';
export default {
  name: "UserInfo",
  components:{
    UserInfoDataJoin
  },
  props: {
    selected: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      menu: this.$store.state.personalMenuList[0],
    };
  },
  created() {
      // console.log("created")
  },
};
</script>
<style scoped>
</style>
