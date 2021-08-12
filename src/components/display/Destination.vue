<template>
  <div class="titleContainer">
    <a-card >
      <a-row>
        <a-col :span="12">
          <div>
          <h5 slot="title" >
          <strong v-if="starAirlines">
            {{$t('m.from')}} {{starAirlines}} {{$t('m.afterFrom')}}
          </strong>
          <strong v-else>
            {{$t('m.defaultFrom')}}
          </strong>
          </h5>
          </div>
        </a-col>
        <a-col :span="8">
          <a-select v-model="selectedData.departure" :default-value="selectedData.departure" 
          @change="changeSelection(selectedData.departure)" style="width: 50%">
              <a-select-option v-for="item in airlines" :key="item" :value="item" >
                {{item || $t('m.endPoint')}}
              </a-select-option>
          </a-select>
        </a-col>
        <a-col :span="4">
          <div>
          <a-button slot="extra" size="small">{{$t('m.searchMore')}}<a-icon type="select" /></a-button>
          </div>
        </a-col>
      </a-row>
      <hr />
      <div>
        <a-row>
            <a-col :span="12" class="col">
                <div class="cards">
                <!-- todo 绑定点击事件，将数据填入Card,获取经纬度-->
                  <Card v-for="item in targets" :key="item.flightid" @click="clickCard(item)"/>
                </div>
            </a-col>
            <a-col :span="12">
                <div id="map" class="map">
                </div>
            </a-col>
        </a-row>
      </div>  
        
    </a-card>
  </div>
</template>
<script>
import Card from "../../components/display/Card.vue"
import moment from 'moment'
import FlightNet from '@/network/FlightNet';
import BMap from 'BMap';
export default {
    name:"Destination",
    components:{
        Card
    },
    data () {
      return {
        starAirlines: '',
        airlines: [],
        targets: [],
        selectedData:{
          flightid:"",
          seatall:"",
          model:"",
          departure:"",
          destination:"",
          airline:"",
          dtime1:moment('00:00:01','hh:mm:ss').format('HH:mm:ss'),
          dtime2:moment('23:59:59','hh:mm:ss').format('HH:mm:ss'),
          atime1:moment('00:00:01','hh:mm:ss').format('HH:mm:ss'),
          atime2:moment('23:59:59','hh:mm:ss').format('HH:mm:ss'),
          distime1:"",
          distime2:"",
          minprice: 0,
          maxprice: 10000,
          date:moment().format("YYYY-MM-DD"),
          max: '10',
          min: '0',
        }
      }
    },
    methods: {
      changeSelection (where) {
        // 下拉列表触发选择事件
        this.selectedData.departure = where;
        this.starAirlines = where;
        // this.selectedData.departure = where;
        FlightNet.queryFlights(this.selectedData, this.getAllDes, ()=>{});
      },
      getAllDes(data) {
          // 获取所有目标, 渲染界面
          this.targets = data;
      },
      clickCard(item) {
        console.log(item);
      },
    },
    mounted() {
      let that = this;
      this.$nextTick(() =>{
        // let r = document.getElementById('map');
        let map = new BMap.Map('map');
        let point = new BMap.Point(119, 29);
        map.centerAndZoom(point, 15);

        function getAirLine(data) {
          that.airlines = data;
          if (data.length > 0) {
            that.changeSelection (data[0]);
          }
        }
        FlightNet.searchAllDeparture(getAirLine);
      });
    }
};
</script>
<style scoped>
.titleContainer {
  width: 100%;
}
.col >*{
  margin-bottom: 5px;
}
.map{
    width: calc(100%);
    height: 72vh;
    box-sizing: border-box;
    background-color: grey;
}
.cards{
  width: calc(100%);
  height: 72vh;
  background-color: white;
  overflow-y: scroll;
  overflow-x: hidden;
}
.cards::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
.cards::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgba(68, 67, 67, 0.2);
  background: grey;
}
.cards::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: #ededed;
}
</style>
