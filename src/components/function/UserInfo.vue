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
        <UserInfoDataJoin :title="me.name" :showData="dataSet[me.name]" :needBut="butSet[me.name] || []"/>
      </a-tab-pane>
      
    </a-tabs>
  </div>
</template>
<script>
import UserInfoNet from "@/network/UserInfoNet";
import UserInfoDataJoin from '@/components/function/UserInfoDataJoin';
const sexTo = {
  m : "m.m",
  f : "m.f",
}
sexTo
let testing = true;
function myLog  (e) {
  if (testing) console.log(e);
}
myLog

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
  methods: {
    async userInfo () {
      return UserInfoNet.displayUserInfo().then( (res) =>{
        return res && res.data;
      }, (e) =>{
        myLog(e);
      }).catch((e) =>{
        myLog(e);
      })
    },
    async changeInfo (nInfo) {
      return UserInfoNet.updateUserInfo(nInfo).then( (res) =>{
        return res && res.data;
      }, (e) =>{
        myLog(e);
      })
    },
    formData (name, data) {
      let nd = [];
      switch (name) {
        case this.menu.children[0].name:{
          let obj = {...data};
          delete obj.password;
          for (let key of Object.keys(obj)){
            nd.push({
              name: key,
              display: `m.${key}`,
              value: obj[key],
              changeAble: false,
            });
          }
          break;
        }
        case this.menu.children[1].name:{
          let obj = {...data};
          delete obj.password;
          delete obj.idcard;
          for (let key of Object.keys(obj)){
            nd.push({
              name: key,
              display: `m.${key}`,
              value: obj[key],
              changeAble: true,
            });
          }
          break;
        }
        case this.menu.children[2].name:{
          break;
        }
        default:
          break;
      }
      this.dataSet[name] = nd;
    },
    formBut () {
      let that = this;
      this.butSet[this.menu.children[0].name] = [];
      this.butSet[this.menu.children[1].name] = [{
        name: "submit",
        span: 12,
        display: "提交修改信息",
        callback: (td) =>{
          that.changeInfo(td);
        }
      }];
      this.butSet[this.menu.children[2].name] = [];
    }
  },
  data() {
    return {
      menu: this.$store.state.personalMenuList[0],
      butSet: {},
      dataSet: {},
    };
  },
  async created() {
      // console.log("created")
      let that = this;
      this.formBut();
      let data = await this.userInfo();
      this.menu.children.forEach((item)=>{
        that.formData(item.name, data);
      });
      this.$forceUpdate();
  },
};
</script>
<style scoped>
</style>
