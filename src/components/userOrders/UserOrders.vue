<template>
  <div>
    <a-tabs v-model="curPage" @change="pageChange" > 
      <a-tab-pane key="1" :forceRender="true" >
        <span slot="tab">
          <a-icon type="snippets" />
          {{$t('m.allOrders')}}
        </span>
          <UserOrdersTable ref="allOrders" />
      </a-tab-pane>
      <a-tab-pane key="2" :forceRender="true" >
        <span slot="tab">
          <a-icon type="check" />
            {{$t('m.paidOrders')}}
        </span>
        <UserOrdersTable ref="paidOrders" />
      </a-tab-pane>
      <a-tab-pane key="3" :forceRender="true">
        <span slot="tab"  >
          <a-icon type="clock-circle" />
          {{$t('m.unpaidOrders')}}
        </span >
          <UserOrdersTable ref="unpaidOrders"  />
      </a-tab-pane>
      <a-tab-pane key="4" :forceRender="true">
        <span slot="tab">
          <a-icon type="issues-close" />
          {{$t('m.comfirmedOrders')}}
        </span>
          <UserOrdersTable ref="comfirmedOrders"  />
      </a-tab-pane>
      <a-tab-pane key="5" :forceRender="true">
        <span slot="tab">
          <a-icon type="close" />
          {{$t('m.canceledOrders')}}
        </span>
          <UserOrdersTable ref="canceledOrders" />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
import UserOrdersNet from "@/network/UserOrdersNet";
import UserOrdersTable from "@/components/userOrders/UserOrdersTable";

export default {
  name: "UserOrders",
  props: {
    page: {
      type: String,
      default:"0",
      required: true,
    },
  },
  data(){
    return{
      originOrders:[],
      allOrders:[],
      paidOrders:[],
      unpaidOrders:[],
      comfirmedOrders:[],
      canceledOredrs:[],
      curPage:"1"
    }
  },
  components:{
    UserOrdersTable,
  },
  watch:{
    
    originOrders:{
        handler:function(val,oldVal){
          val,oldVal
          this.setOrders()
        },
        deep:true
    }
  },
  methods:{
    setOrders(){
      // this.originOrders=data
      this.allOrders=new Array()
      this.paidOrders=new Array()
      this.unpaidOrders=new Array()
      this.comfirmedOrders=new Array()
      this.canceledOrders=new Array()
      this.originOrders.forEach(value=>{
        let keys=Object.keys(value)
        let item={}
        keys.forEach(k=>{
          item[k]=value[k]
          if(k=="paystatus"){
            item[k]=this.setPayStatus(value[k])
          }
          else if(k=="cabinid"){
            item[k]=this.setCabinid(value[k])
          }
          else if(k=="type"){
            item[k]=this.setType(value[k])
          }
        })
        this.allOrders.push(item)
        switch(value.paystatus){
          case "1":
            this.unpaidOrders.push(item)
            break;
          case "2":
            this.paidOrders.push(item)
            break;
          case "3":
          case "4":
            this.comfirmedOrders.push(item)
            break;
          case "5":
            this.canceledOrders.push(item)
            break;
        }
      })
      this.$refs.allOrders.setData(this.allOrders,this.originOrders,{pay:true,cancel:true,comfirm:true})
      this.$refs.paidOrders.setData(this.paidOrders,this.originOrders,{comfirm:true})
      this.$refs.unpaidOrders.setData(this.unpaidOrders,this.originOrders,{pay:true,cancel:true})
      this.$refs.comfirmedOrders.setData(this.comfirmedOrders,this.originOrders,{comfirm:true})
      this.$refs.canceledOrders.setData(this.canceledOrders,this.originOrders)
    },
    setPayStatus(d){
        switch(d){
            case "1": return "未支付";
            case "2": return "已支付";
            case "3": return "已确认";
            case "4": return "重新确认";
            case "5": return "已取消";
        }
    },
    setCabinid(data){
        switch(data){
            case "1": return "头等舱";
            case "2": return "商务舱";
            case "3": return "经济舱";
        }
    },
    setType(data){
        switch(data){
            case "1": return "成人票";
            case "2": return "学生票";
        }
    }	,
    searchOrdersSuccess(data){
      this.$message.success("成功查找所有订单")
      this.originOrders=data
      // this.setOrders(data)
    },
    searchOrdersFailue(){
      //this.$message.error("查找订单失败")
    },
    pageChange(){
      this.$store.commit("setUserOrdersPage",this.curPage)
      sessionStorage.setItem("userOrdersPage",this.curPage)
    },
    
  },
  created() {
     this.curPage=this.page
    //  this.curPage=sessionStorage.getItem("userOrdersPage")??"1"
     UserOrdersNet.showorder(this.searchOrdersSuccess.bind(this),this.searchOrdersFailue.bind(this));
  },
};
</script>
<style scoped>
</style>