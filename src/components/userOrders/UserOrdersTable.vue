<template>
<div>
  <div>
    <a-table
      :columns="col"
      :data-source="data"
      size="small"
      :rowKey="(record, index) => index"
    >
      <template slot="operation" slot-scope="text, record" 
        >
        <a-space>
          <a-button type="primary" icon="alipay"  shape="circle" v-if="operation.pay&&record.paystatus=='未支付'" @click="payOrder(record)"></a-button>
          <a-button type="primary" icon="form" shape="circle" v-if="operation.comfirm&&(record.paystatus=='重新确认')" ></a-button>
          <a-button type="danger" icon="close" shape="circle" v-if="operation.cancel&&record.paystatus!='已取消'&&record.paystatus!='已支付'" @click="deleteOrder(record)"></a-button>
        </a-space>
      </template>
    </a-table>
  </div>
  <a-modal :visible="ispay" @ok="payOk" @cancel="payCancle" :width="800" title="确认支付">
        <a-descriptions title="是否确认支付??">
          <a-descriptions-item v-for="item in Object.keys(paydata)" :key="item" :label="item">
            <strong>{{paydata[item]}}</strong>
          </a-descriptions-item>
        </a-descriptions>
  </a-modal>
  <a-modal :visible="isdelete" @ok="deleteOk" @cancel="deleteCancle" :width="800" title="确认删除">
        <a-descriptions title="是否确认删除??">
          <a-descriptions-item v-for="item in Object.keys(deletedata)" :key="item" :label="item">
            <strong>{{deletedata[item]}}</strong>
          </a-descriptions-item>
        </a-descriptions>
  </a-modal>
</div>

</template>
<script>
import UserOrdersNet from "@/network/UserOrdersNet";
export default {
  name: "UserOrdersTable",
  data() {
    return {
      col: [],
      data: [],
      operation:{
          pay:false,
          comfirm:false,
          cancel:false
      },
      originOrders:[],
      ispay:false,
      paydata:{},
      isdelete:false,
      deletedata:{},

    };
  },
  
  methods: {
    setData(data,originOrders,operation) {
    //   this.data = data.map((d) => d);
     this.originOrders=originOrders
     this.operation.pay=operation?.pay??false
     this.operation.comfirm=operation?.comfirm??false
     this.operation.cancel=operation?.cancel??false
      this.data=data
      if (data.length <= 0) {
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
    payOrder(record){
        this.paydata=record
        this.ispay=true
    },
    payOk(){
        this.ispay=false
        UserOrdersNet.payorder(this.paydata,this.paySuccess.bind(this),this.payFailure.bind(this))
        
    },
    payCancle(){
        this.ispay=false
    },
    paySuccess(){
        this.$message.success("支付成功 正在处理请稍等",3)
         this.originOrders.forEach((item)=>{
          if(item.orderid==this.paydata.orderid){
          item.paystatus='2'
         }
        })
    },
    payFailure(reson){
        this.$message.error("支付失败  "+reson)
    },
    deleteOrder(record){
      this.deletedata=record
      this.isdelete=true
    },
    deleteOk(){
      UserOrdersNet.payorder(this.deletedata,this.paySuccess.bind(this),this.payFailure.bind(this))
      this.isdelete=false
    },
    deleteCancle(){
      this.isdelete=false
    },
    deletOrderSuccess(){
        this.$message.success("删除成功 正在处理请稍等",3)
        this.originOrders.forEach((item)=>{
          if(item.orderid==this.deletedata.orderid){
          item.paystatus='2'
         }
        })
    },
    deleteOrderFailure(reson){
        this.$message.success("删除失败  "+reson)
    },
    go0(){
      this.$router.go(0)
    }
  },
};
</script>
<style scoped>
</style>
