<template>
  <div>
    <a-tabs :default-active-key="this.selected" tab-position="top">
      <template slot="tabBarExtraContent">
          <div>
              {{selected}}
            下载数据
          <a-button type="primary" shape="circle" icon="download"  />
          </div>
      </template>
      <a-tab-pane :key="me.name" :tab="me.name" v-for="me in this.menu.children"> {{me.name}} </a-tab-pane>
      
    </a-tabs>
  </div>
</template>
<script>
export default {
  name: "UserInfo",
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
      console.log("created")
  },
};
</script>
<style scoped>
</style>
