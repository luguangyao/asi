<template>
    <div class="planesearchwrapper">
        <div style="width:100%">
        <a-row>
            <a-col :span="6">
                <a-input-group>
                <strong>{{$t('m.filghtid')}}  </strong>
                <a-select v-model="selectedData.flightid" :default-value="selectedData.flightid"  style="width: 60%">
                    <a-select-option v-for="item in flightidList" :key="item" :value="item">{{item==""?$t('m.all'):item}}</a-select-option>
                </a-select>
                </a-input-group>
            </a-col>
            <a-col :span="6">
                <a-input-group>
                <strong>{{$t('m.seat')}}  </strong>
                <a-select v-model="selectedData.seatall" :default-value="selectedData.seatall"  style="width: 60%">
                    <a-select-option v-for="item in sellallList" :key="item" :value="item">{{item==""?$t('m.all'):item}}</a-select-option>
                </a-select>
                </a-input-group>
            </a-col>
            <a-col :span="6">
                <a-input-group>
                <strong>{{$t('m.model')}}  </strong>
                <a-select v-model="selectedData.model" :default-value="selectedData.model"  style="width: 60%">
                    <a-select-option v-for="item in modelList" :key="item" :value="item">{{item==""?$t('m.all'):item}}</a-select-option>
                </a-select>
                </a-input-group>
            </a-col>
            <a-col :span="6">
                <a-input-group>
                <strong>{{$t('m.seat')}}  </strong>
                <a-select v-model="selectedData.seatall" :default-value="selectedData.seatall"  style="width: 60%">
                    <a-select-option v-for="item in sellallList" :key="item" :value="item">{{item==""?$t('m.all'):item}}</a-select-option>
                </a-select>
                </a-input-group>
            </a-col>
        </a-row>
        <a-row style="margin-top:20px">
                <a-col :span="showdetail?8:11">
                    <a-input-group>
                        <a-select v-model="selectedData.departure" :default-value="selectedData.departure"  style="width: 50%">
                            <a-select-option v-for="item in departureList" :key="item" :value="item">{{item==""?$t('m.startPoint'):item}}</a-select-option>
                        </a-select>
                        <a-select v-model="selectedData.destination" :default-value="selectedData.destination"  style="width: 50%">
                            <a-select-option v-for="item in departureList" :key="item" :value="item">{{item==""?$t('m.endPoint'):item}}</a-select-option>
                        </a-select>
                     </a-input-group>
                </a-col>
                <a-col :span="6" :offset="1">
                    <a-input-group>
                        <strong>{{$t('m.flightcompany')}}  </strong>
                        <a-select v-model="selectedData.airline" :default-value="selectedData.airline"  style="width: 60%">
                            <a-select-option v-for="item in airlineList" :key="item" :value="item">{{item==""?$t('m.all'):item}}</a-select-option>
                        </a-select>
                    </a-input-group>
                </a-col>
                <a-col :span="8" :offset="1" v-if="showdetail">
                    <a-input-group >
                        <strong>{{$t('m.flighttime')}} </strong>
                        <a-time-picker v-model="dtime1"></a-time-picker>
                        <a-time-picker v-model="dtime2"></a-time-picker>
                     </a-input-group>
                </a-col>
                <a-col v-if="!showdetail"  :span="6">
                    <router-link to="/other/flight">{{$t('m.moreFlightSearchSelection')}}</router-link>
                </a-col>
        </a-row>
        </div>
        
        <div v-if="showdetail">
            <a-row style="margin-top:30px; " >
                <a-col :span="11">
                    <h4>{{$t('m.payrange')}}</h4>
                     <a-slider range v-model="price" :min="this.pricemin" :max="this.pricemax" :marks="marks"/>
                </a-col>
                <a-col :span="7" :offset="1">
                    <h4> &nbsp;</h4>
                    <a-input-group>
                        <strong>{{$t('m.flightarrivetime')}} </strong>
                        <a-time-picker v-model="atime1"></a-time-picker>
                        <a-time-picker v-model="atime2"></a-time-picker>
                     </a-input-group>
                </a-col>
                <a-col :span="3" >
                    <h4> &nbsp; </h4>
                    <a-input-group>
                        <a-select v-model="flightChangetime" :default-value="flightChangetime"  style="width:100%">
                            <a-select-option v-for="item in changFlightTimeList" :key="item.value" :value="item.value">{{$t(item.text)}}</a-select-option>
                        </a-select>
                    </a-input-group>
                    
                </a-col>
            </a-row>
        </div>
        <div class="searchwrapper">
            <div class="search">
                <a-button size="large" type="primary" @click="gotoFlightDeatail" ><a-icon type="search"></a-icon>{{$t('m.search')}}</a-button>
            </div>
        </div>
        
    </div>
</template>
<script>
import FlightNet from '@/network/FlightNet'
// import PlaneNet from '@/network/PlaneNet'
import moment from 'moment'
export default{
    name:"PlanSearch",
    props:{
        showdetail:{
            type:Boolean,
            default:false
        }
    },
    data(){
        return{
            flightidList:["",],
            departureList:["",],
            destinationList:["",],
            modelList:["",],
            sellallList:["",],
            airlineList:["",],
            changFlightTimeList:[
                {value:"0",text:"m.noFlightChange"},
                {value:"1",text:"m.flightChangeAtMostOne"},
                {value:"2",text:"m.flightChangeAtMostTwo"},
            ],
            dtime1:moment('00:00:00','hh:mm:ss'),
            dtime2:moment('23:59:59','hh:mm:ss'),
            atime1:moment('00:00:00','hh:mm:ss'),
            atime2:moment('23:59:59','hh:mm:ss'),
            price:[0,7000],
            pricemin:0,
            pricemax:10000,
            marks: {
                0: '0￥',
                10000: {
                style: {
                    color: '#f50',
                },
                label: <strong>10000￥</strong>,
                }
            },
            flightChangetime:"0",
            selectedData:{
                flightid:"",
                seatall:"",
                model:"",
                departure:"",
                destination:"",
                airline:"",
                dtime1:"00:00:00",
                dtime2:"23:59:59",
                atime1:"",
                atime2:"",
                distime1:"",
                distime2:"",
                minprice:"",
                maxprice:"",
                date:moment().format("YYYY-MM-DD")
            }
        }
    },
    methods:{
        setListdata(d,data){
            d.push(...data)
        },
        gotoFlightDeatail(){
            // this.$router.push("/other/flightdetail")
            this.selectedData.dtime1=this.dtime1.format("HH:mm:ss")
            this.selectedData.dtime2=this.dtime2.format("HH:mm:ss")
            this.selectedData.atime1=this.atime1.format("HH:mm:ss")
            this.selectedData.atime2=this.atime2.format("HH:mm:ss")
            this.selectedData.minprice=this.price[0]
            this.selectedData.maxprice=this.price[1]
            // PlaneNet.queryFlights(this.selectedData)
            if(this.flightChangetime!='0'&&(this.selectedData.departure==''||this.selectedData.destination=='')){
                this.$message.info("允许转机时,出发地和目的地不能设置为空")
                return
            }
            this.$router.push({name:'flightdetail',params:{
                selectedData:this.selectedData,
                flightChangetime:this.flightChangetime,
            }})
        }
    },
    created(){
        FlightNet.searchAllFlightId(this.setListdata.bind(this,this.flightidList))
        FlightNet.searchAllAirline(this.setListdata.bind(this,this.airlineList))
        FlightNet.searchAllModel(this.setListdata.bind(this,this.modelList))
        FlightNet.searchAllDeparture(this.setListdata.bind(this,this.departureList))
        FlightNet.searchAllDestination(this.setListdata.bind(this,this.destinationList))
        FlightNet.searchAllSeatallList(this.setListdata.bind(this,this.sellallList))
    },
    
}
</script>
<style scoped>
.planesearchwrapper{
    background-color: rgba(255, 255, 255, 0.8);
    min-width: 820px;
    border: 1px grey solid;
    padding: 20px;
    border-radius: 15px;
}
.searchwrapper{
    display: flex;
    justify-content: center;
    width: 100%;
}
.search{
    transform: translateY(40px);
    box-shadow: grey 5px 5px 5px;
}
</style>