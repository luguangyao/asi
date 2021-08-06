<template>
  <div class="payfinishwrapper">
    <div>
      <h4>若无订单项,请返回上一级,点击前往订票按钮</h4>
      <a-card v-for="item in order" :key="item.orderid" >
        <a-card-grid style="width:70%;height:275px">
          <a-descriptions bordered :column="3" size="middle">
            <a-descriptions-item :span="2">
              <strong slot="label">{{$t('m.orderid')}}</strong>
              {{item.orderid}}
            </a-descriptions-item>
            <a-descriptions-item>
              <strong slot="label">{{$t('m.user')}}</strong>
              {{item.idcard}}
            </a-descriptions-item>
            <a-descriptions-item>
              <strong slot="label">{{$t('m.paystatus')}}</strong>
              <strong>{{flightDataType.toPaystatus(item.paystatus).text}}</strong>
            </a-descriptions-item>
            <a-descriptions-item>
              <strong slot="label">{{$t('m.filghtid')}}</strong>
              {{item.flightid}}
            </a-descriptions-item>
            <a-descriptions-item>
              <strong slot="label">{{$t('m.seat')}}</strong>
              {{item.seatid}}
            </a-descriptions-item>
            <a-descriptions-item>
              <strong slot="label">{{$t('m.flightdeparturetime')}}</strong>
              {{item.flightdate}}
            </a-descriptions-item>
            <a-descriptions-item>
              <strong slot="label">{{$t('m.price')}}</strong>
              <strong style="color:red">￥{{item.paymoney}}</strong>
            </a-descriptions-item>
            <a-descriptions-item>
              <strong slot="label">{{$t('m.cabintype')}}</strong>
              {{ flightDataType.toCabinid(item.cabinid).text}}
            </a-descriptions-item>
            <a-descriptions-item>
              <strong slot="label">{{$t('m.flighttype')}}</strong>
              {{ flightDataType.toType(item.type).text}}
            </a-descriptions-item>
            <a-descriptions-item>
              <strong slot="label">{{$t('m.paytime')}}</strong>
              <strong >{{item.paytime==null?'--':item.paytime}}</strong>
            </a-descriptions-item>
          </a-descriptions>
        </a-card-grid>
        <a-card-grid style="width:30%;height:275px">
          <a-result v-if="item.paystatus=='1'" status="warning" title="订单尚未支付"
            sub-title="请及时支付订单,避免订单过期" style="padding:0px">
            <template #extra>
            </template>
          </a-result>
          <a-result v-if="item.paystatus=='2'" status="success" title="订单已完成支付"
            sub-title="订单已完成支付,感谢您的光顾" style="padding:0px">
            <template #extra>
              <p>订单支付的时间<br>{{item.paytime.format('YYYY-MM-DD hh:mm')}}</p>
            </template>
          </a-result>
          <a-result v-if="item.paystatus=='5'" status="error" title="订单已被删除"
            sub-title="已删除订单" style="padding:0px">
            <template #extra>
            </template>
          </a-result>
        </a-card-grid>
      </a-card>
    </div>
    <div class="paymethod">
      <a-card title="选择支付方式" @change="supportChange">
        <a-radio-group style="width:100%" v-model="suportmethod">
        <a-card-grid style="width: 33%; text-align: center;background-color" class="wechatpay">
          <a-radio :value="0"></a-radio><h3 style="display:inline"><a-icon type="wechat" style="color:#3AB035" /> 微信支付</h3>
        </a-card-grid>
        <a-card-grid style="width: 33%; text-align: center">
          <a-radio :value="1"></a-radio><h3 style="display:inline"><a-icon type="alipay" style="color:#1777FF"/> 支付宝支付</h3>
        </a-card-grid>
        <a-card-grid style="width: 33%; text-align: center">
          <a-radio :value="2"></a-radio><h3 style="display:inline"><a-icon type="credit-card" style="color:gold" /> 银联支付</h3>
        </a-card-grid>
        </a-radio-group>
        <a-card-grid style="width: 100%; text-align: center; padding:0px">
          <a-button-group style="width:100%">
            <a-button  class="paybtn" type="primary" @click="payOrder" ><a-icon type="money-collect" />{{$t('m.finishPay')}}</a-button>
            <a-button  class="paybtn" type="danger" @click="deleteOrder"><a-icon type="close-circle" />{{$t('m.deleteOrder')}}</a-button>
          </a-button-group>
        </a-card-grid>
        
      </a-card>
    </div>
    <a-modal v-model="supportVisible" :footer="null" :width="400">
      <img :src="supportIcon[suportmethod]" alt="" style="width: 100%">
    </a-modal>
  </div>
</template>
<script>
import flightDataType from "@/common/js/flightDataType"
import UserOrdersNet from "@/network/UserOrdersNet"
import moment from 'moment';
export default {
  name: "PayFinish",
  props:{
    order:[],
    
  },
  data(){
    return{
      flightDataType,
      supportVisible:false,
      suportmethod:0,
      supportIcon:[require("@/common/images/support.png"),require("@/common/images/support2.png"),require("@/common/images/support.png")]
    }
  },
  methods:{
    payOrder(){
      for(let i=0;i<this.order.length;i++){
        setTimeout(() => {
          UserOrdersNet.payorder(this.order[i],this.payOrderSuccess.bind(this,i),this.payOrderFailure.bind(this))
        }, i*200);
      }
    },
    payOrderSuccess(index){
      this.$message.success("支付成功!!  ")
      this.order[index].paystatus="2",
      this.order[index].paytime=moment()
    },
    payOrderFailure(reason){
      this.$message.error("支付失败  "+reason)
    },
    deleteOrder(){
      for(let i=0;i<this.order.length;i++){
        setTimeout(() => {
          UserOrdersNet.delorder(this.order[i],this.deleteOrderSuccess.bind(this,i),this.deleteOrderFailure.bind(this))
        }, i*200);
      }
    },
    deleteOrderSuccess(index){
      this.$message.success("删除订单成功!!")
      this.order[index].paystatus="5"
    },
    deleteOrderFailure(reason){
      this.$message.success("删除订单失败  "+reason)
    },
    supportChange(){
      this.supportVisible=true
      
    }
  }
};
</script>
<style scoped>
.payfinishwrapper{
    background-color: white;
}
.paybtn{
  font-size:25px;
  height: 80px;
  width: 50%;
}

</style>
