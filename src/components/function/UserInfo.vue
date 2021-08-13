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
        <UserInfoDataJoin :title="me.name" :needBut="butSet[me.name] || []"/>
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
      butSet: {}
    };
  },
  created() {
      // console.log("created")
      this.butSet[this.menu.children[0].name] = [{
        name: "submit",
        span: 12,
        display: "提交",
        callback: (td) =>{
          alert(td)
        }
      }]
  },
};
</script>
<style scoped>
</style>
