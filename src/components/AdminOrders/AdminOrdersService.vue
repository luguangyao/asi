<template>
  <div>
    <a-collapse defaultActiveKey="admin">
      <a-collapse-panel :header="$t('m.orderSeach')" :key="'admin'">
        <AdminOrdersSearch @ordersSearchData="getOrdersData"/>
      </a-collapse-panel>
    </a-collapse>
    <a-collapse defaultActiveKey="admin">
      <a-collapse-panel :header="$t('m.searchResult')" :key="'admin'">
        <AdminOrdersTables ref="showTable"/>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>
<script>
import AdminOrdersSearch from "@/components/AdminOrders/AdminOrdersSearch"
import AdminOrdersTables from "@/components/AdminOrders/AdminOrdersTables"
export default {
  name: "AdminOrdersService",
  data(){
    return{
      ordersData:[],
      listData:{}
    }
  },
  components:{
      AdminOrdersSearch,
      AdminOrdersTables
  },
  methods:{
    getOrdersData(data,listData){
      this.ordersData=data
      this.listData=listData
      this.setOrdersData()
    },
    setOrdersData(){
      this.$refs.showTable.setOrdersData(this.ordersData,this.listData)
    }
  }
};
</script>
<style scoped>
</style>
