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
        <a-space v-if="moment(record.flightdate,'YYYY-MM-DD')<moment()">
          <div style="text-decoration:line-through; color:red">逾期</div>
        </a-space>
        <a-space v-else>
          <a-button type="primary" icon="alipay"  shape="circle" v-if="record.paystatus=='未支付'" @click="payOrder(record)"></a-button>
          <a-button type="primary" icon="form" shape="circle" v-if="(record.paystatus=='待确认')" @click="payOrder(record)"></a-button>
          <a-button type="danger" icon="rest" shape="circle" v-if="(record.paystatus=='未支付')" @click="deleteOrder(record)"></a-button>
          <a-button type="danger" icon="close" shape="circle" v-if="(record.paystatus=='已支付')||(record.paystatus=='待确认')" @click="refundOrder(record)"></a-button>
        </a-space>
      </template> 
    </a-table>
  </div>
  <a-modal :visible="ispay" @ok="payOk" @cancel="payCancle" :width="800" title="确认支付">
        <a-descriptions title="是否确认支付??">
          <a-descriptions-item v-for="item in Object.keys(paydata)" :key="item" :label="item" >
            <strong >{{paydata[item]}}</strong>
          </a-descriptions-item>
          <a-descriptions-item label="其它">
              <a-button type="link" @click="gotopay"><strong>前往支付页面</strong></a-button>
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
  <a-modal :visible="isrefund" @ok="refundOk" @cancel="refundCancel" :width="800" title="确认退款">
        <a-descriptions title="是否确认退款??">
          <a-descriptions-item v-for="item in Object.keys(refunddata)" :key="item" :label="item">
            <strong >{{refunddata[item]}}</strong>
          </a-descriptions-item>
        </a-descriptions>
  </a-modal>
</div>

</template>
<script>
import UserOrdersNet from "@/network/UserOrdersNet";
import moment from 'moment'
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
      isrefund:false,
      refunddata:{},
      moment:moment
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
      UserOrdersNet.delorder(this.deletedata,this.deletOrderSuccess.bind(this),this.deleteOrderFailure.bind(this))
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
        this.$message.error("删除失败  "+reson)
    },
    refundOrder(record){
      this.isrefund=true
      this.refunddata=record
    },
    refundCancel(){
      this.isrefund=false
    },
    refundOk(){
      UserOrdersNet.refundOrders(this.refunddata,this.refundSuccess.bind(this),this.refundFailure.bind(this))
      this.isrefund=false
    },
    refundSuccess(){
        this.$message.success("退款成功")
        this.originOrders.forEach((item)=>{
          if(item.orderid==this.refunddata.orderid){
          item.paystatus='5'
         }
        })
    },
    refundFailure(reson){
        this.$message.error("删除失败  "+reson)
    },
    go0(){
      this.$router.go(0)
    },
    gotopay(){
      for(let i=0;i<this.originOrders.length;i++){
        if(this.originOrders[i].orderid==this.paydata.orderid)
          this.$router.push({name:'pay',params:{
          order:this.originOrders[i]
        }})
      }
    }
  },
};
</script>
<style scoped>
</style>
