<template>
<div>
  <div>
    <a-button type="primary" href="/admin/ordersPOI" v-if="displayData.length>0" shape='circle  '><a-icon type="download"></a-icon> </a-button>
    <a-table
      :columns="col"
      :data-source="displayData"
      size="small"
      :rowKey="(record, index) => record.orderid"
    >
      <template slot="operation" slot-scope="text, record">
        <a-space>
          <a-button
            type="danger"
            @click="deleteData(record)"
            :disabled="record.paystatus=='已取消'||moment(record.flightdate,'YYYY-MM-DD')<moment()"
          >强制退票</a-button>
        </a-space>
      </template>
    </a-table>
  </div>
  <a-modal title="强制退票"
      :visible="isdelete"
      @ok="deleteOk"
      @cancel="deleteCancle" :width="800">
       <a-descriptions title="是否强制退票??">
          <a-descriptions-item v-for="item in Object.keys(deleted)" :key="item" :label="item">
            <strong>{{deleted[item]}}</strong>
          </a-descriptions-item>
        </a-descriptions>
  </a-modal>
  </div>
</template>
<script>
import OrdersNet from '@/network/OrdersNet'
import moment from  'moment'
export default {
  name: "OrdersTables",
  data() {
    return {
      data: [],
      col: [],
      displayData:[],
      listData:{},
      isdelete:false,
      deleted:{},
      moment:moment
    };
  },
  methods: {
    setOrdersData(data,listData) {
      this.listData = listData;
      this.data = data.map((d) => d);
      this.setDisplayData()
      if (data.length <= 0) {
        this.$message.info("本次没有查询到任何数据", 5);
        return;
      }
      let keys = Object.keys(this.data[0]);
      this.col = keys.map((k) => {
        return {
          title: k,
          dataIndex: k,
          key: k,
          sorter: (a, b) => a[k] > b[k],
        };
      });
      this.col.push({
        title: "operation",
        dataIndex: "operation",
        scopedSlots: { customRender: "operation" },
      });
      this.data = data;
    },
    deleteData(record) {
      this.deleted=record
      this.isdelete=true
    },
    setDisplayData(){
        this.displayData=[]
        this.data.forEach((value)=>{
            let key=Object.keys(value)
            let item={}
            key.forEach((k)=>{
                item[k]=value[k]
                if(k=="cabinid"){
                    this.searchTitle(item,k,this.listData.cabinidList)
                }
                else if(k=="paystatus"){
                    this.searchTitle(item,k,this.listData.paystatusList)
                }
                else if(k=="type"){
                    this.searchTitle(item,k,this.listData.typeList)
                }
            })
            this.displayData.push(item)
        });
    },
    searchTitle(item,k,listd){
        listd.forEach((it)=>{
            if(it.value==item[k]){
                item[k]=it.text
            }
        })
    },
    deleteOk(){
        OrdersNet.refundOrders(this.deleted,this.deleteOrdersSuccess.bind(this),this.deleteOrdersFailure.bind(this))
        this.isdelete=false
    },
    deleteCancle(){
        this.isdelete=false
    },
    deleteOrdersSuccess(data){
        this.$message.success("删除订单成功 ")
        this.displayData.forEach(item=>{
            if(data.idcard==item.idcard&&data.flightdate==item.flightdate){
                item.paystatus="已取消"
            }
        })
        this.deleted.paystatus='已取消'
    },
    deleteOrdersFailure(reson){
        this.$message.error("删除订单失败 "+reson)
    }
  },
};
</script>
<style scoped>
</style>