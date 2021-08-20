<template>
  <div>
    <div class="descriptions" >
      <a-descriptions :title="$t('m.userinfo')" :column="6" bordered>
        <a-descriptions-item :label="$t('m.username')" :span="2" >
          <a-input :placeholder="$t('m.inputname')">
            <a-icon slot="prefix" type="user"></a-icon>
          </a-input>
        </a-descriptions-item>
        <a-descriptions-item :label="$t('m.userphone')" :span="2" >
          <a-input :placeholder="$t('m.inputphone')">
            <a-icon slot="prefix" type="phone"></a-icon>
          </a-input>
        </a-descriptions-item>
        <a-descriptions-item :label="$t('m.passengersnum')" :span="2" >
          <a-input-number></a-input-number>
        </a-descriptions-item>
      </a-descriptions>
      <a-divider></a-divider>
      <a-descriptions :title="$t('m.order')+' '+(index+1)" bordered v-for="item,index in data" :key="index" :column="6">
        <a-descriptions-item :label="$t('m.filghtid')" :span="2" >
          <a-icon type="twitter"></a-icon>{{item.flightid}}
        </a-descriptions-item>
        <a-descriptions-item :label="$t('m.departure')" :span="2">
          <a-icon type="environment"></a-icon>{{item.departure}}
        </a-descriptions-item>
        <a-descriptions-item :label="$t('m.destination')" :span="2">
          <a-icon type="environment"></a-icon>{{item.destination}}
        </a-descriptions-item>
        <a-descriptions-item :label="$t('m.flighttime')" :span="3">
          <a-icon type="clock-circle"></a-icon>{{moment(item.dtime,'HH:mm:ss')}}
        </a-descriptions-item>
        <a-descriptions-item :label="$t('m.flightarrivetime')" :span="3">
          <a-icon type="clock-circle"></a-icon>{{moment(item.atime,'HH:mm:ss')}}
        </a-descriptions-item>
        <a-descriptions-item :label="$t('m.price')" :span="2">
          <a-icon type="money-collect" /><strong style="color:red">{{item.price}}</strong>
        </a-descriptions-item>
        <a-descriptions-item :label="$t('m.model')" :span="2">
          <a-icon type="medium" />{{item.model}}
        </a-descriptions-item>
        <a-descriptions-item :label="$t('m.flightcompany')" :span="2">
          <a-icon type="codepen" />{{item.airline}}
        </a-descriptions-item>
        <a-descriptions-item :label="$t('m.cabintype')" :span="2">
          <a-select v-model="cabinid[index]">
            <a-select-option v-for="item in cabintype"  :key="item.value" :value="item.value"><a-icon type="crown" />{{item.text}}</a-select-option>
          </a-select>
        </a-descriptions-item >
        <a-descriptions-item :label="$t('m.flighttype')" :span="2">
          <a-select v-model="type[index]">
            <a-select-option v-for="item in flightType"  :key="item.value" :value="item.value"><a-icon type="user"></a-icon>&nbsp;&nbsp;{{item.text}}&nbsp;</a-select-option>
          </a-select>
        </a-descriptions-item >
        <a-descriptions-item :label="$t('m.flightdeparturetime')" :span="2">
          <a-date-picker v-model="flightdate"></a-date-picker>
        </a-descriptions-item >
        <a-descriptions-item :label="$t('m.seatid')" :span="2">
          <a-input-number v-model="seatid[index]" :min="1" :max="Number(item.seatall)"></a-input-number>
        </a-descriptions-item >
        <a-descriptions-item :label="$t('m.buyTicket')" :span="4">
          <a-button type="primary" @click="orderTicket(item,index)" :disabled="buttonhasClick[index]">{{$t('m.buyTicket')}}</a-button>
        </a-descriptions-item > 
      </a-descriptions>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import fligtDataType from '@/common/js/flightDataType'
import UserOrdersNet from "@/network/UserOrdersNet"
export default {
  name: "PayMethod",
  props: {
    data: [],
    orderedlist:[]

  },
  data(){
    return{
      "moment":moment,
      cabintype:fligtDataType.cabintype,
      cabinid:["1","1","1"],
      flightType:fligtDataType.flightType,
      type:["1","1","1"],
      flightdate:moment().add(1, 'd'),
      seatid:["1","1","1"],
      buttonhasClick:[false,false,false],
    }
  },
  methods:{
    orderTicket(item,index){
      if(this.flightdate==null||this.flightdate<moment()||this.flightdate.diff(moment(),'day')>15){
        this.$message.info("起飞日期不能为空或者小于今天或者超过今天15天")
        return
      }
      let orderdata={
        flightid:item.flightid,
        cabinid:this.cabinid[index],
        seatid:this.seatid[index],
        flightdate:this.flightdate.format('YYYY-MM-DD'),
        type:this.type[index]
      }
      UserOrdersNet.addorder(orderdata,this.orderSuccesss.bind(this,index),this.orderFailure.bind(this))
    },
    orderSuccesss(index,data){
      this.$message.success("订票成功!!",)
      this.$set(this.buttonhasClick,index,true)
      this.orderedlist.push(data)
    },
    orderFailure(){
      this.$message.error("订票失败!!")
    },
   
  },
};
</script>
<style scoped>
.descriptions {
  background-color: white;
}
.paymethod {
  margin-top: 20px;
}
</style>