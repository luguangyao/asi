<template>
  <div>
    <h4>{{$t('m.orderComfirm')}}</h4>
    <a-divider></a-divider>
    <h1 v-if="data&&data.length">
        {{data[0].departure}}&nbsp;&nbsp;<a-icon type="swap" />&nbsp;&nbsp;{{data[data.length-1].destination}}
    </h1>
    <h3>{{$t('m.totaltime')}}:&nbsp;&nbsp;<a-icon type="clock-circle"/> {{getTimedel(data[0].dtime,data[data.length-1].atime)}}
        <a-divider type="vertical"></a-divider>
        {{data.length==1?'本次航班为直达航班,无需转机':'本次航班需要转机次数:  '+(data.length-1)}}
    </h3>
    <a-row>
    <a-col v-for="item,index in data" :key="index" :span="11" class="colstyle" >
        <div>
            <h5 style="background-color:#287DFA;color:white;display:inline">&nbsp;&nbsp;&nbsp;TARGET&nbsp;&nbsp;&nbsp;</h5> &nbsp;&nbsp;&nbsp;
            <h4 style="display:inline">{{moment(item.atime,'HH:mm:ss').format('MM-DD HH:mm')}}</h4>
            <a-divider type="vertical"></a-divider>
            <h4 style="display:inline"><a-icon type="clock-circle"/> {{getTimedel(item.dtime,item.atime)}}</h4>
        </div>
        <a-divider></a-divider>
        <div >
            <div class="content">
                <div class="timeline">
                    <a-timeline>
                        <a-timeline-item>
                            <h4>{{item.departure}}</h4>
                            <h5>{{item.dtime}}</h5>
                        </a-timeline-item>
                        <a-timeline-item>
                            <h4>{{item.destination}}</h4>
                            <h5>{{item.atime}}</h5>
                        </a-timeline-item>
                    </a-timeline>
                </div>
                <div class="price">
                    <div class="priceContent">
                        <h4 style="color:white">{{$t('m.filghtid')}}:&nbsp;&nbsp;&nbsp;&nbsp;{{item.flightid}}</h4>
                        <h4 style="color:white">{{$t('m.price')}}:&nbsp;&nbsp;&nbsp;&nbsp;<a-icon type="money-collect" />{{item.price}}</h4>
                        <h4 style="color:white">{{$t('m.seat')}}:&nbsp;&nbsp;&nbsp;&nbsp;{{item.seatall}}</h4>
                    </div>
                </div>
                <div>
                </div>
            </div>
        </div>
    </a-col>
    </a-row>
  </div>
</template>
<script>
import moment from 'moment'
export default {
  name: "PayCheck",
  props: {
    data: [],
  },
  data(){
      return{
        moment:moment
      }
  },
  methods:{
      getTimedel(t1,t2){
        let m1=moment(t1,'HH:mm:ss')
        let m2=moment(t2,'HH:mm:ss')
        let del=moment.utc(m2.diff(m1))
        return del.format('HH:mm:ss')
    },
  }
};
</script>
<style scoped>
.colstyle{
    border: 1px #E8E8E8 solid;
    padding: 20px;
    margin-right:10px ;
    margin-top:10px ;
    transition: all .5s;
}
.content{
    display: flex;
}
.timeline{
    width: 40%;
}
.price{
    width: 60%;
    height: 100%;
    border-right: 10px #E8E8E8 solid;
}
.priceContent{
    padding: 20px;
    background-color: #287DFA;
}
.colstyle:hover{
    box-shadow: #E8E8E8 0px 0px 10px 10px;
    transition: all .5s;
}
</style>
