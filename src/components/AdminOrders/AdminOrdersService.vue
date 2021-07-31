<template>
  <div>
    <a-collapse defaultActiveKey="admin">
      <a-collapse-panel header="订单查询" :key="'admin'">
        <AdminOrdersSearch/>
      </a-collapse-panel>
    </a-collapse>
    <a-collapse defaultActiveKey="admin">
      <a-collapse-panel header="查询数据" :key="'admin'">
        <AdminOrdersTables/>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>
<script>
import AdminOrdersSearch from "@/components/AdminOrders/AdminOrdersSearch"
import AdminOrdersTables from "@/components/AdminOrders/AdminOrdersTables"
export default {
  name: "AdminOrdersService",
  components:{
      AdminOrdersSearch,
      AdminOrdersTables
  }
};
</script>
<style scoped>
</style>
