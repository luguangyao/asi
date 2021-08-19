<template>
  <div>
      <a-row>
          <a-col :span="7">
              <a-input-group>
                  <a-input :disabled="true" :placeholder="$t('m.filghtid')" style="width:40%"></a-input>
                  <a-select style="width:60%" v-model="ordersSearch.flightid" mode='combobox'>
                      <a-select-option v-for="item in this.flightidList" :key="item" :value="item">{{item}}</a-select-option>
                  </a-select>
              </a-input-group>
          </a-col>
          <a-col :span="7" :offset="1">
              <a-input-group>
                  <a-input :disabled="true" :placeholder="$t('m.cabintype')" style="width:40%"></a-input>
                  <a-select style="width:60%" v-model="ordersSearch.cabinid">
                      <a-select-option v-for="item in this.cabinidList" :key="item.value" :value="item.value">{{item.text}}</a-select-option>
                  </a-select>
              </a-input-group>
          </a-col>
          <a-col :span="7" :offset="1">
              <a-input-group>
                  <a-input :disabled="true" :placeholder="$t('m.paystatus')" style="width:40%"></a-input>
                  <a-select style="width:60%" v-model="ordersSearch.paystatus">
                      <a-select-option v-for="item in this.paystatusList" :key="item.value" :value="item.value">{{item.text}}</a-select-option>
                  </a-select>
              </a-input-group>
          </a-col>
      </a-row>
      <a-row style="margin-top:20px">
          <a-col :span="7">
              <a-input-group>
                  <a-input :disabled="true" :placeholder="$t('m.idcard')" style="width:40%"></a-input>
                  <a-input placeholder="填入身份证" style="width:60%"></a-input>
              </a-input-group>
          </a-col>
          <a-col :span="7" :offset="1">
              <a-input-group>
                  <a-input :disabled="true" :placeholder="$t('m.flighttype')" style="width:40%"></a-input>
                  <a-select style="width:60%" v-model="ordersSearch.type">
                      <a-select-option v-for="item in this.typeList" :key="item.value" :value="item.value">{{item.text}}</a-select-option>
                  </a-select>
              </a-input-group>
          </a-col>
          <a-col :span="7" :offset="1">
              <a-input-group>
                  <a-input :disabled="true"  :placeholder="$t('m.pagerange')" style="width:40%"></a-input>
                  <a-input-number :min="pageMin" :max="pageMax" v-model="ordersSearch.min" style="width:30%" @change="checkPage"></a-input-number>
                  <a-input-number :min="pageMin" :max="pageMax" v-model="ordersSearch.max" style="width:30%" @change="checkPage"></a-input-number>
              </a-input-group>
          </a-col>
      </a-row>
      <a-row style="margin-top:20px">
        <a-col :span="7" >
                  <a-input :disabled="true" :placeholder="$t('m.flightstarttime')" style="width:25%"></a-input>
                  <a-date-picker style="width:37.5%" v-model="flightdate1"></a-date-picker>
                  <a-time-picker style="width:37.5%" v-model="flightdate1"></a-time-picker>
          </a-col>
          <a-col :span="7" :offset=1>
                  <a-input :disabled="true" :placeholder="$t('m.flightendtime')" style="width:25%"></a-input>
                  <a-date-picker style="width:37.5%" v-model="flightdate2"></a-date-picker>
                  <a-time-picker style="width:37.5%" v-model="flightdate2"></a-time-picker>
          </a-col>
          
      </a-row>
        <a-row style="margin-top:20px">
            <a-col :span="7" >
                  <a-input :disabled="true" :placeholder="$t('m.paystarttime')" style="width:25%"></a-input>
                  <a-date-picker style="width:37.5%" v-model="paytime1"></a-date-picker>
                  <a-time-picker style="width:37.5%" v-model="paytime1"></a-time-picker>
          </a-col>
          <a-col :span="7" :offset="1">
                  <a-input :disabled="true" :placeholder="$t('m.payendtime')" style="width:25%"></a-input>
                  <a-date-picker style="width:37.5%" v-model="paytime2"></a-date-picker>
                  <a-time-picker style="width:37.5%" v-model="paytime2"></a-time-picker>
          </a-col>
          <a-col :span="7" :offset=1>
                  <a-input :disabled="true" :placeholder="$t('m.paytimewarning')" ></a-input>
          </a-col>
        </a-row>
          
      <a-row style="margin-top:20px">
            <a-col :span="4">
                 <a-input :disabled="true" :placeholder="$t('m.payrange')" style="width:70%"></a-input>
            </a-col>
            <a-col :span="19">
                 <a-slider :marks="marks" :included="false" v-model="priceRange" :min="priceMin" :max="priceMax" range />
            </a-col>
      </a-row>
      <a-row>
          <a-button @click="oSearch" block><strong>{{this.$t('m.search')}}</strong></a-button>
      </a-row>
  </div>
</template>
<script>
import FlightNet from "@/network/FlightNet"
import OrdersNet from "@/network/OrdersNet"
import moment from 'moment';
export default {
  name: "AdminOrdersSearch",
  data() {
    return {
      paystatusList: [
        { value: "", text: "全部" },
        { value: "1", text: "未支付" },
        { value: "2", text: "已支付" },
        { value: "3", text: "已确认" },
        { value: "4", text: "重新确认" },
        { value: "5", text: "已取消" },
      ],
      cabinidList: [
        { value: "", text: "全部" },
        { value: "1", text: "头等舱" },
        { value: "2", text: "商务舱" },
        { value: "3", text: "经济舱" },
      ],
      typeList: [
        { value: "", text: "全部" },
        { value: "1", text: "成人票" },
        { value: "2", text: "学生票" },
      ],
      flightidList: [""],
      pageMin:0,
      pageMax:10,
      priceRange:[1000,6000],
      flightdate1:moment("00:00:01","HH:mm:ss"),
      flightdate2:moment("23:59:59","HH:mm:ss"),
      paytime1:moment("00:00:01","HH:mm:ss"),
      paytime2:moment("23:59:59","HH:mm:ss"),
      ordersSearch: {
        flightid: "",
        idcard: "",
        paystatus: "",
        cabinid: "",
        type: "",
        flightdate1: "",
        flightdate2: "",
        paytime1: "",
        paytime2: "",
        paymoney1: 2000,
        paymoney2: 7000,
        min: 0,
        max: 10,
      },
      ordersData:{

      },
      marks: {
        0: '￥0',
        10000: {
          style: {
            color: '#f50',
          },
          label: <strong>￥10000</strong>,
        },
      },
      priceMin:0,
      priceMax:10000,
    }
  },
  methods:{
      setAllFlights(data){
          this.flightidList.push(...data)
      },
      checkPage(){
          if(this.ordersSearch.min>this.ordersSearch.max){
              this.$message.error("分页最小值必须小于等于最大值")
              this.ordersSearch.max=this.ordersSearch.min
          }
      },
      oSearch(){
          this.ordersSearch.flightdate1=this.flightdate1==null?"":this.flightdate1.format("YYYY-MM-DD HH:mm:ss")
          this.ordersSearch.flightdate2=this.flightdate2==null?"":this.flightdate2.format("YYYY-MM-DD HH:mm:ss")
          this.ordersSearch.paytime1=this.paytime1==null?"":this.paytime1.format("YYYY-MM-DD HH:mm:ss")
          this.ordersSearch.paytime2=this.paytime2==null?"":this.paytime2.format("YYYY-MM-DD HH:mm:ss")
          this.ordersSearch.paymoney1=this.priceRange[0]
          this.ordersSearch.paymoney2=this.priceRange[1]
          OrdersNet.queryOrders(this.ordersSearch,this.ordersSearchSuccess.bind(this),this.ordersSearchFailure.bind(this))
      },
      ordersSearchSuccess(data){
          this.$message.success("搜索订单成功!!")
          this.ordersData=data
          let listData={
              "paystatusList":this.paystatusList,
              "cabinidList":this.cabinidList,
              "typeList":this.typeList,
              "flightidList":this.flightidList
          }
          this.$emit("ordersSearchData",this.ordersData,listData)
      },
      ordersSearchFailure(){
          this.$message.error("搜索订单失败!!")
      }
  },
  created(){
      FlightNet.searchAllFlightId(this.setAllFlights.bind(this))
  }
};
</script>
<style scoped>
</style>